import express from 'express';
import { InitResponse, IncrementResponse, DecrementResponse } from '../shared/types/api';
import { redis, reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost } from './core/post';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

// --- GLOBAL SETTINGS ---
// 400 albums (0-399)
const TOTAL_ALBUMS_COUNT = 400;
// database version: global:v2
const DB_VERSION = 'global:v2';

// helper function to get today's key in 'YYYY-MM-DD' format adjusted to UTC+3 (timezone for Turkiye)
const getTodayKey = () => {
  const now = new Date();
  const trTime = new Date(now.getTime() + (3 * 60 * 60 * 1000));
  return `${trTime.getUTCFullYear()}-${String(trTime.getUTCMonth() + 1).padStart(2, '0')}-${String(trTime.getUTCDate()).padStart(2, '0')}`;
};

// 1. GAME STATE
router.post('/api/game-state', async (_req, res): Promise<void> => {
  try {
    console.log('[SERVER] /api/game-state called');
    const username = await reddit.getCurrentUsername();
    
    if (!username) {
      res.json({ hasPlayed: false, currentRound: 0, score: 0, answers: [] });
      return;
    }

    const todayKey = getTodayKey();
    const playedKey = `played:${DB_VERSION}:${username}:${todayKey}`;
    const gameStateKey = `game:${DB_VERSION}:${username}:${todayKey}`;

    const hasPlayed = await redis.get(playedKey);
    const gameStateRaw = await redis.get(gameStateKey);
    
    let currentRound = 0;
    let score = 0;
    let answers: number[] = [];
    
    if (gameStateRaw) {
      try {
        const gameState = JSON.parse(gameStateRaw);
        currentRound = gameState.currentRound || 0;
        score = gameState.score || 0;
        answers = gameState.answers || [];
      } catch (e) {
        console.error('Failed to parse game state:', e);
      }
    }

    res.json({
      hasPlayed: !!hasPlayed,
      currentRound,
      score,
      answers
    });
  } catch (error) {
    console.error('[SERVER] Error in /api/game-state:', error);
    res.status(400).json({ hasPlayed: false, currentRound: 0, score: 0, answers: [] });
  }
});

// 2. SAVE SCORE
router.post('/api/save-score', async (req, res): Promise<void> => {
  try {
    console.log('[SERVER] /api/save-score called');
    
    const { score } = req.body;
    const username = await reddit.getCurrentUsername();
    
    if (!username) {
      res.status(400).json({ status: 'error', message: 'User not authenticated' });
      return;
    }

    let numScore = Number(score);
    if (isNaN(numScore)) numScore = 0;
    if (numScore > 5) numScore = 5;
    if (numScore < 0) numScore = 0;

    console.log(`[SERVER] Saving to Redis: ${username} -> ${numScore}`);

    const todayKey = getTodayKey();
    const playedKey = `played:${DB_VERSION}:${username}:${todayKey}`;
    const lbKey = `leaderboard:${DB_VERSION}:all_time`;

    const hasPlayed = await redis.get(playedKey);
    if (hasPlayed) {
       console.log(`[SERVER] ${username} tried to save score again! Blocked.`);
       res.status(400).json({ status: 'error', message: 'Already played today' });
       return;
    }

    // saves score to leaderboard
    await redis.zIncrBy(lbKey, username, numScore);
    
    // marks as played for today
    await redis.set(playedKey, 'true', { expiration: new Date(Date.now() + 172800000) });
    
    // deletes temporary game state
    await redis.del(`game:${DB_VERSION}:${username}:${todayKey}`);

    res.json({ status: 'success', message: 'Score saved' });
  } catch (error) {
    console.error('[SERVER] Error saving score:', error);
    res.status(400).json({ status: 'error', message: 'Failed to save score' });
  }
});

// 3. SAVE PROGRESS
router.post('/api/save-progress', async (req, res): Promise<void> => {
  try {
    console.log('[SERVER] /api/save-progress called');
    const { currentRound, score, answers } = req.body;
    const username = await reddit.getCurrentUsername();
    
    if (!username) {
      res.status(400).json({ status: 'error', message: 'User not authenticated' });
      return;
    }

    const todayKey = getTodayKey();
    const gameStateKey = `game:${DB_VERSION}:${username}:${todayKey}`;

    const gameState = {
      currentRound: currentRound || 0,
      score: score || 0,
      answers: answers || [],
      timestamp: Date.now()
    };

    // saves game state with 24 hours expiration
    await redis.set(gameStateKey, JSON.stringify(gameState), { expiration: new Date(Date.now() + 86400000) });
    
    res.json({ status: 'success', message: 'Progress saved' });
  } catch (error) {
    console.error('[SERVER] Error saving progress:', error);
    res.status(400).json({ status: 'error', message: 'Failed to save progress' });
  }
});

// 4. GET DAILY ALBUMS
router.post('/api/get-daily-albums', async (_req, res): Promise<void> => {
  try {
    console.log('[SERVER] /api/get-daily-albums called');
    
    const todayKey = getTodayKey();
    const albumsKey = `daily-albums:${DB_VERSION}:${todayKey}`; // today's albums key
    
    const chosenKey = `chosen-albums:${DB_VERSION}:global_history`; 

    let albumsRaw = await redis.get(albumsKey);
    let albumIds: number[] = [];

    if (!albumsRaw) {
      let chosenRaw = await redis.get(chosenKey);
      let chosenAlbums: number[] = chosenRaw ? JSON.parse(chosenRaw) : [];

      // 400 albums pool (0 to 399)
      const availableAlbums = Array.from({ length: TOTAL_ALBUMS_COUNT }, (_, i) => i).filter(
        id => !chosenAlbums.includes(id)
      );

      // if less than 5 albums left, reset the chosen list
      if (availableAlbums.length < 5) {
        console.log('[SERVER] Havuz tükendi, tarihçe sıfırlanıyor.');
        chosenAlbums = [];
        availableAlbums.length = 0;
        for (let i = 0; i < TOTAL_ALBUMS_COUNT; i++) {
          availableAlbums.push(i);
        }
      }

      albumIds = [];
      const shuffled = availableAlbums.sort(() => Math.random() - 0.5);
      for (let i = 0; i < 5; i++) {
        albumIds.push(shuffled[i]);
        chosenAlbums.push(shuffled[i]);
      }

      // save today's albums with 48 hours expiration
      await redis.set(albumsKey, JSON.stringify(albumIds), { expiration: new Date(Date.now() + 172800000) });
      
      // save chosen albums history
      await redis.set(chosenKey, JSON.stringify(chosenAlbums));
    } else {
      albumIds = JSON.parse(albumsRaw);
    }

    console.log(`[SERVER] Daily albums for ${todayKey}:`, albumIds);
    res.json({ status: 'success', albumIds: albumIds });
  } catch (error) {
    console.error('[SERVER] Error getting daily albums:', error);
    res.status(400).json({ status: 'error', message: 'Failed to get daily albums' });
  }
});

// 5. GET LEADERBOARD
router.post('/api/get-leaderboard', async (_req, res): Promise<void> => {
  try {
    const lbKey = `leaderboard:${DB_VERSION}:all_time`;
    
    const topListRaw = await redis.zRange(lbKey, '0', '99', { by: 'rank', reverse: true });
    const topList = topListRaw || [];

    const username = await reddit.getCurrentUsername();
    const myScore = username ? await redis.zScore(lbKey, username) || 0 : 0;

    let myRank: number | string = '-';
    
    if (username) {
      const allUsers = await redis.zRange(lbKey, '0', '-1', { by: 'rank', reverse: true });
      const userIndex = allUsers?.findIndex((u: any) => u.member === username);
      
      if (userIndex !== undefined && userIndex >= 0) {
        myRank = userIndex + 1;
      }
    }

    const formattedList = topList.map((item: any, index: number) => {
      const avatarUrl = `https://www.redditstatic.com/avatars/defaults/v2/avatar_default_${((item.member?.charCodeAt(0) || 1) % 7) + 1}.png`;
      
      return {
        rank: index + 1,
        username: item.member || 'Unknown',
        score: item.score || 0,
        avatar: avatarUrl,
        isMe: item.member === username
      };
    });

    res.json({
      status: 'success',
      topList: formattedList,
      myScore: myScore,
      myRank: myRank
    });
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(400).json({ status: 'error', message: 'Failed to get leaderboard' });
  }
});

// --- standard functions ---

router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();
    res.json({
      status: 'success',
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({ status: 'error', message: 'Failed to create post' });
  }
});

router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();
    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({ status: 'error', message: 'Failed to create post' });
  }
});

app.use(router);
const port = getServerPort();
const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port);
