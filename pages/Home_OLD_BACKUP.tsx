
import React from 'react';
import { Button, SectionHeader, CountUp, ScrollDownIndicator } from '../components/Components';
import { REVIEWS, SERVICE_CATEGORIES } from '../constants';
import { ShieldCheck, Phone, FileSignature, Search, Gavel, FileCheck, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatItem: React.FC<{ number: number, label: string, suffix?: string, prefix?: string }> = ({ number, label, suffix, prefix }) => (
  <div className="text-center p-4 xs:p-6 border-b sm:border-b-0 sm:border-r border-white/10 last:border-0 flex flex-col items-center justify-center relative group">
    <div className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-gold mb-1 md:mb-2 tabular-nums">
      <CountUp end={number} suffix={suffix} prefix={prefix} />
    </div>
    <div className="text-[10px] md:text-xs lg:text-sm text-slate-400 font-bold uppercase tracking-wider group-hover:text-white transition-colors">{label}</div>
  </div>
);

const ProcessStep: React.FC<{
  number: string,
  title: string,
  desc: string,
  icon: any,
  isLast?: boolean
}> = ({ number, title, desc, icon: Icon, isLast }) => (
  <div className="relative flex-1 group">
    {!isLast && (
      <div className="hidden lg:block absolute top-[2.5rem] left-1/2 w-full h-[2px] bg-gray-200 -z-10">
        <div className="w-0 h-full bg-brand-red group-hover:w-full transition-all duration-1000 ease-out"></div>
      </div>
    )}
    {!isLast && (
      <div className="lg:hidden absolute left-8 top-16 bottom-0 w-[2px] bg-gray-200 -z-10"></div>
    )}

    <div className="flex flex-row lg:flex-col items-start lg:items-center gap-5 lg:gap-0 pb-12 lg:pb-0">
      <div className="relative shrink-0">
        <div className="w-14 h-14 xs:w-16 xs:h-16 rounded-full bg-white border-4 border-gray-50 shadow-lg flex items-center justify-center text-brand-red group-hover:border-brand-red group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 z-20 relative">
          <Icon size={24} className="xs:w-7 xs:h-7" strokeWidth={1.5} />
        </div>
      </div>
      <div className="pt-1 lg:pt-8 text-left lg:text-center">
        <div className="text-[10px] font-bold uppercase tracking-widest text-brand-red mb-1 md:mb-2 opacity-60">
          Этап 0{number}
        </div>
        <h3 className="font-serif font-bold text-lg md:text-xl lg:text-2xl text-brand-900 mb-2 md:mb-3 group-hover:text-brand-red transition-colors">
          {title}
        </h3>
        <p className="text-xs md:text-sm lg:text-base text-slate-500 leading-relaxed max-w-sm lg:max-w-[280px] mx-auto">
          {desc}
        </p>
      </div>
    </div>
  </div>
);

import { SEO } from '../components/SEO';

import homeHeroImg from '../assets/images/home-hero.png';
import supremeCourtImg from '../assets/images/supreme_court.jpg';
import themisImg from '../assets/images/themis.png';

export const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Экспертное Бюро"
        description="Независимая строительная и финансовая экспертиза в Москве. Рецензии для суда, оценка бизнеса, оспаривание кадастровой стоимости. Работаем по ФЗ-73."
        keywords="экспертиза для суда, строительная экспертиза, финансовая экспертиза, оценка бизнеса, рецензия на экспертизу"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Советникъ - Экспертное Бюро",
          "url": "https://buro-sovetnik.com",
          "logo": "https://buro-sovetnik.com/favicon.svg",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+7-999-123-45-67",
            "contactType": "customer service",
            "areaServed": "RU",
            "availableLanguage": "Russian"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "ЖК «Статус», 20 этаж, офис 157",
            "addressLocality": "Москва",
            "addressCountry": "RU"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "15"
          },
          "review": [
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Иван Петров" },
              "reviewRating": { "@type": "Rating", "ratingValue": "5" },
              "reviewBody": "Спасибо за профессиональную экспертизу! Суд принял заключение без вопросов."
            }
          ]
        }}
      />
      <section className="relative min-h-screen flex flex-col bg-brand-950 overflow-hidden">
        {/* Supreme Court Background - Premium Cinematic Look */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-950"></div>
          <img
            src={supremeCourtImg}
            alt="Верховный Суд РФ"
            className="w-full h-full object-cover object-[center_top] opacity-30 mix-blend-overlay scale-105 animate-ken-burns"
            style={{
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
            }}
          />
          {/* Deep gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 z-10 flex-grow flex items-center pt-20 relative overflow-visible">
          <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-7 relative z-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-brand-gold mb-8 animate-fade-in shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(251,191,36,0.5)]"></span>
                <span className="text-xs font-bold uppercase tracking-widest">Работаем по ФЗ-73</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white mb-8 leading-tight animate-fade-in-up drop-shadow-2xl">
                Независимая <br />
                <span className="text-brand-gold relative inline-block tracking-wide">
                  Экспертиза
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-red opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-2xl text-slate-100 mb-12 max-w-xl leading-relaxed animate-fade-in-up delay-100 font-normal drop-shadow-lg border-l-2 border-brand-gold/30 pl-6 tracking-wide">
                Строительная и финансовая экспертиза для суда.
                <br className="hidden md:block" />
                <span className="text-white font-medium">
                  Рецензирование заключений с гарантией принятия судом.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up delay-200">
                <Button to="/contacts" variant="primary" size="lg" className="bg-brand-gold hover:bg-yellow-600 text-white shadow-[0_20px_50px_-12px_rgba(234,179,8,0.4)] border-transparent text-lg px-10 py-6 hover:scale-105 transition-transform duration-300">
                  Бесплатная консультация
                </Button>
                <Button to="/services" variant="outline" size="lg" className="border border-white/50 text-white hover:bg-white hover:text-brand-950 backdrop-blur-md text-lg px-8 py-6 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Все услуги
                </Button>
              </div>

              <div className="mt-20 flex items-center gap-12 text-white animate-fade-in-up delay-300 backdrop-blur-sm bg-white/5 p-6 rounded-2xl w-fit border border-white/5">
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-5xl text-brand-gold mb-1">15<span className="text-2xl text-brand-gold/70">+</span></span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Лет опыта</span>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-5xl text-brand-gold mb-1">5k<span className="text-2xl text-brand-gold/70">+</span></span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Успешных дел</span>
                </div>
              </div>
            </div>

            {/* Themis Image - Right Side - Cinematic Composition */}
            <div className="lg:col-span-5 relative h-[800px] hidden lg:block animate-fade-in delay-500 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-full pointer-events-none">
                {/* Glow effect behind Themis */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/10 blur-[100px] rounded-full mix-blend-screen"></div>
              </div>
              <img
                src={themisImg}
                alt="Фемида"
                className="absolute right-[-10%] top-1/2 -translate-y-[45%] w-[140%] max-w-none object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
                style={{
                  filter: 'contrast(1.1) brightness(0.9) saturate(0)',
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                }}
              />
            </div>
          </div>

          <ScrollDownIndicator className="absolute bottom-10 left-1/2 -translate-x-1/2" />
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            title="Выберите направление"
            subtitle="Мы разделили наши компетенции на три ключевых департамента для вашего удобства"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-8 md:mt-12">
            {Object.values(SERVICE_CATEGORIES).map((cat) => (
              <Link
                to={`/services/category/${cat.slug}`}
                key={cat.slug}
                className="group relative h-[380px] md:h-[500px] lg:h-[580px] 3xl:h-[650px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
              >
                <div className="absolute inset-0">
                  <img
                    src={cat.heroImage}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent opacity-60 group-hover:opacity-50 transition-opacity"></div>
                </div>

                <div className="absolute inset-0 p-6 xs:p-8 md:p-10 flex flex-col justify-end items-start z-10">
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 w-11 h-11 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-brand-gold border border-white/20 group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                    <cat.icon size={22} className="md:w-7 md:h-7" />
                  </div>
                  <div className="mb-auto hidden md:block transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <span className="inline-block px-3 py-1 bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider rounded-md mb-4">
                      Перейти в раздел
                    </span>
                  </div>
                  <h3 className="text-xl xs:text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl font-serif font-bold text-white mb-2 md:mb-3 leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-slate-300 text-xs md:text-sm lg:text-base mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                    {cat.subtitle}
                  </p>
                  <div className="flex items-center text-white font-bold uppercase tracking-widest text-[10px] md:text-xs group-hover:translate-x-2 transition-transform">
                    Подробнее <ArrowRight className="ml-2 w-3.5 h-3.5 md:w-4 md:h-4 text-brand-gold" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 bg-slate-50 relative border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeader title="Алгоритм работы" subtitle="Прозрачный процесс: от первого звонка до победы в суде" />

          <div className="flex flex-col lg:flex-row gap-0 lg:gap-4 mt-8 md:mt-20 justify-between items-stretch lg:items-start max-w-[1600px] 3xl:max-w-[1800px] mx-auto">
            <ProcessStep number="1" title="Заявка" desc="Краткий анализ ситуации по телефону или в офисе. Бесплатная оценка перспектив." icon={Phone} />
            <ProcessStep number="2" title="Договор" desc="Фиксация стоимости, сроков и вопросов эксперту. Работаем по официальному договору." icon={FileSignature} />
            <ProcessStep number="3" title="Анализ" desc="Выезд эксперта, осмотр объекта, изучение документов и проведение расчетов." icon={Search} />
            <ProcessStep number="4" title="Отчет" desc="Подготовка Заключения по ФЗ-73, которое имеет юридическую силу в суде." icon={FileCheck} />
            <ProcessStep number="5" title="Суд" desc="Выступление эксперта на заседании, защита выводов и ответы на вопросы судьи." icon={Gavel} isLast={true} />
          </div>
          <div className="mt-12 md:mt-16 lg:mt-20 text-center px-4">
            <Button to="/contacts" variant="secondary" className="px-10 py-4 md:py-5 md:px-14 text-base md:text-lg shadow-xl w-full sm:w-auto">
              Начать работу
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative">
          <SectionHeader title="Доверие клиентов" subtitle="Наши заключения принимают Арбитражные суды и суды общей юрисдикции" />
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 xs:gap-6 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-10 md:pb-0 md:mx-0 no-scrollbar">
            {REVIEWS.map((review) => (
              <div key={review.id} className="min-w-[88vw] xs:min-w-[320px] sm:min-w-[400px] md:min-w-0 snap-center flex h-full">
                <div className="bg-white p-6 md:p-8 lg:p-12 rounded-3xl border border-gray-100 flex flex-col w-full h-full hover:shadow-2xl transition-all duration-300 group">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} className={`${idx < review.rating ? 'text-brand-gold fill-brand-gold' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <blockquote className="flex-grow mb-8">
                    <p className="font-serif text-base xs:text-lg lg:text-xl text-slate-700 italic leading-relaxed">
                      "{review.text}"
                    </p>
                  </blockquote>
                  <div className="flex items-center pt-6 border-t border-gray-100 mt-auto">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-brand-50 text-brand-900 font-serif font-bold text-lg flex items-center justify-center mr-4 shrink-0 shadow-inner group-hover:bg-brand-900 group-hover:text-brand-gold transition-colors">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-brand-900 text-sm xs:text-base">{review.author}</div>
                      <div className="text-[10px] text-brand-red font-bold uppercase tracking-wide mt-0.5">{review.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-40 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-3xl md:rounded-[3rem] p-8 xs:p-10 md:p-20 lg:p-32 text-center shadow-2xl relative overflow-hidden isolate">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute -top-24 -right-24 w-64 md:w-96 lg:w-[600px] h-64 md:h-96 lg:h-[600px] bg-brand-red blur-[120px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 md:w-96 lg:w-[500px] h-64 md:h-96 lg:h-[500px] bg-brand-gold blur-[120px] opacity-10"></div>

            <h2 className="text-2xl xs:text-3xl md:text-6xl lg:text-7xl 3xl:text-8xl font-serif font-black text-white mb-6 md:mb-8 relative z-10 leading-tight">
              Ваш бизнес под <br className="hidden md:inline" /> надежной защитой
            </h2>
            <p className="text-sm xs:text-base md:text-xl lg:text-2xl text-slate-300 mb-8 md:mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed font-light">
              Не ждите, пока ситуация выйдет из-под контроля. Получите профессиональную оценку ваших рисков уже сегодня.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4 px-4 xs:px-0">
              <Button size="lg" to="/contacts" className="w-full sm:w-auto text-base md:text-lg px-12 py-5 justify-center shadow-xl shadow-brand-red/20">
                Связаться с бюро
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
