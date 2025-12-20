
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

export const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Экспертное Бюро"
        description="Независимая строительная и финансовая экспертиза в Москве. Рецензии для суда, оценка бизнеса, оспаривание кадастровой стоимости. Работаем по ФЗ-73."
        keywords="экспертиза для суда, строительная экспертиза, финансовая экспертиза, оценка бизнеса, рецензия на экспертизу"
      />
      <section className="relative min-h-screen flex flex-col bg-brand-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={homeHeroImg}
            alt="Бизнес центр Москва Сити"
            className="w-full h-full object-cover opacity-20 scale-105 animate-[pulse_15s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-950/90 to-brand-950"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 z-10 relative flex flex-col flex-grow pt-28 md:pt-40 lg:pt-48 pb-10">
          <div className="flex flex-col items-center justify-center text-center my-auto">

            <div className="mb-4 md:mb-8 inline-flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 md:px-5 md:py-2 rounded-full animate-fade-in-up">
              <ShieldCheck className="text-brand-gold w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="text-brand-gold text-[9px] md:text-xs font-bold uppercase tracking-[0.15em]">Независимое Экспертное Бюро</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl 4xl:text-9xl font-serif font-bold text-white leading-[1.15] mb-6 md:mb-8 tracking-tight drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Доказательная база <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">вашей правоты</span>
            </h1>

            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl 3xl:text-3xl text-slate-300 mb-8 md:mb-12 max-w-xs xs:max-w-md sm:max-w-2xl lg:max-w-4xl leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Мы переводим сложные финансовые и строительные вопросы на язык фактов, которые безоговорочно принимает суд.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up w-full sm:w-auto px-4 xs:px-0" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" to="/contacts" className="shadow-2xl shadow-brand-red/20 px-8 py-4 md:px-12 md:py-5 text-base md:text-lg w-full sm:w-auto">
                Обсудить задачу
              </Button>
              <Button size="lg" variant="outline" to="/about" className="text-white border-slate-600 hover:bg-white hover:text-brand-900 px-8 py-4 md:px-12 md:py-5 text-base md:text-lg w-full sm:w-auto">
                О Бюро
              </Button>
            </div>

            <div className="mt-12 lg:mt-24 w-full max-w-[1400px] 3xl:max-w-[1600px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl grid grid-cols-2 lg:grid-cols-4 divide-white/10 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <StatItem number={15} suffix="+" label="Лет практики" />
              <StatItem number={500} suffix="+" label="Экспертиз" />
              <StatItem number={100} suffix="%" label="Принято судами" />
              <StatItem number={85} suffix="+" label="Регионов РФ" />
            </div>
          </div>
          <ScrollDownIndicator className="mt-10 lg:mt-12 shrink-0" />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-transparent opacity-90 group-hover:opacity-85 transition-opacity"></div>
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
