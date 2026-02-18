import React, { useState } from 'react';
import {
    Dashboard as DashboardIcon,
    Map as MapIcon,
    Assessment as AnalyticsIcon,
    FilterAlt as FilterIcon,
    TrendingDown as DownIcon,
    TrendingUp as UpIcon,
    AccessTime as TimeIcon,
    Public as RegionIcon
} from '@mui/icons-material';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('heatmap');

    const kpis = [
        { title: 'Avg Response Time', value: '4m 32s', change: '-12%', trend: 'down', color: 'bg-blue-500' },
        { title: 'Fastest Area', value: 'Banjara Hills', change: '2m 15s', trend: 'neutral', color: 'bg-emerald-500' },
        { title: 'Slowest Area', value: 'Old City', change: '8m 45s', trend: 'up', color: 'bg-amber-500' },
        { title: 'Total Requests', value: '1,284', change: '+8%', trend: 'up', color: 'bg-indigo-500' },
    ];

    const heatmapData = [
        { name: 'Jubilee Hills', time: '3m 10s', cases: 145, intensity: 0.2, color: '#10b981' },
        { name: 'Banjara Hills', time: '2m 45s', cases: 230, intensity: 0.1, color: '#059669' },
        { name: 'Gachibowli', time: '5m 20s', cases: 310, intensity: 0.5, color: '#f59e0b' },
        { name: 'Hitech City', time: '4m 15s', cases: 280, intensity: 0.4, color: '#fbbf24' },
        { name: 'Old City', time: '8m 50s', cases: 190, intensity: 0.9, color: '#ef4444' },
        { name: 'Secunderabad', time: '6m 30s', cases: 120, intensity: 0.7, color: '#f87171' },
    ];

    return (
        <div className="flex flex-col h-screen-dvh bg-slate-50 text-slate-900 font-sans overflow-hidden">
            {/* Admin Header */}
            <header className="px-4 sm:px-8 py-4 sm:py-6 bg-white border-b border-slate-200 flex flex-col gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gov-blue rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
                            <DashboardIcon />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-black tracking-tight text-gov-blue uppercase leading-tight">Emergency Response Analytics</h1>
                            <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monitoring Dashboard • SDG Goal 16</p>
                        </div>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
                        <button onClick={() => setActiveTab('heatmap')} className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'heatmap' ? 'bg-white shadow-sm text-gov-blue' : 'text-slate-500'}`}>Map View</button>
                        <button onClick={() => setActiveTab('charts')} className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'charts' ? 'bg-white shadow-sm text-gov-blue' : 'text-slate-500'}`}>Analytics</button>
                    </div>
                </div>

                {/* Global Filters */}
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] sm:text-xs font-bold text-slate-600 cursor-pointer hover:bg-white transition-colors">
                        <FilterIcon sx={{ fontSize: 14 }} />
                        Last 30 Days
                    </div>
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] sm:text-xs font-bold text-slate-600 cursor-pointer hover:bg-white transition-colors">
                        <RegionIcon sx={{ fontSize: 14 }} />
                        All Regions
                    </div>
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] sm:text-xs font-bold text-slate-600 cursor-pointer hover:bg-white transition-colors">
                        Police
                    </div>
                    <button className="ml-auto text-[10px] sm:text-xs font-bold text-blue-600 hover:underline">Download report</button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8">
                {/* KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {kpis.map((kpi, idx) => (
                        <div key={idx} className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 ${kpi.color} rounded-2xl bg-opacity-10 flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform`}>
                                    {idx === 0 ? <TimeIcon sx={{ color: kpi.color.replace('bg-', ''), fontSize: 20 }} /> : <AnalyticsIcon sx={{ color: kpi.color.replace('bg-', ''), fontSize: 20 }} />}
                                </div>
                                <div className={`text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full ${kpi.trend === 'down' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                    {kpi.change}
                                </div>
                            </div>
                            <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.title}</div>
                            <div className="text-xl sm:text-2xl font-black text-slate-800">{kpi.value}</div>
                        </div>
                    ))}
                </div>

                {activeTab === 'heatmap' ? (
                    /* Heatmap Section */
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-base sm:text-lg font-black text-slate-800">Geospatial Heatmap</h2>
                                <p className="text-[10px] sm:text-xs text-slate-400">Real-time response intensity by area</p>
                            </div>
                            <div className="flex items-center gap-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                <span>Fast</span>
                                <div className="w-24 sm:w-32 h-2 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500"></div>
                                <span>Slow</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden relative min-h-[400px] sm:min-h-[500px] flex">
                            {/* Simulated Map Background */}
                            <div className="flex-1 relative bg-slate-100 p-4 sm:p-10 flex items-center justify-center overflow-x-auto">
                                <svg width="100%" height="100%" viewBox="0 0 800 500" className="drop-shadow-2xl min-w-[600px] sm:min-w-0">
                                    {/* Abstracted Map Areas */}
                                    {heatmapData.map((area, i) => (
                                        <g key={i} className="cursor-pointer group">
                                            <circle
                                                cx={150 + (i * 120)}
                                                cy={100 + (Math.sin(i) * 50) + (i * 40)}
                                                r={30 + (area.intensity * 40)}
                                                fill={area.color}
                                                fillOpacity="0.6"
                                                className="transition-all duration-500 hover:fill-opacity-80"
                                            />
                                            <circle
                                                cx={150 + (i * 120)}
                                                cy={100 + (Math.sin(i) * 50) + (i * 40)}
                                                r={area.intensity * 20}
                                                fill="white"
                                                fillOpacity="0.4"
                                                className="animate-pulse"
                                            />
                                            {/* Tooltip on Hover */}
                                            <foreignObject x={150 + (i * 120) - 50} y={100 + (Math.sin(i) * 50) + (i * 40) - 100} width="120" height="80" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                <div className="bg-slate-900 text-white p-3 rounded-xl text-[10px] shadow-2xl border border-white/20">
                                                    <div className="font-black mb-1 text-xs">{area.name}</div>
                                                    <div className="flex justify-between border-t border-white/10 pt-1 mt-1">
                                                        <span>Avg Time:</span>
                                                        <span className="font-bold text-emerald-400">{area.time}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Cases:</span>
                                                        <span className="font-bold">{area.cases}</span>
                                                    </div>
                                                </div>
                                            </foreignObject>
                                        </g>
                                    ))}
                                    {/* Route Links */}
                                    <path d="M 150,100 L 270,180 L 390,120 L 510,250" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2" strokeDasharray="5,5" />
                                </svg>

                                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/80 backdrop-blur p-3 sm:p-4 rounded-2xl border border-slate-200">
                                    <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Legend</div>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold">
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Optimal ( &lt; 4m)
                                        </div>
                                        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold">
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Caution ( 4-7m)
                                        </div>
                                        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Critical ( &gt; 7m)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Analytics Charts Section */
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Bar Chart: Response by Area */}
                        <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Response Time by Area</h3>
                            <div className="space-y-4">
                                {heatmapData.map((area, idx) => (
                                    <div key={idx} className="space-y-1.5">
                                        <div className="flex justify-between text-[10px] sm:text-xs font-bold">
                                            <span>{area.name}</span>
                                            <span className="text-slate-400">{area.time}</span>
                                        </div>
                                        <div className="w-full h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{ width: `${area.intensity * 100}%`, backgroundColor: area.color }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pie Chart: Emergency Type */}
                        <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center hover:shadow-md transition-shadow">
                            <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-400 mb-6 w-full">Emergency Distribution</h3>
                            <div className="relative w-32 sm:w-48 h-32 sm:h-48 flex items-center justify-center mb-6 sm:mb-8">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#003366" strokeWidth="20" strokeDasharray="180 360" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FF3B30" strokeWidth="20" strokeDasharray="60 360" strokeDashoffset="-180" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="20" strokeDasharray="11.4 360" strokeDashoffset="-240" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="text-xl sm:text-2xl font-black">1.2k</div>
                                    <div className="text-[8px] font-bold text-slate-400 uppercase">Total</div>
                                </div>
                            </div>
                            <div className="flex gap-4 text-[9px] sm:text-xs font-bold flex-wrap justify-center">
                                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-gov-blue rounded-full"></div> Police (72%)</div>
                                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-emergency rounded-full"></div> Medical (20%)</div>
                                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div> Fire (8%)</div>
                            </div>
                        </div>

                        {/* Line Chart: Monthly Trend */}
                        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Annual Response Trend</h3>
                            <div className="h-40 sm:h-48 w-full relative flex items-end justify-between px-2 sm:px-4 gap-1 overflow-x-auto pb-2">
                                {[40, 60, 45, 80, 55, 70, 90, 65, 50, 85, 95, 75].map((val, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 group relative min-w-[20px] sm:min-w-[40px] flex-1">
                                        <div
                                            className="w-full bg-gov-blue/5 group-hover:bg-gov-blue/20 transition-all rounded-t-lg sm:rounded-t-xl"
                                            style={{ height: `${val * 1.5}px` }}
                                        ></div>
                                        <div className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Admin Footer */}
            <footer className="px-4 sm:px-8 py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center sm:text-left">
                <div>RapidResponse Government Systems v1.2.0</div>
                <div className="flex gap-4 sm:gap-6">
                    <span className="text-emerald-500 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Encrypted</span>
                    <span>Policy ID: SDG-16-4402</span>
                </div>
            </footer>
        </div>
    );
};

export default AdminDashboard;
