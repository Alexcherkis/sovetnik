import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useShadowProfile = () => {
    const location = useLocation();

    useEffect(() => {
        try {
            // Инициализация времени входа, если еще нет
            if (!sessionStorage.getItem('sp_entry_time')) {
                sessionStorage.setItem('sp_entry_time', Date.now().toString());
            }

            // Сбор UTM-меток из URL
            const urlParams = new URLSearchParams(window.location.search);
            ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
                if (urlParams.has(param)) {
                    sessionStorage.setItem(`sp_${param}`, urlParams.get(param) || '');
                }
            });

            // Сбор Referrer (откуда пришел)
            if (!sessionStorage.getItem('sp_referrer') && document.referrer) {
                // Исключаем внутренние переходы
                if (!document.referrer.includes(window.location.hostname)) {
                    sessionStorage.setItem('sp_referrer', document.referrer);
                }
            }

            // Определение источника трафика (один раз за сессию)
            if (!sessionStorage.getItem('sp_channel')) {
                const hasAdTags = urlParams.has('utm_source') || urlParams.has('yclid') || urlParams.has('gclid');
                const isCpc = urlParams.get('utm_medium') === 'cpc' || urlParams.get('utm_source') === 'yandex-direct';
                const ref = document.referrer.toLowerCase();

                let channel = 'Прямой заход';

                if (hasAdTags || isCpc) {
                    if (urlParams.get('utm_source')?.includes('yandex') || urlParams.has('yclid')) {
                        channel = '🟡 Реклама (Яндекс.Директ)';
                    } else if (urlParams.get('utm_source')?.includes('vk')) {
                        channel = '🔵 Реклама (ВКонтакте)';
                    } else {
                        channel = '🟢 Реклама (Платный трафик)';
                    }
                } else if (ref) {
                    if (ref.includes('yandex.ru')) {
                        channel = '🔍 Органический поиск (Яндекс)';
                    } else if (ref.includes('google.com') || ref.includes('google.ru')) {
                        channel = '🔍 Органический поиск (Google)';
                    } else {
                        channel = `🔗 Переход с сайта (${new URL(ref).hostname})`;
                    }
                }

                sessionStorage.setItem('sp_channel', channel);
            }

            // Трекинг посещенных страниц
            let pagesStr = sessionStorage.getItem('sp_visited_pages') || '[]';
            const pages = JSON.parse(pagesStr);
            const currentPath = window.location.pathname + window.location.search;

            if (pages[pages.length - 1] !== currentPath) {
                pages.push(currentPath);
                // Храним только последние 8 страниц, чтобы не перегружать
                if (pages.length > 8) pages.shift();
                sessionStorage.setItem('sp_visited_pages', JSON.stringify(pages));
            }
        } catch (e) {
            console.error("ShadowProfile error:", e);
        }
    }, [location.pathname, location.search]);
};

export const getShadowProfileData = () => {
    try {
        const entryTime = parseInt(sessionStorage.getItem('sp_entry_time') || '0', 10);
        const timeOnSiteSeconds = entryTime ? Math.floor((Date.now() - entryTime) / 1000) : 0;

        // Форматируем время в читаемый вид (например "2м 15с")
        const mins = Math.floor(timeOnSiteSeconds / 60);
        const secs = timeOnSiteSeconds % 60;
        const timeOnSiteStr = mins > 0 ? `${mins}м ${secs}с` : `${secs}с`;

        return {
            timeOnSite: timeOnSiteStr,
            channel: sessionStorage.getItem('sp_channel') || 'Прямой заход',
            visitedPages: JSON.parse(sessionStorage.getItem('sp_visited_pages') || '[]'),
            userAgent: navigator.userAgent
        };
    } catch (e) {
        return null;
    }
};
