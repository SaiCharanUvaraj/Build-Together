import React, { useState } from 'react';
import {
    CheckCircle as CheckCircleIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    AccessTime as TimeIcon,
    CalendarToday as DateIcon,
    Share as ShareIcon,
    Home as HomeIcon
} from '@mui/icons-material';

const ArrivalConfirmation = ({ responseTime, onReturnHome }) => {
    const [rating, setRating] = useState(0);
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentDate = new Date().toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div className="flex flex-col h-screen-dvh bg-white text-slate-900 font-sans overflow-hidden">
            {/* Blue Header */}
            <header className="px-6 pt-8 sm:pt-10 pb-16 sm:pb-20 bg-gov-blue text-white rounded-b-[30px] sm:rounded-b-[40px] shadow-lg relative">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-center">Service Completed</h1>

                {/* Floating Success Icon */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full p-2 shadow-2xl">
                    <div className="w-full h-full bg-emerald-500 rounded-full flex items-center justify-center text-white">
                        <CheckCircleIcon sx={{ fontSize: 40 }} className="sm:text-[48px]" />
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col px-6 sm:px-8 pt-12 sm:pt-16 items-center overflow-y-auto">
                {/* Status Text */}
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1">Police Arrived</h2>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide uppercase">Emergency assistance delivered</p>
                </div>

                {/* Stats Card */}
                <div className="w-full bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gov-blue/10 rounded-xl flex items-center justify-center text-gov-blue">
                                <TimeIcon />
                            </div>
                            <span className="text-sm font-bold text-slate-500">Response Time</span>
                        </div>
                        <div className="text-xl font-black text-gov-blue">{responseTime}</div>
                    </div>

                    <div className="h-px bg-slate-200 w-full"></div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500">
                                <DateIcon />
                            </div>
                            <span className="text-sm font-bold text-slate-500">Date & Time</span>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-slate-800">{currentDate}</div>
                            <div className="text-xs text-slate-400">{currentTime}</div>
                        </div>
                    </div>
                </div>

                {/* Rating Section */}
                <div className="w-full text-center py-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Rate Protection Service</h3>
                    <div className="flex justify-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="text-amber-400 transition-transform active:scale-90"
                            >
                                {rating >= star ? (
                                    <StarIcon sx={{ fontSize: 40 }} />
                                ) : (
                                    <StarBorderIcon sx={{ fontSize: 40 }} />
                                )}
                            </button>
                        ))}
                    </div>
                    {rating > 0 && (
                        <p className="text-xs font-bold text-emerald-600 animate-fade-in">Thank you for your feedback!</p>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-auto w-full pb-10 flex flex-col gap-3">
                    <button className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                        <ShareIcon fontSize="small" />
                        Report Details
                    </button>
                    <button
                        onClick={onReturnHome}
                        className="w-full py-4 bg-gov-blue text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gov-blue-dark transition-colors shadow-xl shadow-gov-blue/20"
                    >
                        <HomeIcon fontSize="small" />
                        Return Home
                    </button>
                </div>
            </main>

            <footer className="h-2 bg-white"></footer>
        </div>
    );
};

export default ArrivalConfirmation;
