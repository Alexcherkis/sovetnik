import React, { useState, Fragment } from 'react';

import { X, CheckCircle2, User, Phone, Mail } from 'lucide-react';
import { Button } from './Components';
import { Link } from 'react-router-dom';
import { YANDEX_METRICA_ID } from '../config/analytics';
import { getShadowProfileData } from '../hooks/useShadowProfile';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceTitle?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, serviceTitle }) => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const [errors, setErrors] = useState({ phone: false, captcha: false });
    
    // CAPTCHA Logic
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, userValue: '' });
    const generateCaptcha = () => {
        setCaptcha({
            num1: Math.floor(Math.random() * 10) + 1,
            num2: Math.floor(Math.random() * 10) + 1,
            userValue: ''
        });
        setErrors(prev => ({ ...prev, captcha: false }));
    };

    // Handle ESC key to close
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Prevent scrolling when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            generateCaptcha();
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);


    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const cleanValue = value.replace(/\D/g, '');

        if (!cleanValue) {
            setFormData(prev => ({ ...prev, phone: '' }));
            return;
        }

        let inputNumbers = cleanValue;
        if (cleanValue[0] === '7' || cleanValue[0] === '8') {
            inputNumbers = cleanValue.substring(1);
        }

        let formattedValue = '+7';
        if (inputNumbers.length > 0) formattedValue += ' (' + inputNumbers.substring(0, 3);
        if (inputNumbers.length >= 4) formattedValue += ') ' + inputNumbers.substring(3, 6);
        if (inputNumbers.length >= 7) formattedValue += '-' + inputNumbers.substring(6, 8);
        if (inputNumbers.length >= 9) formattedValue += '-' + inputNumbers.substring(8, 10);

        setFormData(prev => ({ ...prev, phone: formattedValue }));

        if (inputNumbers.length >= 10) setErrors(prev => ({ ...prev, phone: false }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.phone.length < 18) {
            setErrors(prev => ({ ...prev, phone: true }));
            return;
        }

        // Validate Captcha
        if (parseInt(captcha.userValue) !== (captcha.num1 + captcha.num2)) {
            setErrors(prev => ({ ...prev, captcha: true }));
            return;
        }

        setFormState('submitting');

        // Simulate API call
        try {
            const shadowProfile = getShadowProfileData();
            const response = await fetch('/send-form.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    service: serviceTitle || 'General Inquiry',
                    shadowProfile
                })
            });

            // На локалхосте (Vite) PHP не работает, поэтому Vite просто возвращает текст файла. 
            // Пытаемся спарсить JSON
            let data: any = null;
            try {
                data = await response.json();
            } catch (jsonError) {
                // Если не парсится JSON (например, локалхост отдал код PHP), кидаем ошибку
                throw new Error("Неверный ответ от сервера (возможно, вы на локалхосте без PHP)");
            }

            if (response.ok && data?.status === 'success') {
                setFormState('success');
                setTimeout(() => {
                    setFormState('idle');
                    onClose();
                    setFormData({ name: '', phone: '', message: '' });
                }, 3000);
                // Track Goal in Yandex Metrika
                // @ts-ignore
                if (typeof window.ym !== 'undefined') {
                    // @ts-ignore
                    window.ym(YANDEX_METRICA_ID, 'reachGoal', 'lead_form');
                }
            } else {
                throw new Error("Ошибка API");
            }
        } catch (e) {
            console.error(e);
            alert('Локальный сервер (npm run dev) не поддерживает отправку PHP-форм. Пожалуйста, тестируйте отправку на боевом домене.');
            setFormState('idle');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 via-brand-red to-brand-gold"></div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-brand-red hover:bg-red-50 rounded-full transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 md:p-10">
                    {formState === 'success' ? (
                        <div className="flex flex-col items-center justify-center text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-brand-900 mb-2">Заявка принята!</h3>
                            <p className="text-slate-600">
                                Мы свяжемся с вами в течение 15 минут.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-900 mb-2">
                                {serviceTitle ? 'Заказать услугу' : 'Бесплатная консультация'}
                            </h3>
                            <p className="text-slate-500 mb-8">
                                {serviceTitle ? `Оставьте заявку на "${serviceTitle}", и мы перезвоним.` : 'Оставьте заявку, и мы перезвоним в течение 15 минут.'}
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-red transition-colors">
                                        <User size={20} />
                                    </div>
                                    <input
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Ваше имя"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 font-medium text-brand-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-4 focus:ring-brand-red/5 transition-all duration-300"
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-red transition-colors">
                                        <Phone size={20} />
                                    </div>
                                    <input
                                        required
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        type="tel"
                                        placeholder="+7 (___) ___-__-__"
                                        className={`w-full bg-gray-50 border rounded-xl pl-12 pr-4 py-3.5 font-medium text-brand-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 transition-all duration-300 ${errors.phone
                                            ? 'border-red-500 focus:border-red-500 bg-red-50 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-brand-red focus:ring-brand-red/5'
                                            }`}
                                        maxLength={18}
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none text-slate-400 group-focus-within:text-brand-red transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Комментарий (необязательно)"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 font-medium text-brand-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-4 focus:ring-brand-red/5 transition-all duration-300 resize-none"
                                    ></textarea>
                                </div>

                                <div className="flex items-start gap-3 pt-2">
                                    <div className="relative flex items-center h-5">
                                        <input
                                            id="agreement"
                                            name="agreement"
                                            type="checkbox"
                                            required
                                            className="w-4 h-4 text-brand-red bg-gray-50 border-gray-300 rounded focus:ring-brand-red focus:ring-2 cursor-pointer"
                                        />
                                    </div>
                                    <label htmlFor="agreement" className="text-[11px] text-slate-500 leading-tight select-none cursor-pointer">
                                        Я даю согласие на обработку моих <Link to="/privacy" className="text-brand-900 underline hover:text-brand-red">персональных данных</Link> и принимаю условия политики конфиденциальности.
                                    </label>
                                </div>

                                {/* Math Captcha */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Защита от спама</span>
                                        <div className="flex items-center gap-2 text-brand-900 font-serif font-bold text-lg">
                                            <span>{captcha.num1}</span>
                                            <span>+</span>
                                            <span>{captcha.num2}</span>
                                            <span>=</span>
                                        </div>
                                    </div>
                                    <input
                                        required
                                        type="number"
                                        placeholder="?"
                                        value={captcha.userValue}
                                        onChange={(e) => setCaptcha(prev => ({ ...prev, userValue: e.target.value }))}
                                        className={`w-20 text-center bg-white border rounded-lg py-2 font-bold text-brand-900 focus:outline-none focus:ring-2 ${
                                            errors.captcha 
                                            ? 'border-red-500 focus:ring-red-100' 
                                            : 'border-gray-200 focus:ring-brand-red/10 focus:border-brand-red'
                                        }`}
                                    />
                                </div>

                                <Button type="submit" disabled={formState === 'submitting'} className="w-full py-4 text-base shadow-xl shadow-brand-red/20 mt-2">
                                    {formState === 'submitting' ? 'Отправка...' : 'Отправить заявку'}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
