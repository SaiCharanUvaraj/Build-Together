import React from 'react';
import {
    LocalPolice as PoliceIcon,
    LocationOn as LocationIcon,
    History as HistoryIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

const CivilianHome = ({ onTrigger }) => {
    const recentRequests = [
        { id: 1, type: 'Police', date: '2026-02-17 14:20', status: 'Resolved', time: '5m 30s' },
        { id: 2, type: 'Police', date: '2026-02-15 09:15', status: 'Resolved', time: '6m 12s' },
        { id: 3, type: 'Police', date: '2026-02-10 22:45', status: 'Resolved', time: '4m 55s' },
    ];

    return (
        <div className="flex flex-col h-screen-dvh bg-slate-50 text-slate-900 font-sans">
            {/* Header */}
            <header className="px-6 pt-8 pb-4 bg-white/50 backdrop-blur-md border-b border-slate-200">
                <h1 className="text-2xl font-bold tracking-tight text-gov-blue">RapidResponse</h1>
            </header>

            <main className="flex-1 flex flex-col px-6 overflow-y-auto pb-10">
                {/* Location Section */}
                <div className="mt-6">
                    <div className="flex items-center gap-2 mb-3">
                        <LocationIcon className="text-gov-blue" fontSize="small" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">Current Location</span>
                    </div>
                    <div className="glass-panel rounded-2xl p-4 relative overflow-hidden h-32 flex items-end">
                        {/* Mock Map Background */}
                        <div className="absolute inset-0 bg-gov-blue/5">
                            {/* SVG Mock Map Grid */}
                            <svg width="100%" height="100%" className="opacity-20">
                                <defs>
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                            {/* Stylized "Roads" */}
                            <div className="absolute top-1/2 left-0 w-full h-4 bg-white/40 -rotate-12 translate-y-[-50%]"></div>
                            <div className="absolute top-0 left-1/3 w-4 h-full bg-white/40"></div>
                            {/* User Dot */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 bg-gov-blue rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                            </div>
                        </div>

                        <div className="relative z-10 w-full bg-white/90 p-2 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2">
                            <LocationIcon className="text-emergency" fontSize="inherit" />
                            XYZ Street, Hyderabad, TS
                        </div>
                    </div>
                </div>

                {/* Emergency Button Section */}
                <div className="flex-1 flex flex-col items-center justify-center py-6 sm:py-10">
                    <button
                        onClick={onTrigger}
                        className="group relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-emergency hover:bg-emergency-hover transition-all duration-300 shadow-2xl flex flex-col items-center justify-center text-white animate-pulse-red active:scale-95"
                    >
                        <PoliceIcon sx={{ fontSize: 48 }} className="sm:text-[64px] mb-1" />
                        <span className="text-lg sm:text-xl font-black tracking-widest uppercase">Call Police</span>

                        {/* Button Ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-white/20 scale-110 group-active:scale-100 transition-transform"></div>
                    </button>
                    <p className="mt-4 sm:mt-6 text-[10px] sm:text-sm text-slate-400 font-medium tracking-wide uppercase">Immediate dispatch to location</p>
                </div>

                {/* Recent History Section */}
                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <HistoryIcon className="text-slate-400" fontSize="small" />
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Recent Requests</h2>
                        </div>
                        <button className="text-xs font-bold text-gov-blue uppercase hover:underline">View All</button>
                    </div>

                    <div className="space-y-3">
                        {recentRequests.map((req) => (
                            <div
                                key={req.id}
                                className="glass-panel p-4 rounded-xl flex items-center justify-between hover:bg-white/90 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emergency/10 flex items-center justify-center text-emergency">
                                        <PoliceIcon fontSize="small" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-800">Police Assistance</div>
                                        <div className="text-xs text-slate-400">{req.date}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                                        {req.time}
                                    </div>
                                    <ChevronRightIcon className="text-slate-300" fontSize="small" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Navigation Padding for Safe Areas */}
            <footer className="h-6 bg-slate-50"></footer>
        </div>
    );
};

export default CivilianHome;
