import '../index.css';
import { navigateTo, context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode, useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { App as Game } from '../game/App';
import { Leaderboard } from '../leaderboard/Leaderboard';

// --- 1. icons ---
import icon1 from '../../../public/spicons/1.png';
import icon2 from '../../../public/spicons/2.png';
import icon3 from '../../../public/spicons/3.png';
import icon4 from '../../../public/spicons/4.png';
import icon5 from '../../../public/spicons/5.png';
import icon6 from '../../../public/spicons/6.png';
import icon7 from '../../../public/spicons/7.png';
import logo from '../../../public/logo/logo.png';

const iconUrls = [icon1, icon2, icon3, icon4, icon5, icon6, icon7];

// --- 2. dynamic background ---
const FloatingIcons = () => {
  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      src: iconUrls[Math.floor(random(0, iconUrls.length))],
      left: `${random(0, 100)}%`,
      size: '40px',
      duration: `${random(10, 20)}s`,
      delay: `-${random(0, 20)}s`,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <style>{`
        @keyframes fallDown {
          0% { transform: translateY(-20vh); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
      `}</style>

      {particles.map((p) => (
        <img
          key={p.id}
          src={p.src}
          alt=""
          className="absolute grayscale-[20%]"
          style={{
            left: p.left,
            width: p.size,
            top: 0,
            animation: `fallDown ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export const Splash = () => {
  const [currentView, setCurrentView] = useState<'home' | 'game' | 'leaderboard'>('home');
  
  const ctx = context as any;
  const userImg = ctx.iconUrl || context.snoovatar || "/snoo.png";

  useEffect(() => {
    const savedView = localStorage.getItem('targetView');
    if (savedView === 'leaderboard') setCurrentView('leaderboard');
    else if (savedView === 'game') setCurrentView('game');
    localStorage.removeItem('targetView');
  }, []);

  if (currentView === 'game') return <Game context={context} />;
  if (currentView === 'leaderboard') return <Leaderboard context={context} userAvatar={userImg} onBack={() => setCurrentView('home')} />;

  // --- color palette ---
  const PRIMARY_COLOR = '#722ED1'; // primary 
  const SHADOW_COLOR = '#391085';  // shadow 

  return (
    <div className="flex bg-bg_grey relative flex-col justify-between items-center min-h-screen p-8 text-slate-900 overflow-hidden">
      {/* LOGO */}
      <button
        onClick={() => navigateTo('https://www.reddit.com/r/hiphoptr/')}
        className="absolute top-4 left-4 h-10 w-10 rounded-full z-20 object-cover hover:opacity-80 transition-opacity"
      >
        <img
          src={logo}
          alt="Daily Chopped Logo"
          className="h-full w-full rounded-full object-cover"
        />
      </button>

      {/* background effect */}
      <FloatingIcons />

      {/* --- title and tag --- */}
      <div className="z-10 flex flex-col items-center">
        {/* title */}
        <h1 className="font-jersey text-7xl sm:text-8xl text-white [text-shadow:4px_4px_0_#000,8px_8px_0_#722ED1] leading-none tracking-widest text-center">
          DAILY CHOPPED
        </h1>
        
        {/* global tag */}
        <div className="mt-1 bg-[#722ED1] text-white font-jersey text-xl px-3 py-1 rounded-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform -rotate-2">
          GLOBAL EDITION
        </div>
      </div>

      <div className="z-10 flex flex-col items-center mt-4 w-full">
        <div className="relative group">
          {/* avatar glow purple */}
          <div className="absolute inset-0 bg-purple-500 rounded-full blur opacity-40 animate-pulse"></div>
          <img
            className="w-16 h-16 shadow-xl rounded-full object-cover relative border-2 border-white"
            src={userImg}
            alt="Snoo"
          />
        </div>
        <h1 className="font-jersey text-white mt-2 tracking-tight drop-shadow-sm bg-white/20 backdrop-blur-sm px-4 rounded-xl border border-white/10">
          {context.username ?? 'user'}
        </h1>
      </div>

      <div className="z-10 mt-1 flex flex-col w-full max-w-[280px] gap-4">
        {/* play button */}
        <button
          className="flex items-center justify-center text-white w-full h-16 rounded-2xl font-black text-xl active:shadow-none active:translate-y-1 transition-all hover:brightness-110"
          style={{
            backgroundColor: PRIMARY_COLOR,
            boxShadow: `0 6px 0 0 ${SHADOW_COLOR}`
          }}
          onClick={(e) => {
            localStorage.setItem('targetView', 'game');
            requestExpandedMode(e.nativeEvent, 'default');
            setCurrentView('game');
          }}
        >
          <span className='text-2xl mr-2'>🌍</span><span className='font-jersey text-4xl'> PLAY</span>
        </button>

        {/* leaderboard button */}
        <button
          className="flex font-jersey items-center justify-center bg-white/90 backdrop-blur-sm w-full h-14 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-sm"
          style={{
            color: PRIMARY_COLOR,
            border: `2px solid ${PRIMARY_COLOR}`
          }}
          onClick={(e) => {
            localStorage.setItem('targetView', 'leaderboard');
            requestExpandedMode(e.nativeEvent, 'default');
            setCurrentView('leaderboard');
          }}
        >
          🏆 LEADERBOARD
        </button>
      </div>

      <footer className="z-10 flex gap-6 text-sm font-semibold text-gray-400">
        <button className="hover:text-[#722ED1] font-jersey transition-colors" onClick={() => navigateTo('https://developers.reddit.com/docs')}>Docs</button>
        <button className="hover:text-[#722ED1] font-jersey transition-colors" onClick={() => navigateTo('https://www.reddit.com/r/Devvit')}>r/Devvit</button>
        <button className="hover:text-[#722ED1] font-jersey transition-colors" onClick={() => navigateTo('https://www.reddit.com/user/palisade_parenchyma/')}>Creator</button>
        <button className="hover:text-[#722ED1] font-jersey transition-colors" onClick={() => navigateTo('https://www.reddit.com/r/hiphoptr/')}>r/hiphoptr</button>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
