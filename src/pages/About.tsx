import React from 'react';
import { SectionHeader, Button } from '../components/Components';
import { SEO } from '../components/SEO';
import { Scale, Briefcase, FileCheck, Award, MapPin, Clock, Phone, Mail, CheckCircle2, Shield, Users, ShieldCheck, HardHat, PieChart } from 'lucide-react';
import aboutHeroImg from '../assets/images/hero_court.webp'; // Using proven hero image
import { Link } from 'react-router-dom';
import aboutData from '../content/pages/about.json';

export const About: React.FC = () => {
    return (
        <div className="bg-white font-sans">
            <SEO
                title="О Бюро — Экспертное Бюро Советникъ"
                description="15 лет на рынке экспертных услуг. Команда аттестованных судебных экспертов и юристов. Проводим строительные, финансовые, почерковедческие экспертизы и оценку активов по ФЗ-73."
                breadcrumbs={[{ name: 'О Бюро', item: '/about' }]}
            />

            {/* 1. HERO SECTION */}
            <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-950 text-white">
                {/* Background & Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={aboutHeroImg}
                        alt="Офис экспертного бюро Советникъ в Уфе, ул. 50 лет СССР, 34"
                        className="w-full h-full object-cover opacity-40 scale-105"
                    />
                    {/* Complex Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/90 to-brand-950/80"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent opacity-90"></div>

                    {/* Texture */}
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('/cubes.png')] mix-blend-overlay"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-5xl">
                    <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-8 shadow-2xl">
                        <Shield size={14} /> <span>{aboutData.hero_badge || "Экспертное бюро"}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-tight drop-shadow-xl">
                        {aboutData.hero_title_line1 || "Мы создаем доказательства,"}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-100 to-brand-gold relative inline-block">
                            {aboutData.hero_title_line2 || "которые побеждают в суде"}
                            {/* Text Glow */}
                            <div className="absolute -inset-4 bg-brand-gold/20 blur-2xl -z-10 rounded-full opacity-50"></div>
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed border-l-2 border-brand-gold pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                        {aboutData.hero_subtitle || "15 лет на страже интересов бизнеса и частных лиц. Независимость. Компетентность. Результат."}
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-brand-gold to-transparent mx-auto"></div>
                </div>
            </section>

            {/* 2. HISTORY & MISSION - Redesigned */}
            <section className="py-24 md:py-32 bg-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-1/4 z-0"></div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="order-2 lg:order-1 relative group">
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 border-2 border-brand-gold/20 rounded-3xl -z-10 translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500"></div>

                            <div className="bg-white p-10 md:p-14 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
                                {/* Abstract BG */}
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl"></div>

                                <h3 className="text-3xl font-serif font-bold text-brand-900 mb-8 flex items-center gap-4">
                                    <div className="w-12 h-1 bg-brand-gold"></div>
                                    Наша миссия
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-6 text-lg md:text-xl font-light">
                                    Мы основали «Советникъ» как ответ на запрос рынка в <span className="font-semibold text-brand-900">качественной, объективной экспертизе</span>, которая говорит на языке фактов, а не предположений.
                                </p>
                                <p className="text-slate-600 leading-relaxed mb-10 text-base md:text-lg">
                                    Начинали как узкопрофильная группа для аудита строительных проектов. Сегодня мы — мультидисциплинарное бюро, объединяющее финансистов, инженеров, оценщиков и юристов.
                                </p>

                                <div className="flex items-center gap-6 pt-8 border-t border-gray-100">
                                    <div className="flex -space-x-4">
                                        {[HardHat, PieChart, Scale].map((Icon, i) => (
                                            <div key={i} className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-slate-500">
                                                <Icon size={20} strokeWidth={1.5} />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <div className="font-bold text-brand-900 text-2xl font-serif">15 Лет</div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider">Работы с 2010 года</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-8 leading-tight">
                                От частной практики <br />
                                <span className="text-brand-red italic">до федерального бюро</span>
                            </h2>

                            <div className="space-y-8 text-lg text-slate-600 font-light leading-relaxed">
                                <p className="border-l-4 border-slate-200 pl-6 my-8 italic text-slate-500">
                                    "В мире судебных споров один документ может стоить миллионы рублей. Мы понимаем эту ответственность."
                                </p>
                                <p>
                                    Каждая цифра в нашем отчете проверена, каждый вывод обоснован нормативной базой. Наши эксперты — это практики с реальным опытом работы в строительстве, банковском секторе и госорганах. Мы знаем, как устроена система изнутри, и используем эти знания для защиты ваших прав.
                                </p>
                            </div>

                            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-900">
                                        <Award />
                                    </div>
                                    <div>
                                        <div className="font-bold text-brand-900">Аккредитации</div>
                                        <div className="text-sm text-slate-500">Ведущие банки и СРО</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-900">
                                        <ShieldCheck />
                                    </div>
                                    <div>
                                        <div className="font-bold text-brand-900">Страхование</div>
                                        <div className="text-sm text-slate-500">Ответственность застрахована</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. EXPERTISE SECTION - Premium Cards */}
            <section className="py-12 md:py-24 bg-brand-950 border-y border-brand-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/cubes.png')] opacity-5"></div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-10 md:mb-20">
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-8"></div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Команда профессионалов</h2>
                        <p className="text-slate-400 text-lg font-light">В нашем штате работают эксперты с многолетним опытом, учеными степенями и всеми необходимыми допусками</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                        {[
                            {
                                icon: Award,
                                title: "Высокая квалификация",
                                desc: "Наши сотрудники имеют профильное высшее образование, регулярно проходят курсы повышения квалификации и аттестацию в СРО."
                            },
                            {
                                icon: Briefcase,
                                title: "Опыт в сложных делах",
                                desc: "Средний стаж работы наших экспертов — более 12 лет. Мы успешно сопровождали дела в арбитражных судах всех инстанций."
                            },
                            {
                                icon: FileCheck,
                                title: "Научный подход",
                                desc: "Мы используем современные методики и оборудование, что позволяет давать точные и обоснованные заключения, которые сложно оспорить."
                            }
                        ].map((item, i) => (
                            <div key={i} className="group bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-brand-gold/50 transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 flex flex-col sm:flex-row md:flex-col items-start gap-4 md:gap-0">
                                <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold md:mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-brand-gold group-hover:text-brand-900">
                                    <item.icon size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-serif font-bold text-white mb-2 md:mb-4 group-hover:text-brand-gold transition-colors">{item.title}</h4>
                                    <p className="text-slate-400 leading-relaxed text-sm md:text-base group-hover:text-slate-300 transition-colors">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </section>





            {/* 4. CERTIFICATES SECTION */}
            {aboutData.certificates && aboutData.certificates.length > 0 && (
                <section className="py-16 md:py-24 bg-slate-50">
                    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-900 mb-6">Документы и лицензии</h2>
                            <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto">Аттестаты экспертов, членство в СРО и профильные дипломы</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            {aboutData.certificates.map((cert: any, i: number) => (
                                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group relative overflow-hidden">
                                    <div className="aspect-[3/4] bg-slate-100 rounded-lg mb-4 overflow-hidden">
                                        <img src={`/assets/images/${cert.image}`} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <p className="text-sm font-semibold text-brand-900 text-center">{cert.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 5. CASES SECTION */}
            {aboutData.cases && aboutData.cases.length > 0 && (
                <section className="py-16 md:py-24 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-900 mb-6">Судебная практика</h2>
                            <p className="text-slate-600 text-lg font-light max-w-2xl mx-auto">Реальные дела, где наши экспертизы сыграли решающую роль</p>
                        </div>
                        <div className="space-y-6 md:space-y-8">
                            {aboutData.cases.map((c: any, i: number) => (
                                <div key={i} className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full -z-10"></div>
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900 mb-6">{c.title}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                        <div className="bg-slate-50 p-6 rounded-2xl">
                                            <div className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-brand-red rounded-full"></div>Задача
                                            </div>
                                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">{c.task}</p>
                                        </div>
                                        <div className="bg-brand-50 p-6 rounded-2xl">
                                            <div className="font-bold text-brand-900 mb-2 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>Результат
                                            </div>
                                            <p className="text-slate-700 text-sm md:text-base leading-relaxed">{c.result}</p>
                                        </div>
                                    </div>
                                    {c.profit && (
                                        <div className="inline-flex items-center gap-3 bg-green-50 text-green-800 px-6 py-3 rounded-full font-bold">
                                            <CheckCircle2 size={20} className="text-green-600" /> Выгода клиента: {c.profit}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};
