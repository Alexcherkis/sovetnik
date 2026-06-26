import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { YANDEX_METRICA_ID } from '../config/analytics';
import { ANALYTICS_ENABLED, CONTACT_PHONE_E164, SOCIAL_TELEGRAM_URL, SOCIAL_WHATSAPP_URL } from '../config/site';

export const SpeedDial: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // SVG Icons for Social Media (Brand shapes are not in Lucide)
    const TelegramIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.484-.306-.762-.114l-6.32 3.97-2.775-.86c-.604-.197-.615-.602.126-.892l10.83-4.17c.502-.187.942.113.58.511z" />
        </svg>
    );

    const WhatsappIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Expanded Actions */}
            <div className={`flex flex-col gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'}`}>

                {/* Telegram */}
                {SOCIAL_TELEGRAM_URL && (
                <a
                    href={SOCIAL_TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#229ED9] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                    aria-label="Написать в Telegram"
                    onClick={() => ANALYTICS_ENABLED && typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_tg')}
                >
                    <TelegramIcon />
                </a>
                )}

                {/* WhatsApp */}
                {SOCIAL_WHATSAPP_URL && (
                <a
                    href={SOCIAL_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                    aria-label="Написать в WhatsApp"
                    onClick={() => ANALYTICS_ENABLED && typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_wa')}
                >
                    <WhatsappIcon />
                </a>
                )}

                {/* Phone */}
                <a
                    href={`tel:${CONTACT_PHONE_E164}`}
                    className="w-12 h-12 bg-white text-brand-900 border border-gray-100 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                    aria-label="Позвонить по телефону"
                    onClick={() => ANALYTICS_ENABLED && typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_phone')}
                >
                    <Phone size={20} />
                </a>
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 bg-brand-red text-white p-0 rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-red-dark transition-all active:scale-90 ring-4 ring-white/20`}
                aria-label="Связаться с нами"
            >
                <div className="relative w-6 h-6">
                    <MessageCircle
                        size={24}
                        className={`absolute inset-0 transition-all duration-300 transform ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
                    />
                    <X
                        size={24}
                        className={`absolute inset-0 transition-all duration-300 transform ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
                    />
                </div>
            </button>
        </div>
    );
};
