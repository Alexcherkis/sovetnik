import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { YANDEX_METRICA_ID, GOOGLE_ANALYTICS_ID } from '../config/analytics';
import { ANALYTICS_ENABLED } from '../config/site';

declare global {
  interface Window {
    ym: (id: number, action: string, params: string) => void;
    gtag: (command: string, targetId: string, params?: object) => void;
    dataLayer: any[];
  }
}

// Replace placeholders in config/analytics.ts with REAL IDs


export const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;
    const hasConsent = () => localStorage.getItem('cookie_consent') === 'true';

    const loadScriptOnce = (id: string, src: string) => {
      if (document.getElementById(id)) return;
      const s = document.createElement('script');
      s.id = id;
      s.async = true;
      s.src = src;
      document.head.appendChild(s);
    };

    const initAnalyticsIfAllowed = () => {
      if (!hasConsent()) return;

      // GA4
      if (GOOGLE_ANALYTICS_ID) {
        loadScriptOnce('ga4-gtag', `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`);
        window.dataLayer = window.dataLayer || [];
        if (typeof window.gtag !== 'function') {
          window.gtag = function gtag() { window.dataLayer.push(arguments); };
          window.gtag('js', new Date() as any);
          window.gtag('config', GOOGLE_ANALYTICS_ID, { send_page_view: false });
        }
      }

      // Yandex Metrika
      if (YANDEX_METRICA_ID) {
        if (typeof window.ym !== 'function') {
          window.ym = function ym() { (window.ym as any).a = (window.ym as any).a || []; (window.ym as any).a.push(arguments); };
          (window.ym as any).l = Date.now();
          loadScriptOnce('yandex-metrika', `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRICA_ID}`);
          window.ym(YANDEX_METRICA_ID, 'init' as any, {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: 'dataLayer',
            accurateTrackBounce: true,
            trackLinks: true
          } as any);
        }
      }
    };

    initAnalyticsIfAllowed();

    const onConsent = () => initAnalyticsIfAllowed();
    window.addEventListener('cookie_consent_accepted', onConsent);
    return () => window.removeEventListener('cookie_consent_accepted', onConsent);
  }, []);

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;
    const hasConsent = () => localStorage.getItem('cookie_consent') === 'true';

    if (!hasConsent()) {
      return;
    }

    // 1. Log to Console ONLY in Development
    if (import.meta.env.MODE === 'development') {
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
    }

    // 2. Send to Yandex Metrica (Real Data)
    if (typeof window.ym === 'function') {
      window.ym(YANDEX_METRICA_ID, 'hit', location.pathname);
    }

    // 3. Send to Google Analytics 4 (Real Data)
    if (typeof window.gtag === 'function') {
      window.gtag('config', GOOGLE_ANALYTICS_ID, {
        page_path: location.pathname + location.search
      });
    } else if (import.meta.env.MODE === 'development') {
      console.log('GA4 not configured or in dev mode. Skipping send.');
    }

  }, [location]);

  return null;
};