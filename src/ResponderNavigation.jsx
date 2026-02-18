import React, { useState, useEffect } from 'react';
import {
    Navigation as NavIcon,
    LocationOn as LocationIcon,
    Circle as CircleIcon,
    CheckCircle as ArrivedIcon,
    ArrowBack as ArrowBackIcon,
    Wifi as SignalIcon,
    Battery90 as BatteryIcon
} from '@mui/icons-material';

const ResponderNavigation = ({ onArrive, onBack }) => {
    const [distance, setDistance] = useState(1.8);
    const [eta, setEta] = useState(6);
    const [arrived, setArrived] = useState(false);
    const [dots, setDots] = useState([]);

    // Simulate movement and distance reduction
    useEffect(() => {
        if (arrived) return;

        const interval = setInterval(() => {
            setDistance(prev => {
                const next = Math.max(0, prev - 0.1);
                if (next === 0) {
                    setArrived(true);
                    setTimeout(() => onArrive(), 1500); // Auto-trigger arrival state
                }
                return next;
            });
            setEta(prev => Math.max(1, Math.ceil(distance * 3)));
        }, 2000);

        return () => clearInterval(interval);
    }, [distance, arrived, onArrive]);

    // Generate dynamic map dots for tactical feel
    useEffect(() => {
        const newDots = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random() * 0.5 + 0.1
        }));
        setDots(newDots);
    }, []);

    return (
        <div className="flex flex-col h-screen-dvh bg-slate-950 text-white font-sans overflow-hidden">
            {/* Tactical HUD Header */}
            <header className="px-6 pt-10 pb-6 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowBackIcon fontSize="small" />
                    </button>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                            <CircleIcon sx={{ fontSize: 8 }} className="animate-pulse" />
                            System Live
                        </div>
                        <h1 className="text-lg font-bold">Tactical Navigation</h1>
                    </div>
                </div>
                <div className="flex gap-2 opacity-50">
                    <SignalIcon fontSize="small" />
                    <BatteryIcon fontSize="small" />
                </div>
            </header>

            {/* Main Map View */}
            <main className="flex-1 relative bg-slate-950">
                {/* Radar/Map Background */}
                <div className="absolute inset-0">
                    <svg width="100%" height="100%" className="opacity-20">
                        <defs>
                            <radialGradient id="radar" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#000" />
                                <stop offset="100%" stopColor="#001a33" />
                            </radialGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#radar)" />
                        <circle cx="50%" cy="50%" r="100" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="5,5" />
                        <circle cx="50%" cy="50%" r="200" fill="none" stroke="#fff" strokeWidth="0.2" strokeDasharray="5,5" />
                    </svg>

                    {/* Tactical Dots */}
                    {dots.map(dot => (
                        <div
                            key={dot.id}
                            className="absolute w-1 h-1 bg-blue-400 rounded-full"
                            style={{ left: `${dot.x}%`, top: `${dot.y}%`, opacity: dot.opacity }}
                        />
                    ))}
                </div>

                {/* HUD Overlay Stats */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex gap-3 sm:gap-4">
                    <div className="flex-1 bg-slate-900/90 backdrop-blur border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl">
                        <div className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 leading-none">ETA</div>
                        <div className="text-xl sm:text-3xl font-black text-white">{eta} <span className="text-[10px] sm:text-sm font-bold opacity-50 uppercase">min</span></div>
                    </div>
                    <div className="flex-1 bg-slate-900/90 backdrop-blur border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl">
                        <div className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 leading-none">Dist</div>
                        <div className="text-xl sm:text-3xl font-black text-emerald-500">{distance.toFixed(1)} <span className="text-[10px] sm:text-sm font-bold opacity-50 uppercase text-white">km</span></div>
                    </div>
                </div>

                {/* Center Navigation Visual */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-full h-full p-20 flex items-center justify-center">
                        {/* Route Line Simulation */}
                        <svg width="100%" height="100%" className="absolute inset-0">
                            <path
                                d="M 100,100 L 200,300 L 350,500"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="4"
                                strokeDasharray="10,10"
                                className="animate-[dash_15s_linear_infinite]"
                            />
                        </svg>

                        {/* Destination Indicator */}
                        <div className="absolute bottom-[20%] right-[30%] flex flex-col items-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-30"></div>
                                <LocationIcon className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" sx={{ fontSize: 40 }} />
                            </div>
                            <div className="bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded mt-1 uppercase tracking-tighter">Target</div>
                        </div>

                        {/* Responder Pulsating Indicator */}
                        <div className="absolute top-[20%] left-[20%] transition-all duration-1000">
                            <div className="w-12 h-12 bg-white/10 rounded-full border border-white/20 flex items-center justify-center animate-pulse">
                                <NavIcon className="text-white rotate-45" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Control Card */}
                <div className="absolute bottom-8 left-6 right-6">
                    <div className={`p-6 rounded-[2.5rem] transition-all duration-500 ${arrived ? 'bg-emerald-600' : 'bg-slate-900 border border-white/10'} shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center justify-between`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-3xl flex items-center justify-center ${arrived ? 'bg-white text-emerald-600' : 'bg-white/5 text-white'}`}>
                                {arrived ? <ArrivedIcon fontSize="large" /> : <NavIcon className="animate-spin-slow" />}
                            </div>
                            <div>
                                <div className={`text-sm font-black uppercase tracking-widest ${arrived ? 'text-white' : 'text-white'}`}>
                                    {arrived ? 'Arrived at Scene' : 'On the Way'}
                                </div>
                                <div className={`text-xs ${arrived ? 'text-white/80' : 'text-slate-500'}`}>
                                    {arrived ? 'Deploying Response' : 'En route to Jubilee Hills'}
                                </div>
                            </div>
                        </div>

                        {!arrived && (
                            <div className="flex flex-col items-end">
                                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded-full text-[10px] font-black border border-emerald-500/30 uppercase tracking-tighter">
                                    Tactical Link Active
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
        </div>
    );
};

export default ResponderNavigation;
