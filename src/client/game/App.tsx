import { useState, useEffect, useRef } from 'react';
import { navigateTo } from '@devvit/web/client';
import { ALBUMS, getCoverUrl } from './data';

/* ---------------- SEEDED RANDOM ---------------- */

const createSeededRandom = (seedStr: string) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 16777619);
  }
  return () => {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    return (h >>> 0) / 4294967296;
  };
};

const generateDailyQuestions = async () => {
  try {
    const response = await fetch('/api/get-daily-albums', { method: 'POST' });
    const data = await response.json();

    if (!data.albumIds || data.albumIds.length !== 5) {
      console.error('Invalid album IDs received from server');
      return [];
    }

    const selectedAlbumIds = data.albumIds;
    const daily = selectedAlbumIds
      .map((id: number) => ALBUMS.find(a => a.id === id))
      .filter((a: any) => a !== undefined);

    if (daily.length !== 5) {
      console.error('Could not find all selected albums');
      return [];
    }

    const now = new Date();
    const dateKey = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`;
    const rng = createSeededRandom(dateKey);

    const correctIds = new Set(daily.map((a: any) => a.id));

    return daily.map((correct: any) => {
      const wrongs = ALBUMS
        .filter((a) => !correctIds.has(a.id))
        .sort(() => 0.5 - rng())
        .slice(0, 3);

      return {
        correct,
        options: [correct, ...wrongs].sort(() => 0.5 - rng()),
      };
    });
  } catch (error) {
    console.error('Error generating daily questions:', error);
    return [];
  }
};

/* ---------------- PIXEL CANVAS ---------------- */

const PixelCanvas = ({
  src,
  className,
  onError,
}: {
  src: string;
  className?: string;
  onError: () => void;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, 9, 9);
    };

    img.onerror = onError;
  }, [src]);

  return (
    <canvas
      ref={ref}
      width={9}
      height={9}
      className={`w-full h-full object-cover ${className || ''}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

/* ---------------- APP ---------------- */

export const App = ({ context }: { context: any }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] =
    useState<'loading' | 'playing' | 'finished' | 'already_played'>('loading');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [dailyQuestions, setDailyQuestions] = useState<any[]>([]);

  // Mor Tema Renkleri
  const PRIMARY_COLOR = '#722ED1';
  const SHADOW_COLOR = '#391085';

  const currentQuestion = dailyQuestions[currentRound];

  useEffect(() => {
    const init = async () => {
      try {
        const questions = await generateDailyQuestions();
        setDailyQuestions(questions);

        const response = await fetch('/api/game-state', { method: 'POST' });
        const data = await response.json();
        
        if (data.hasPlayed) {
          setGameState('already_played');
        } else if (data.currentRound !== undefined && data.currentRound > 0) {
          setCurrentRound(data.currentRound);
          setScore(data.score);
          setGameState('playing');
        } else {
          setGameState('playing');
        }
      } catch (error) {
        console.error('[CLIENT] Error during initialization:', error);
        setGameState('playing');
      }
    };
    init();
  }, []);

  const saveScore = (finalScore: number) => {
    fetch('/api/save-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: finalScore })
    }).catch(err => console.error('[CLIENT] Save error:', err));
  };

  const handleGuess = (id: number) => {
    if (isAnswered || !currentQuestion) return;
    setIsAnswered(true);
    setSelectedOption(id);
    const correct = id === currentQuestion.correct.id;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentRound < 4) {
        const nextRound = currentRound + 1;
        const newScore = correct ? score + 1 : score;
        
        setCurrentRound(nextRound);
        setIsAnswered(false);
        setSelectedOption(null);
        setImageError(false);
        
        fetch('/api/save-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            currentRound: nextRound, 
            score: newScore,
            answers: [] 
          })
        }).catch(err => console.error('[CLIENT] Progress save error:', err));
      } else {
        const finalScore = correct ? score + 1 : score;
        saveScore(finalScore);
        setGameState('finished');
      }
    }, 1500);
  };

  if (gameState === 'loading') {
    return <div className="h-screen flex items-center justify-center font-jersey text-2xl text-white bg-[#121212]">Loading...</div>;
  }

  if (gameState === 'finished' || gameState === 'already_played') {
    return (
      <div className="font-jersey p-4 text-center min-h-screen bg-[#121212] flex flex-col items-center justify-center">
        {/* BAŞLIK */}
        <h1 className="text-5xl mb-2 text-white [text-shadow:3px_3px_0_#722ED1]">
          GLOBALLY CHOPPED
        </h1>
        <h2 className="text-2xl mb-8 text-gray-400 uppercase tracking-widest">
          {gameState === 'finished' ? 'Daily Results' : 'Already Played Today'}
        </h2>

        {gameState === 'finished' && (
          <div className="text-8xl mb-8 font-black" style={{ color: PRIMARY_COLOR }}>
            {score} / 5
          </div>
        )}

        <button
          className="mt-6 px-10 py-4 text-white rounded-2xl text-2xl font-bold active:translate-y-1 active:shadow-none transition-all w-full max-w-xs"
          style={{
            backgroundColor: PRIMARY_COLOR,
            boxShadow: `0 6px 0 0 ${SHADOW_COLOR}`
          }}
          onClick={() => navigateTo('https://www.reddit.com/r/hiphoptr/')}
        >
          Back to r/hiphoptr
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className="h-screen flex items-center justify-center font-jersey text-2xl text-white bg-[#121212]">Preparing...</div>;
  }

  const coverUrl = getCoverUrl(currentQuestion.correct.fileName);

  return (
    <div className="p-4 max-w-md mx-auto font-jersey bg-[#121212] min-h-screen text-white flex flex-col">
      {/* Üst Bilgi */}
      <div className="flex justify-between items-center mb-6 mt-2">
        <span className="text-gray-400 text-xl">ROUND {currentRound + 1}/5</span>
        <span className="text-[#722ED1] text-xl">SCORE: {score}</span>
      </div>

      {/* Resim Alanı */}
      <div className="w-64 h-64 mx-auto mb-8 bg-black rounded-xl overflow-hidden border-4 border-[#333] shadow-[0_0_40px_rgba(114,46,209,0.3)] flex items-center justify-center relative group">
        {!imageError ? (
          isAnswered ? (
            <img src={coverUrl} className="w-full h-full object-cover animate-in fade-in duration-500" />
          ) : (
            <PixelCanvas src={coverUrl} onError={() => setImageError(true)} />
          )
        ) : (
          <div className="text-white text-8xl font-black select-none">?</div>
        )}
      </div>

      {/* Şıklar */}
      <div className="grid grid-cols-2 gap-4 flex-1 content-start">
        {currentQuestion.options.map((a: any) => {
          let btnClass = "bg-[#1e1e1e] text-gray-300 border-[#333] hover:border-[#555]";
          
          if (isAnswered) {
            if (a.id === currentQuestion.correct.id) {
              btnClass = "bg-green-600 text-white border-green-800 shadow-[0_4px_0_0_#166534]"; // green
            } else if (a.id === selectedOption) {
              btnClass = "bg-red-600 text-white border-red-800 shadow-[0_4px_0_0_#991b1b]"; // red
            } else {
              btnClass = "bg-[#1a1a1a] text-gray-600 opacity-30 border-[#222]"; // dimmed
            }
          } else {
            // normal state hover effect 
            btnClass += " shadow-[0_4px_0_0_#000] active:translate-y-1 active:shadow-none";
          }

          return (
            <button
              key={a.id}
              disabled={isAnswered}
              onClick={() => handleGuess(a.id)}
              className={`p-3 h-24 rounded-xl border-b-4 text-xl transition-all flex items-center justify-center text-center leading-tight ${btnClass}`}
            >
              {a.album}
            </button>
          );
        })}
      </div>
    </div>
  );
};
