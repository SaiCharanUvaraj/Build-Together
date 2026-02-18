import React, { useState, useEffect } from 'react';
import {
    ArrowBack as ArrowBackIcon,
    LocalPolice as PoliceIcon,
    DirectionsCar as CarIcon,
    MyLocation as UserIcon,
    Circle as CircleIcon
} from '@mui/icons-material';

const TrackingScreen = ({ onBack, onArrival }) => {
    const [seconds, setSeconds] = useState(0);
    const [policePos, setPolicePos] = useState({ x: 10, y: 10 });

    // Timer Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Police Movement Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setPolicePos(pos => ({
                x: Math.min(pos.x + 1.5, 45),
                y: Math.min(pos.y + 1.2, 45)
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins} min ${secs} sec`;
    };

    const handleManualArrival = () => {
        onArrival(formatTime(seconds));
    };

    return (
        <div className="flex flex-col h-screen-dvh bg-gov-blue-dark text-white font-sans overflow-hidden">
            {/* Header */}
            <header className="px-6 pt-8 pb-6 flex items-center gap-4 bg-gov-blue-dark/80 backdrop-blur-md">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                    <ArrowBackIcon fontSize="small" />
                </button>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">Emergency Active</h1>
                    <p className="text-xs text-emergency font-bold animate-pulse uppercase tracking-widest">Request Sent • Tracking Live</p>
                </div>
            </header>

            <main className="flex-1 flex flex-col px-6">
                {/* Timer Section */}
                <div className="text-center py-4 sm:py-8">
                    <div className="text-4xl sm:text-6xl font-mono font-black tracking-tighter text-white mb-2">
                        {formatTime(seconds)}
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/40">Elapsed Response Time</div>
                </div>

                {/* Map Simulation Area */}
                <div className="flex-1 glass-panel rounded-3xl relative overflow-hidden bg-slate-900 border-white/10 mb-6 min-h-[250px]">
                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%">
                            <pattern id="trackingGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#trackingGrid)" />
                        </svg>
                    </div>

                    {/* Route Line (Simulated) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                        <path
                            d="M 50,50 L 250,350"
                            stroke="white"
                            strokeWidth="4"
                            strokeDasharray="10,10"
                            className="animate-[dash_20s_linear_infinite]"
                            style={{ strokeLinecap: 'round' }}
                        />
                    </svg>

                    {/* User Marker (Fixed Center-ish) */}
                    <div className="absolute top-[350px] left-[250px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                            <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-xl relative z-10 flex items-center justify-center">
                                <UserIcon sx={{ fontSize: 12, color: 'white' }} />
                            </div>
                        </div>
                        <span className="mt-2 text-[10px] font-bold uppercase bg-blue-600 px-2 py-0.5 rounded shadow-lg">You</span>
                    </div>

                    {/* Police Vehicle Marker (Moving) */}
                    <div
                        className="absolute transition-all duration-1000 ease-linear"
                        style={{
                            top: `${policePos.y * 7}px`,
                            left: `${policePos.x * 5}px`
                        }}
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-emergency rounded-xl shadow-2xl flex items-center justify-center border-2 border-white/50">
                                <CarIcon className="text-white animate-bounce" fontSize="small" />
                            </div>
                            <span className="mt-2 text-[10px] font-bold uppercase bg-emergency px-2 py-0.5 rounded shadow-lg">Police Unit 402</span>
                        </div>
                    </div>
                </div>

                {/* ETA Card */}
                <div className="glass-panel p-5 rounded-3xl mb-4 border-white/20 bg-white/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emergency/20 flex items-center justify-center">
                                <PoliceIcon className="text-emergency" />
                            </div>
                            <div>
                                <div className="text-sm font-bold">Officer on the way</div>
                                <div className="text-xs text-white/50">Dispatch Unit: HYD-P08</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black text-emergency leading-none">4 min</div>
                            <div className="text-[10px] font-bold text-white/30 uppercase mt-1">Estimated Arrival</div>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium">
                        <div className="flex items-center gap-2">
                            <CircleIcon sx={{ fontSize: 8, color: '#10b981' }} />
                            <span>2.4 km remaining</span>
                        </div>
                        <div className="text-white/40">Heading North-West</div>
                    </div>
                </div>

                {/* Simulation Trigger */}
                <button
                    onClick={handleManualArrival}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-white/40 mb-10 border border-white/5 transition-colors"
                >
                    Simulate Arrival (Geofence Trigger)
                </button>
            </main>

            {/* Footer / Safe Area */}
            <footer className="h-4 bg-gov-blue-dark"></footer>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}} />
        </div>
    );
};

export default TrackingScreen;
