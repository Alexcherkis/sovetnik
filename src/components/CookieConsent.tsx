import React, { useState, useEffect } from 'react';
import { Button } from './Components';
import { Link } from 'react-router-dom';
import { X, Cookie } from 'lucide-react';
import { ANALYTICS_ENABLED } from '../config/site';

export const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!ANALYTICS_ENABLED) return;
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Show with a slight delay
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        window.dispatchEvent(new Event('cookie_consent_accepted'));
        setIsVisible(false);
    };

    if (!ANALYTICS_ENABLED) return null;
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-8 md:bottom-8 md:right-auto z-[9999] max-w-sm w-full animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 p-6 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-bl-[4rem] -mr-8 -mt-8 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-900 shrink-0">
                            <Cookie size={20} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-brand-900 text-sm mb-1">Мы используем cookie</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                Продолжая использовать сайт, вы соглашаетесь на сбор файлов cookie для аналитики и улучшения работы сайта. <Link to="/privacy" className="underline hover:text-brand-red">Подробнее</Link>
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <Button
                            onClick={handleAccept}
                            size="sm"
                            className="w-full text-xs py-2 shadow-md"
                        >
                            Хорошо, согласен
                        </Button>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="bg-transparent text-slate-400 hover:text-slate-600 p-2 rounded-lg transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
