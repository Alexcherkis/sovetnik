import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    ym: (id: number, action: string, params: string) => void;
  }
}

// Replace with your REAL Yandex Metrica ID when you have it
const YANDEX_METRICA_ID = 0; // 0 disables the real push, put e.g. 96543210

export const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Log to Console (So you can see data being collected immediately)
    const collectVisitorData = () => {
      const data = {
        path: location.pathname,
        timestamp: new Date().toLocaleTimeString(),
        userAgent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer || 'Direct',
        language: navigator.language
      };

      console.group('%c 🕵️ VISITOR TRACKER ', 'background: #991b1b; color: white; padding: 4px; border-radius: 4px;');
      console.log('User navigated to:', data.path);
      console.log('Device Info:', data);
      console.groupEnd();
    };

    collectVisitorData();

    // 2. Send to Yandex Metrica (Real Data)
    // This connects the React Single Page App routing to Yandex
    if (typeof window.ym === 'function' && YANDEX_METRICA_ID !== 0) {
      window.ym(YANDEX_METRICA_ID, 'hit', location.pathname);
    }

  }, [location]);

  return null;
};