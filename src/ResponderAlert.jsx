import React from 'react';
import {
    Warning as WarningIcon,
    LocationOn as LocationIcon,
    Map as MapIcon,
    Check as AcceptIcon,
    Close as DeclineIcon,
    Route as RouteIcon
} from '@mui/icons-material';

const ResponderAlert = ({ onAccept, onDecline }) => {
    return (
        <div className="flex flex-col h-screen-dvh bg-slate-900 text-white font-sans overflow-hidden">
            {/* Red Alert Banner */}
            <div className="bg-emergency px-6 py-4 sm:py-6 flex items-center justify-between shadow-2xl animate-pulse">
                <div className="flex items-center gap-3">
                    <WarningIcon sx={{ fontSize: 28 }} className="sm:text-[32px]" />
                    <div className="leading-tight">
                        <div className="text-lg sm:text-xl font-black uppercase tracking-tighter">Emergency Alert</div>
                        <div className="text-[9px] sm:text-[10px] font-bold opacity-80 uppercase tracking-widest">Priority 1 • Police Assistance Needed</div>
                    </div>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/50 flex items-center justify-center font-bold text-[10px] sm:text-xs">
                    01
                </div>
            </div>

            <main className="flex-1 flex flex-col px-6 py-6 sm:py-8">
                {/* Incident Info */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                        <LocationIcon fontSize="small" />
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Incident Location</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-2">XYZ Street, Jubilee Hills, Hyderabad</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full text-xs sm:text-sm font-bold border border-slate-700">
                            <RouteIcon fontSize="inherit" className="text-emergency" />
                            1.8 km away
                        </div>
                        <div className="text-[10px] sm:text-xs text-slate-500 font-medium">ETA: 4-6 mins</div>
                    </div>
                </div>

                {/* Small Map Preview */}
                <div className="flex-1 glass-panel rounded-3xl relative overflow-hidden bg-slate-800 border-white/5 mb-8">
                    {/* Mock Map Background */}
                    <div className="absolute inset-0 opacity-20">
                        <svg width="100%" height="100%">
                            <pattern id="policeGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#policeGrid)" />
                        </svg>
                    </div>

                    {/* Animated Route Line */}
                    <svg className="absolute inset-0 w-full h-full">
                        <path
                            d="M 50,50 Q 150,150 250,280"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeDasharray="8,8"
                            className="animate-[dash_10s_linear_infinite]"
                        />
                    </svg>

                    {/* Officer Position */}
                    <div className="absolute top-[50px] left-[50px] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg shadow-xl flex items-center justify-center border-2 border-white">
                            <MapIcon sx={{ fontSize: 16 }} />
                        </div>
                    </div>

                    {/* Target Position */}
                    <div className="absolute bottom-[80px] right-[80px]">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emergency rounded-full animate-ping opacity-75"></div>
                            <div className="w-6 h-6 bg-emergency rounded-full border-2 border-white shadow-xl relative z-10"></div>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-wider">
                        Full map available on accept
                    </div>
                </div>

                {/* Responder Dashboard Style Info */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Civilian Contact</div>
                        <div className="text-sm font-bold">John Doe</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Time Elapsed</div>
                        <div className="text-sm font-bold text-emergency">00:42</div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={onDecline}
                        className="flex-1 py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 border border-slate-700"
                    >
                        <DeclineIcon />
                        Decline
                    </button>
                    <button
                        onClick={onAccept}
                        className="flex-[2] py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                        <AcceptIcon />
                        Accept
                    </button>
                </div>
            </main>

            <footer className="h-4 bg-slate-900"></footer>
        </div>
    );
};

export default ResponderAlert;
