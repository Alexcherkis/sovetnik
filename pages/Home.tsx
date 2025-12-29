
import React from 'react';
import { Button, SectionHeader, CountUp, ScrollDownIndicator } from '../components/Components';
import { REVIEWS, SERVICE_CATEGORIES } from '../constants';
import { ShieldCheck, Phone, FileSignature, Search, Gavel, FileCheck, ArrowRight, Star, TrendingUp, HardHat, PieChart, Map, FileSearch, Scale, ChevronRight } from 'lucide-react';
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
      <section className="relative min-h-screen flex flex-col justify-center bg-brand-950 overflow-hidden pt-20">

        {/* --- GLOBAL BACKGROUND (Unified, no split lines) --- */}
        <div className="absolute inset-0 z-0">
          {/* Main Background Image - High Quality Architecture */}
          <img
            src={supremeCourtImg}
            alt="Фон Верховный Суд"
            className="w-full h-full object-cover object-center scale-105"
            style={{
              filter: 'brightness(0.3) contrast(1.1) saturate(0.8)',
            }}
          />
          {/* Expensive Dark Overlay: Gradient from solid dark to slightly transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/95 to-brand-950/40"></div>
          {/* Vertical vignette to focus attention */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-transparent to-brand-950"></div>
        </div>

        {/* --- DECORATIVE ELEMENTS (Subtle, High-End) --- */}
        <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full hidden lg:block pointer-events-none overflow-hidden z-0">
          {/* Themis - Blended into the background like a watermark/fresco */}
          <div className="absolute top-1/2 right-[0%] -translate-y-1/2 w-full h-full opacity-20 mix-blend-overlay">
            <img
              src={themisImg}
              className="w-full h-full object-contain object-right drop-shadow-2xl"
              alt=""
              style={{
                maskImage: 'radial-gradient(circle at 70% 50%, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle at 70% 50%, black 40%, transparent 80%)'
              }}
            />
          </div>
          {/* Gold Light Leak */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-gold/10 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 z-10 relative pb-24 md:pb-0">
          <div className="max-w-4xl">

            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 mb-8 mt-6 animate-fade-in">
              <div className="h-px w-8 bg-brand-gold"></div>
              <span className="text-brand-gold text-xs md:text-sm font-bold uppercase tracking-[0.2em] font-sans">
                Работаем по ФЗ-73
              </span>
            </div>

            {/* Main Headline - Clean, Serif, Massive */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-[1.1] animate-fade-in-up drop-shadow-xl tracking-tight">
              Независимая <br />
              <span className="text-brand-gold relative inline-block">
                Экспертиза
                {/* Minimalist accent line */}
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-brand-red rounded-full"></span>
              </span>
            </h1>

            {/* Subtext - Readable and Crisp */}
            <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed animate-fade-in-up delay-100 font-light border-l border-white/10 pl-6">
              Строительная и финансовая экспертиза для суда. <br className="hidden md:block" />
              <span className="text-white font-medium">Рецензирование заключений с гарантией принятия судом.</span>
            </p>

            {/* Buttons - Solid and Premium */}
            <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up delay-200">
              <Button to="/contacts" variant="primary" size="lg" className="bg-brand-red hover:bg-red-800 text-white shadow-lg shadow-brand-red/20 border-transparent text-base md:text-lg px-8 py-4 sm:px-10 sm:py-5 min-w-[200px]">
                Бесплатная консультация
              </Button>
              <Button to="/price" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-brand-950 text-base md:text-lg px-8 py-4 sm:px-10 sm:py-5 min-w-[200px]">
                Прайс
              </Button>
            </div>

            {/* Trust Indicators - Minimalist Grid */}
            <div className="mt-12 md:mt-16 grid grid-cols-2 gap-8 md:gap-16 border-t border-white/5 pt-6 w-fit animate-fade-in-up delay-300">
              <div>
                <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">15<span className="text-brand-gold">+</span></div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">Лет безупречной<br />практики</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">5k<span className="text-brand-gold">+</span></div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">Успешно завершенных<br />дел в судах</div>
              </div>
            </div>

          </div>

          <ScrollDownIndicator className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-900 mb-6">
              Направления <span className="text-brand-gold italic">экспертизы</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Мы специализируемся на сложных случаях, требующих глубоких знаний в строительстве, финансах и праве.
            </p>
          </div>

          {/* Mobile: Horizontal Carousel | Desktop: Grid */}
          <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
            {[
              {
                title: "Финансовая экспертиза",
                desc: "Выявление скрытых активов, преднамеренного банкротства и бухгалтерских ошибок.",
                icon: TrendingUp,
                link: "/services/category/financial"
              },
              {
                title: "Строительная экспертиза",
                desc: "Технический надзор, споры по качеству работ и приемка недвижимости.",
                icon: HardHat,
                link: "/services/category/construction"
              },
              {
                title: "Оценочная экспертиза",
                desc: "Независимая оценка бизнеса, недвижимости и интеллектуальной собственности.",
                icon: PieChart,
                link: "/services/category/valuation"
              },
              {
                title: "Земельная экспертиза",
                desc: "Споры по границам участков, раздел земли и исправление реестровых ошибок.",
                icon: Map,
                link: "/services/category/construction"
              },
              {
                title: "Почерковедческая экспертиза",
                desc: "Установление подлинности подписей и почерка в договорах и расписках.",
                icon: FileSearch,
                link: "/services"
              },
              {
                title: "Юридическое сопровождение",
                desc: "Представительство в суде, защита интересов бизнеса и помощь в спорах.",
                icon: Scale,
                link: "/services"
              },
            ].map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold/0 group-hover:bg-brand-gold transition-colors duration-300"></div>

                <div className="w-14 h-14 rounded-full bg-brand-50 text-brand-900 flex items-center justify-center mb-6 border border-brand-100 group-hover:bg-brand-900 group-hover:text-brand-gold transition-colors duration-300 shrink-0">
                  <service.icon size={28} />
                </div>

                <h3 className="text-2xl font-serif font-bold text-brand-900 mb-3 group-hover:text-brand-gold transition-colors line-clamp-2 min-h-[3.5rem] flex items-center">
                  {service.title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6 flex-grow line-clamp-3">
                  {service.desc}
                </p>

                <div className="flex items-center text-brand-900 font-bold uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform mt-auto">
                  Подробнее <ChevronRight size={16} className="ml-2 text-brand-gold" />
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

          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionHeader title="Нам доверяют" subtitle="Реальные отзывы наших клиентов и партнеров" />

            {/* Rating Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 animate-fade-in delay-100">
              <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-lg rounded-full px-6 py-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="w-6 h-6" />
                <div className="flex flex-col items-start leading-none">
                  <div className="flex gap-1 text-brand-gold text-[10px]">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" stroke="none" />)}
                  </div>
                  <span className="font-bold text-slate-700 text-sm mt-1">5.0 рейтинг</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-lg rounded-full px-6 py-3">
                <div className="w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center font-bold text-xs">Я</div>
                <div className="flex flex-col items-start leading-none">
                  <div className="flex gap-1 text-brand-gold text-[10px]">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" stroke="none" />)}
                  </div>
                  <span className="font-bold text-slate-700 text-sm mt-1">5.0 рейтинг</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            {REVIEWS.map((review) => (
              <div key={review.id} className="min-w-[85vw] sm:min-w-[400px] lg:min-w-[33%] xl:min-w-[25%] snap-center flex h-auto">
                <div className="bg-slate-50 p-8 rounded-3xl relative w-full flex flex-col hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-brand-gold/20 group">
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={16} className={`${idx < review.rating ? 'text-brand-gold fill-brand-gold' : 'text-gray-200'}`} />
                    ))}
                  </div>

                  <p className="text-slate-700 italic leading-relaxed mb-6 font-medium text-lg flex-grow">
                    "{review.text}"
                  </p>

                  <div className="mt-auto flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-900 text-white flex items-center justify-center font-bold font-serif text-lg">
                      {review.author[0]}
                    </div>
                    <div>
                      <div className="font-bold text-brand-900 leading-tight">{review.author}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">{review.role}</div>
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
