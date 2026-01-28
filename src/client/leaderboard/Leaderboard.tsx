import { useState, useEffect } from 'react';
import { Context } from '@devvit/public-api';
import '../index.css'; 

const AVATARS = [
  "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png",
  "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_2.png",
  "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png",
  "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png",
  "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png",
  "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_6.png",
  "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png",
];

const INITIAL_DATA = {
  list: [],
  myRank: '-',
  myScore: 0
};

// --- MOR TEMA RENKLERİ ---
const PRIMARY_COLOR = '#722ED1'; // Mor
const BG_DARK = '#1a1a1a';
const BORDER_COLOR = '#222';

export const Leaderboard = ({ onBack, context, userAvatar }: { onBack: () => void, context: Context, userAvatar?: string }) => {
  const [data, setData] = useState<any>(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); 

  useEffect(() => {
    let isMounted = true; 

    const fetchLeaderboard = async () => {
      console.log("Leaderboard: Fetching data...");
      
      if (!context || !context.username) {
        console.warn("Leaderboard: Context or Username missing.");
        if (isMounted) setLoading(false);
        return;
      }

      const safetyTimeout = setTimeout(() => {
        if (isMounted && loading) {
          console.error("Leaderboard: Timeout, stopping load.");
          setLoading(false);
        }
      }, 5000);

      try {
        const response = await fetch('/api/get-leaderboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        
        if (!data || !data.topList) {
          console.log("Leaderboard: No data received");
          if (isMounted) setData(INITIAL_DATA);
          return;
        }

        const topList = data.topList || [];
        const myScore = data.myScore || 0;
        const myRank = data.myRank || '-';

        if (isMounted) {
          setData({
            list: topList,
            myRank: myRank,
            myScore: myScore
          });
        }
      } catch (e) {
        console.error("Leaderboard: Error:", e);
        if (isMounted) setData(INITIAL_DATA);
      } finally {
        clearTimeout(safetyTimeout);
        if (isMounted) setLoading(false);
      }
    };

    fetchLeaderboard();

    return () => {
      isMounted = false; 
    };
  }, [refreshKey]);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(k => k + 1);
  };

  return (
    <div className={`flex flex-col min-h-screen bg-[${BG_DARK}] text-white font-jersey`}>
      
      {/* HEADER */}
      <div className={`bg-[${BG_DARK}] p-4 pb-4 shadow-sm rounded-b-2xl z-10 border-b-4 border-[${BORDER_COLOR}]`}>
        <div className="flex justify-between items-center mb-1">
          <button 
            onClick={onBack}
            className={`text-xl text-gray-500 hover:text-[${PRIMARY_COLOR}] transition-colors active:scale-95 flex items-center gap-1`}
          >
            <span>←</span> BACK
          </button>
          {/* GLOBALLY CHOPPED Başlığı */}
          <span className={`text-lg font-bold text-[${PRIMARY_COLOR}] tracking-widest uppercase`}>
            GLOBALLY CHOPPED
          </span>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`text-xl text-gray-500 hover:text-[${PRIMARY_COLOR}] transition-colors active:scale-95 disabled:opacity-50`}
            title="Refresh"
          >
            🔄
          </button>
        </div>
        <h1 className="text-4xl text-white text-center tracking-wide leading-none drop-shadow-sm mt-2">
          LEADERBOARD
        </h1>
        <p className="text-center text-gray-400 text-sm mt-1">All-Time Best</p>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 px-4 pb-24 overflow-y-auto pt-4">
        {loading ? (
           <div className="flex flex-col justify-center items-center h-40 animate-pulse gap-2">
             <div className="text-4xl">⏳</div>
             <div className="text-xl text-gray-500 font-jersey">Loading...</div>
           </div>
        ) : (
          <div className="flex flex-col gap-3">
            {data && data.list && data.list.length > 0 ? (
              data.list.map((user: any) => (
                <div 
                  key={user.rank}
                  className={`flex items-center p-3 rounded-xl shadow-sm border-b-4 transition-transform 
                    ${user.isMe 
                      ? `bg-[#2a2a2a] border-[${PRIMARY_COLOR}] scale-[1.02] z-10` // Kendisi ise Mor border
                      : `bg-[#1a1a1a] border-[${BORDER_COLOR}]`}
                  `}
                >
                  <div className={`
                    w-8 h-8 flex items-center justify-center rounded-lg text-xl mr-3 border-2 border-black/10 shrink-0
                    ${user.rank === 1 ? 'bg-yellow-400 text-white' : 
                      user.rank === 2 ? 'bg-gray-300 text-white' : 
                      user.rank === 3 ? 'bg-orange-400 text-white' : 'bg-[#2a2a2a] text-gray-400'}
                  `}>
                    {user.rank}
                  </div>
                  <img 
                    src={user.isMe && userAvatar ? userAvatar : user.avatar} 
                    alt="avatar" 
                    className="w-10 h-10 rounded-lg bg-[#2a2a2a] border-2 border-[#333] shadow-sm shrink-0" 
                  />
                  <div className="flex-1 ml-3 overflow-hidden">
                    <div className={`text-xl leading-none truncate ${user.isMe ? `text-[${PRIMARY_COLOR}]` : 'text-white'}`}>
                      {user.username} {user.isMe && '(You)'}
                    </div>
                  </div>
                  <div className="text-2xl text-white shrink-0">
                    {user.score} <span className="text-base text-gray-500">PTS</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center mt-10 text-center opacity-60">
                <div className="text-6xl mb-2">∅</div>
                <div className="text-xl text-gray-400 font-jersey">
                  No one has played yet.<br/>Be the first!
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FOOTER */}
      {!loading && (
        <div className={`fixed bottom-0 left-0 right-0 bg-[${BG_DARK}] border-t-4 border-[${BORDER_COLOR}] p-3 pb-5 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]`}>
          <div className="flex items-center justify-between max-w-md mx-auto">
            <span className="text-lg text-gray-500 uppercase">Your Rank</span>
            <div className="flex items-center gap-2 text-xl">
              <span className="text-white">#{data.myRank}</span>
              <span className="text-gray-600">|</span>
              <span className={`text-[${PRIMARY_COLOR}]`}>{data.myScore} Points</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
