import React, { useState, useEffect } from 'react';
import { Button } from './Components';
import { YANDEX_METRICA_ID } from '../config/analytics';
import { Check, User, Scale, Clock, Briefcase, FileSignature, ArrowRight, X, MessageSquare, Sparkles } from 'lucide-react';
import { getShadowProfileData } from '../hooks/useShadowProfile';

type QuizState = {
    role?: string;
    stage?: string;
    task?: string;
    urgency?: string;
    name?: string;
    phone?: string;
};

export const UniversalQuiz: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<QuizState>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleOptionSelect = (key: keyof QuizState, value: string) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => Math.max(1, prev - 1));

    const isStep1Complete = answers.role && answers.stage;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        const message = `
🎯 <b>Результаты Квиза:</b>
--------------------------
1. 🎭 Роль: ${answers.role || '-'}
2. ⚖️ Стадия: ${answers.stage || '-'}
3. 💼 Задача: ${answers.task || '-'}
4. ⏰ Срочность: ${answers.urgency || '-'}
--------------------------
    `.trim();

        try {
            const shadowProfile = getShadowProfileData();

            const response = await fetch('/send-form.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: answers.name,
                    phone: answers.phone,
                    message: message,
                    service: 'Квиз: Подбор экспертизы',
                    shadowProfile
                })
            });

            let data: any = null;
            try {
                data = await response.json();
            } catch (jsonError) {
                throw new Error("Неверный ответ от сервера (возможно, вы на локалхосте без PHP)");
            }

            if (response.ok && data?.status === 'success') {
                    setStep(3);
                // @ts-ignore
                if (typeof window.ym !== 'undefined') window.ym(YANDEX_METRICA_ID, 'reachGoal', 'quiz_submit');
            } else {
                throw new Error("Заявка не отправлена");
            }
        } catch (error) {
            console.error("Error sending quiz:", error);
            alert("Тестовый сервер (npm run dev) не поддерживает формы.\nПожалуйста, тестируйте отправку заявок на БОЕВОМ домене сайта.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => setIsOpen(false);

    if (!isOpen) {
        return (
            <div className="fixed bottom-24 left-6 md:bottom-24 md:right-6 md:left-auto z-40 animate-fade-in-up">
                <button
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-2 bg-white text-brand-900 px-3 py-2 md:px-4 md:py-2.5 rounded-full shadow-lg border border-gray-200 hover:border-brand-red hover:text-brand-red hover:shadow-xl transition-all duration-300"
                >
                    <Sparkles size={14} className="text-brand-gold" />
                    <span className="text-[11px] md:text-xs font-bold whitespace-nowrap">Нужна экспертиза?</span>
                </button>
            </div>
        );
    }

    // 2. FULL SCREEN MODAL
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-brand-950/80 backdrop-blur-md transition-opacity" onClick={closeModal}></div>

            {/* Modal Card */}
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest text-xs">
                        <Sparkles size={14} className="text-brand-red" /> Подбор экспертизы
                    </div>
                    <button onClick={closeModal} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-slate-400 hover:bg-gray-200 hover:text-brand-red transition-colors">
                        <X size={18} />
                    </button>
                </div>

                    {/* Progress Bar */}
                <div className="w-full h-1 bg-gray-100">
                    <div
                        className="h-full bg-brand-red transition-all duration-500 ease-out"
                        style={{ width: step === 1 ? '50%' : '100%' }}
                    ></div>
                </div>

                {/* Content - Scrollable */}
                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
                    {step === 1 && (
                        <div className="animate-fade-in space-y-6">
                            <h3 className="text-2xl font-serif font-bold text-brand-900">Давайте разберемся в ситуации</h3>

                            {/* Q1: Role */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">Ваша роль?</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {['Собственник', 'Директор', 'Инвестор', 'Юрист'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleOptionSelect('role', opt)}
                                            className={`p-4 rounded-xl text-left border transition-all relative ${answers.role === opt
                                                ? 'bg-brand-900 text-white border-brand-900 shadow-md transform scale-[1.02]'
                                                : 'bg-white text-slate-600 border-gray-200 hover:border-brand-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            <span className="text-sm font-medium block">{opt}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Q2: Stage */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">Какая задача?</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {['Оценка бизнеса', 'Строительство', 'Финансы', 'Другое'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleOptionSelect('stage', opt)}
                                            className={`p-4 rounded-xl text-left border transition-all relative ${answers.stage === opt
                                                ? 'bg-brand-900 text-white border-brand-900 shadow-md transform scale-[1.02]'
                                                : 'bg-white text-slate-600 border-gray-200 hover:border-brand-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            <span className="text-sm font-medium block">{opt}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button onClick={nextStep} disabled={!isStep1Complete} className="w-full py-4 mt-4 shadow-xl shadow-brand-red/20">
                                Далее <ArrowRight className="ml-2" size={18} />
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in text-center max-w-lg mx-auto py-2">
                            <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-900 mx-auto mb-4">
                                <MessageSquare size={28} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-brand-900 mb-2">Отлично!</h3>
                            <p className="text-slate-600 mb-6">
                                Оставьте контакты — мы пришлем предварительный расчёт.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4 text-left">
                                <input
                                    type="text"
                                    required
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-gold outline-none transition-all"
                                    placeholder="Ваше имя"
                                    onChange={(e) => handleOptionSelect('name', e.target.value)}
                                />
                                <input
                                    type="tel"
                                    required
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-gold outline-none transition-all"
                                    placeholder="Телефон (+7...)"
                                    onChange={(e) => handleOptionSelect('phone', e.target.value)}
                                />

                                <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-4 shadow-2xl shadow-brand-red/30 mt-2">
                                    {isSubmitting ? 'Отправка...' : 'Получить расчёт'}
                                </Button>
                                <p className="text-xs text-slate-400 text-center">Консультация эксперта — бесплатно</p>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in text-center py-10">
                            <div className="w-20 h-20 bg-brand-900 rounded-full flex items-center justify-center text-brand-gold mx-auto mb-6 shadow-xl">
                                <Check size={40} strokeWidth={3} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-brand-900 mb-4">Спасибо!</h3>
                            <p className="text-slate-600 mb-8">
                                Мы уже получили ваш запрос. Эксперт свяжется с вами в ближайшее время.
                            </p>
                            <Button onClick={closeModal} variant="outline" className="px-10">Закрыть</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
