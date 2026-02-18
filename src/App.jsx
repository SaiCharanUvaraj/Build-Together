import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CivilianHome from './CivilianHome';
import TrackingScreen from './TrackingScreen';
import ArrivalConfirmation from './ArrivalConfirmation';
import ResponderAlert from './ResponderAlert';
import ResponderNavigation from './ResponderNavigation';
import AdminDashboard from './AdminDashboard';
import './index.css';

function App() {
    const [perspective, setPerspective] = useState('civilian'); // 'civilian' | 'responder' | 'admin'
    const [screen, setScreen] = useState('home');
    const [finalTime, setFinalTime] = useState('');

    const handleArrival = (time) => {
        setFinalTime(time);
        setScreen('arrival');
    };

    return (
        <div className="App flex flex-col h-screen-dvh overflow-hidden relative">

            {/* Perspective Toggle (POC Switcher) - Mobile Optimized */}
            <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-[9999] flex gap-0.5 sm:gap-1 bg-black/90 p-1 rounded-xl backdrop-blur-xl shadow-2xl scale-[0.85] sm:scale-100 origin-top-right border border-white/10">
                <button
                    onClick={() => { setPerspective('civilian'); setScreen('home'); }}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black transition-all ${perspective === 'civilian' ? 'bg-gov-blue text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                >
                    CITIZEN
                </button>
                <button
                    onClick={() => { setPerspective('responder'); setScreen('alert'); }}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black transition-all ${perspective === 'responder' ? 'bg-emergency text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                >
                    POLICE
                </button>
                <button
                    onClick={() => { setPerspective('admin'); setScreen('dashboard'); }}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black transition-all ${perspective === 'admin' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                >
                    ADMIN
                </button>
            </div>

            {perspective === 'civilian' ? (
                <>
                    {screen === 'home' && (
                        <CivilianHome onTrigger={() => setScreen('tracking')} />
                    )}

                    {screen === 'tracking' && (
                        <TrackingScreen
                            onBack={() => setScreen('home')}
                            onArrival={handleArrival}
                        />
                    )}

                    {screen === 'arrival' && (
                        <ArrivalConfirmation
                            responseTime={finalTime}
                            onReturnHome={() => setScreen('home')}
                        />
                    )}
                </>
            ) : perspective === 'responder' ? (
                <>
                    {screen === 'alert' && (
                        <ResponderAlert
                            onAccept={() => setScreen('navigation')}
                            onDecline={() => setPerspective('civilian')}
                        />
                    )}

                    {screen === 'navigation' && (
                        <ResponderNavigation
                            onArrive={() => alert('Arrived at Location. Tracking Resolved.')}
                            onBack={() => setScreen('alert')}
                        />
                    )}
                </>
            ) : (
                <AdminDashboard />
            )}

        </div>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}

export default App;