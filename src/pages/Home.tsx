
import React from 'react';
import { SEO } from '../components/SEO';
import { Button, SectionHeader, CountUp, ScrollDownIndicator } from '../components/Components';
import { UniversalQuiz } from '../components/UniversalQuiz';
import { REVIEWS, SERVICE_CATEGORIES } from '../data/constants';
import { Check, CheckCircle2, ChevronDown, ChevronUp, MapPin, Phone, Mail, Clock, Shield, Star, Menu, X, ArrowRight, ArrowUpRight, Scale, HardHat, FileSearch, PieChart, FileSignature, Gavel, Search, FileCheck, Award, TrendingUp, ChevronLeft, Map, ShieldCheck, ChevronRight, Zap, Monitor, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import courtHeroImg from '../assets/images/hero_court_new.webp';
import cloneHeroImg from '../assets/images/clone-stock/hero.webp';
import themisImg from '../assets/images/themis.webp';
import cloneSecondaryImg from '../assets/images/clone-stock/secondary.webp';
import cloneImgFinance from '../assets/images/clone-stock/finance.webp';
import cloneImgConstruction from '../assets/images/clone-stock/construction.webp';
import cloneImgValuation from '../assets/images/clone-stock/valuation.webp';
import cloneImgLand from '../assets/images/clone-stock/land.webp';
import cloneImgHandwriting from '../assets/images/clone-stock/handwriting.webp';
import googleGIcon from '../assets/icons/google-g.svg';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from '../config/site';

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


export const Home: React.FC = () => {
  const isClone = import.meta.env.MODE === 'clone';
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (isClone) return;
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  return (
    <>
      <SEO
        title={isClone ? "Экспертная оценка и заключения" : "Советникъ — Экспертное Бюро | Судебная экспертиза"}
        description={isClone
          ? "Экспертные заключения и оценка по всей России. Консультация, подготовка документов и сопровождение."
          : "Независимая судебная экспертиза по всей России. Строительная, финансовая, почерковедческая экспертиза. Заключения по ФЗ-73. 15 лет опыта. Рецензии и оспаривание."
        }
        keywords="судебная экспертиза, строительная экспертиза, финансовая экспертиза, экспертное бюро, экспертиза для суда, фз-73"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": isClone ? "https://sovetnik-cno.ru/" : "https://buro-sovetnik.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": (isClone ? "https://sovetnik-cno.ru/price?q={search_term_string}" : "https://buro-sovetnik.com/price?q={search_term_string}"),
            "query-input": "required name=search_term_string"
          }
        }}
      />
      {/* 1. Hero Section */}
      {isClone ? (
        <section className="relative min-h-[92svh] md:min-h-[100svh] flex items-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={cloneHeroImg}
              alt="Эксперты Советникъ проводят оценку недвижимости на объекте"
              className="w-full h-full object-cover object-center scale-105"
              fetchPriority="high"
              loading="eager"
              style={{ filter: 'brightness(0.75) contrast(1.08) saturate(0.95)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/55 to-brand-900/20" />
            <div className="absolute inset-0 bg-[#02060d]/25 mix-blend-multiply" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center md:items-start pt-28 md:pt-32 lg:pt-28 pb-16 md:pb-20">
            <div className="max-w-3xl lg:max-w-4xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white/90 text-[11px] font-bold uppercase tracking-wider mb-7">
                <ShieldCheck size={14} className="text-brand-gold" />
                <span>Советник • визитка</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
                <span className="block">Независимая</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-sky-200 to-brand-gold relative inline-block">
                  экспертиза
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-brand-gold/40 rounded-full blur-sm" />
                </span>
                <span className="block text-lg md:text-3xl lg:text-4xl mt-4 font-medium text-slate-200">
                  оценка и заключения под задачу
                </span>
              </h1>

              <p className="mt-6 text-base md:text-xl text-slate-200/90 max-w-2xl leading-relaxed">
                Подскажем, какие документы нужны, какой формат результата выбрать и какие сроки реальны.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  size="lg"
                  to={`tel:${CONTACT_PHONE_E164}`}
                  className="px-10 py-5 text-lg shadow-[0_20px_50px_-10px_rgba(56,189,248,0.25)]"
                >
                  Позвонить
                </Button>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center px-10 py-5 rounded-2xl border border-white/25 bg-white/5 backdrop-blur-md text-white font-bold text-sm md:text-base hover:bg-white/10 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              {/* Trust / facts */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                {[
                  { icon: Clock, title: 'Ответ', desc: 'Обычно в течение дня' },
                  { icon: FileCheck, title: 'Формат', desc: 'Под задачу и суд' },
                  { icon: MapPin, title: 'География', desc: 'Работаем по РФ' }
                ].map((it) => (
                  <div key={it.title} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-white/80">
                      <it.icon size={16} className="text-brand-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{it.title}</span>
                    </div>
                    <div className="mt-2 font-serif font-bold text-white">{it.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center md:justify-start gap-6 text-white/75">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  <Shield size={18} className="text-brand-gold" />
                  Без формы заявки
                </div>
                <div className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  <Phone size={18} className="text-brand-gold" />
                  {CONTACT_PHONE_DISPLAY}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
            <ScrollDownIndicator />
          </div>
        </section>
      ) : (
        <section className="relative min-h-[100svh] md:h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax */}
          <div className="absolute inset-0 z-0">
            <img
              src={courtHeroImg}
              alt="Верховный суд РФ"
              className="w-full h-full object-cover object-center scale-105"
              fetchPriority="high"
              loading="eager"
              style={{
                filter: 'brightness(0.7) contrast(1.1) saturate(0.8)',
              }}
            />
            {/* Expensive Dark Overlay: Gradient from solid dark to slightly transparent */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/60 to-brand-900/30"></div>
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[#020408]/30 mix-blend-multiply"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center md:items-start pt-32 md:pt-48 pb-24 md:pb-0">
            <div className="max-w-3xl text-center md:text-left">
              <div className="hidden md:inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-brand-gold text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in-up">
                <Scale size={14} /> <span>Федеральное экспертное бюро</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <span className="block">Независимая</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold relative inline-block">
                  экспертиза
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-brand-gold/50 rounded-full blur-sm"></div>
                </span>
                <span className="block text-2xl md:text-4xl lg:text-5xl mt-4 font-light text-slate-200">весомый аргумент в суде</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Судебная, строительная и финансовая экспертиза по всей России. Заключения по ФЗ-73. Команда аттестованных экспертов. Работаем с 2009 года.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Button
                  size="lg"
                  onClick={() => {
                    const event = new CustomEvent('openContactModal', { detail: { service: 'Консультация с главной' } });
                    window.dispatchEvent(event);
                  }}
                  className="shadow-[0_20px_50px_-10px_rgba(220,38,38,0.3)] px-10 py-5 text-lg"
                >
                  Получить консультацию
                </Button>
                <Button size="lg" to="/price" variant="outline-white" className="px-10 py-5 text-lg">
                  Стоимость услуг
                </Button>
              </div>
              {/* Trust Indicators */}
              <div className="mt-12 flex items-center justify-center md:justify-start gap-8 text-slate-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-brand-gold" />
                  <span className="text-xs uppercase tracking-widest font-bold">Работаем по ФЗ-73</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <FileCheck size={20} className="text-brand-gold" />
                  <span className="text-xs uppercase tracking-widest font-bold">Ответственность застрахована</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <ScrollDownIndicator />
          </div>
        </section>
      )}

      {/* Quick Access Bar (main only) */}
      {!isClone && (
        <section className="bg-white border-b border-gray-100 py-4 md:py-8 sticky top-16 md:top-20 z-40 relative shadow-sm overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-row items-center justify-start md:justify-center gap-4 lg:gap-12 overflow-x-auto scrollbar-hide">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0 hidden xs:block">Популярные запросы:</span>
              <div className="flex flex-nowrap items-center gap-3 pb-1 md:pb-0">
                  {[
                    { label: "Строительная", link: "/services/category/construction", icon: HardHat },
                    { label: "Финансовая", link: "/services/category/financial", icon: TrendingUp },
                    { label: "Оценка бизнеса", link: "/services/category/valuation", icon: PieChart },
                    { label: "Рецензии", link: "/services/category/reviews", icon: FileCheck },
                  ].map((item, i) => (
                  <Link 
                    key={i} 
                    to={item.link}
                    className="group flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-slate-200 bg-white hover:border-brand-red hover:bg-brand-50 transition-all shadow-sm shrink-0"
                  >
                    <item.icon size={12} className="text-slate-400 group-hover:text-brand-red transition-colors md:w-3.5 md:h-3.5" />
                    <span className="text-[10px] md:text-sm font-medium text-slate-700 group-hover:text-brand-red transition-colors whitespace-nowrap">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Clone-only: different second block (no "steps") */}
      {isClone && (
        <section className="bg-white border-b border-slate-100 py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  <FileSearch size={14} className="text-brand-red" />
                  Основные направления
                </div>
                <h2 className="mt-5 text-2xl md:text-4xl font-serif font-bold text-brand-900 leading-tight">
                  Чем поможем в вашей задаче
                </h2>
                <p className="text-slate-600 mt-3 leading-relaxed">
                  Без “лишних” форм — вы сразу связываетесь с экспертом. Подскажем, что собрать по документам и какой результат нужен.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button to={`tel:${CONTACT_PHONE_E164}`} className="justify-center">
                    Позвонить
                  </Button>
                  <Button to="/services" variant="outline" className="justify-center">
                    Все услуги
                  </Button>
                </div>

                <div className="mt-6 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                  <img
                    src={cloneSecondaryImg}
alt="Эксперт проводит финансовый аудит в офисе экспертного бюро Советникъ"
                    className="w-full h-52 md:h-60 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Финансы', desc: 'Анализ документов, расчёты, проверки.', icon: TrendingUp, link: '/services/category/financial' },
                    { title: 'Строительство', desc: 'Дефекты, объёмы, качество работ.', icon: HardHat, link: '/services/category/construction' },
                    { title: 'Оценка', desc: 'Недвижимость, бизнес, активы.', icon: PieChart, link: '/services/category/valuation' },
                    { title: 'Подписи и почерк', desc: 'Проверка подписи и рукописного текста.', icon: FileSignature, link: '/services/category/handwriting' }
                  ].map((card) => (
                    <Link
                      key={card.link}
                      to={card.link}
                      className="group rounded-3xl border border-slate-200 bg-white p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-red shrink-0">
                          <card.icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="text-lg md:text-xl font-serif font-bold text-brand-900 group-hover:text-brand-red transition-colors">
                            {card.title}
                          </div>
                          <div className="mt-1 text-sm text-slate-600 leading-relaxed">
                            {card.desc}
                          </div>
                          <div className="mt-4 inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-brand-red transition-colors">
                            Подробнее <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-5 bg-slate-50 border border-slate-200 rounded-3xl p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Если задача нестандартная</div>
                      <div className="mt-2 text-brand-900 font-serif font-bold text-lg">
                        Опишите ситуацию в 2–3 предложениях — подскажем направление.
                      </div>
                    </div>
                    <Button to={`mailto:${CONTACT_EMAIL}`} variant="outline" className="justify-center whitespace-nowrap">
                      Написать на почту
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services block: main vs clone */}
      {!isClone ? (
      <section className="py-12 md:py-16 lg:py-20 bg-slate-50 relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-100/50 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-3 mb-4 opacity-0 animate-fade-in-up">
              <div className="h-px w-6 md:w-10 bg-brand-gold"></div>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] font-sans">
                Наши услуги
              </span>
              <div className="h-px w-6 md:w-10 bg-brand-gold"></div>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-900 mb-6 leading-tight opacity-0 animate-fade-in-up delay-100">
              Направления <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-gold">экспертизы</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-200">
              Судебная экспертиза, строительный и финансовый аудит, оценка бизнеса — работаем по всей России.
            </p>
          </div>

          {/* Mobile: Horizontal Carousel | Desktop: Grid */}
          <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0 scrollbar-hide items-stretch">
              {[
                {
                  title: "Строительная экспертиза",
                  desc: "Технадзор, споры по качеству работ, судебная строительная экспертиза, приёмка недвижимости.",
                  icon: HardHat,
                  link: "/services/category/construction"
                },
                {
                  title: "Финансовая экспертиза",
                  desc: "Судебная финансово-экономическая экспертиза, банкротство, налоговые споры, анализ активов.",
                  icon: TrendingUp,
                  link: "/services/category/financial"
                },
                {
                  title: "Оценка бизнеса",
                  desc: "Оценка ООО/АО, долей участников, интеллектуальной собственности, патентов и недвижимости.",
                  icon: PieChart,
                  link: "/services/category/valuation"
                },
                {
                  title: "Земельная экспертиза",
                  desc: "Межевые споры, раздел земли, исправление реестровых ошибок, кадастр.",
                  icon: Map,
                  link: "/services/category/land"
                },
                {
                  title: "Почерковедческая экспертиза",
                  desc: "Установление подлинности подписей, давности документов, техническая экспертиза.",
                  icon: FileSearch,
                  link: "/services/category/handwriting"
                },
                {
                  title: "Рецензии и оспаривание",
                  desc: "Аудит заключений оппонента, подготовка рецензий, назначение повторной экспертизы.",
                  icon: FileCheck,
                  link: "/services/category/reviews"
                },
              ].map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group relative bg-white rounded-2xl p-8 border border-slate-300 hover:border-brand-gold shadow-lg hover:shadow-2xl hover:shadow-brand-900/10 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center"
              >
                {/* Clean Top Gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 to-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="w-12 h-12 rounded-xl bg-slate-50 text-brand-900 flex items-center justify-center mb-6 group-hover:bg-brand-900 group-hover:text-brand-gold transition-colors duration-300 shrink-0 border border-slate-100">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>

                <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900 mb-3 group-hover:text-brand-red transition-colors line-clamp-2 min-h-[3.5rem] flex items-center leading-tight">
                  {service.title}
                </h3>

                <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 flex-grow line-clamp-3 min-h-[4.5rem]">
                  {service.desc}
                </p>

                <div className="mt-auto flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-brand-red transition-colors duration-300">
                  ПОДРОБНЕЕ <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      ) : (
        <section className="py-12 md:py-16 lg:py-20 bg-slate-50 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="mt-5 text-3xl md:text-5xl font-serif font-bold text-brand-900">Услуги</h2>
                <p className="mt-3 text-slate-600">Короткий список основных услуг. Для уточнения задачи — лучше созвониться.</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Финансовая экспертиза", desc: "Анализ финансовых документов, расчёты, проверка обоснованности показателей.", img: cloneImgFinance, link: "/services/category/financial" },
                  { title: "Строительная экспертиза", desc: "Проверка качества, объёмов, дефектов, спорные ситуации по объектам.", img: cloneImgConstruction, link: "/services/category/construction" },
                  { title: "Оценка", desc: "Независимая оценка бизнеса, недвижимости и активов.", img: cloneImgValuation, link: "/services/category/valuation" },
                  { title: "Земельные вопросы", desc: "Границы, межевые споры, кадастровые ошибки.", img: cloneImgLand, link: "/services/category/land" },
                  { title: "Почерк/подписи", desc: "Проверка подписи и рукописного текста по документам.", img: cloneImgHandwriting, link: "/services/category/handwriting" },
                ].map((row) => (
                  <Link
                    key={row.link}
                    to={row.link}
                    className="group flex flex-col md:flex-row gap-6 bg-white rounded-3xl border border-slate-200 p-6 md:p-7 hover:shadow-xl transition-shadow"
                  >
                    <div className="md:w-44 md:shrink-0">
                      <div className="rounded-2xl overflow-hidden border border-slate-200">
                        <img src={row.img} alt={row.title} className="w-full h-32 md:h-28 object-cover" loading="lazy" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xl md:text-2xl font-serif font-bold text-brand-900 group-hover:text-brand-red transition-colors">
                        {row.title}
                      </div>
                      <div className="mt-2 text-slate-600">{row.desc}</div>
                      <div className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-brand-red transition-colors">
                        Подробнее <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <Button size="lg" to={`tel:${CONTACT_PHONE_E164}`} className="justify-center px-10 py-5 text-base md:text-lg">
                  Позвонить
                </Button>
                <Button size="lg" to="/services" variant="outline" className="justify-center px-10 py-5 text-base md:text-lg">
                  Смотреть все услуги
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {!isClone && (
        <section className="py-12 md:py-16 lg:py-20 bg-white relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <SectionHeader title="Алгоритм работы" subtitle="Прозрачный процесс: от первого звонка до победы в суде" />

            <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-8 pt-4 -mx-4 px-4 lg:grid lg:grid-cols-5 lg:gap-4 lg:py-4 lg:mx-0 lg:px-0 lg:overflow-visible scrollbar-hide items-stretch">
              {[
                { number: "1", title: "Заявка", desc: "Краткий анализ ситуации по телефону или в офисе. Бесплатная оценка перспектив.", icon: Phone },
                { number: "2", title: "Договор", desc: "Фиксация стоимости, сроков и вопросов эксперту. Работаем по официальному договору.", icon: FileSignature },
                { number: "3", title: "Анализ", desc: "Выезд эксперта, осмотр объекта, изучение документов и проведение расчетов.", icon: Search },
                { number: "4", title: "Отчет", desc: "Подготовка Заключения по ФЗ-73, которое имеет юридическую силу в суде.", icon: FileCheck },
                { number: "5", title: "Суд", desc: "Выступление эксперта на заседании, защита выводов и ответы на вопросы судьи.", icon: Gavel, isLast: true }
              ].map((step, index) => (
                <div key={index} className="min-w-[85vw] sm:min-w-[350px] lg:min-w-0 snap-center lg:snap-align-none relative group flex-1">
                  {!step.isLast && (
                    <div className="hidden lg:block absolute top-[1.75rem] left-1/2 w-full h-[2px] bg-slate-100 -z-10">
                      <div className="w-0 h-full bg-brand-red group-hover:w-full transition-all duration-1000 ease-out"></div>
                    </div>
                  )}

                  <div className="bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none border lg:border-none border-gray-100 shadow-sm lg:shadow-none h-full flex flex-col lg:items-center">
                    <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-0 lg:mb-4">
                      <div className="w-14 h-14 rounded-full bg-white border-[3px] border-slate-300 shadow-xl flex items-center justify-center text-brand-red group-hover:border-brand-red group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 z-20 shrink-0">
                        <step.icon size={24} strokeWidth={1.5} />
                      </div>
                      <div className="lg:hidden text-[10px] font-bold uppercase tracking-widest text-brand-red opacity-60">Этап 0{step.number}</div>
                    </div>

                    <div className="text-left lg:text-center mt-2 lg:mt-4">
                      <div className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-brand-red mb-2 opacity-60">
                        Этап 0{step.number}
                      </div>
                      <h3 className="font-serif font-bold text-xl text-brand-900 mb-2 group-hover:text-brand-red transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed lg:max-w-[200px] mx-auto">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 md:mt-16 lg:mt-20 text-center px-4">
              <Button
                onClick={() => {
                  const event = new CustomEvent('openContactModal', { detail: { service: 'Начать работу (из алгоритма)' } });
                  window.dispatchEvent(event);
                }}
                variant="primary"
                className="px-10 py-4 md:py-5 md:px-14 text-base md:text-lg shadow-xl w-full sm:w-auto hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Начать работу
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Universal Quiz - Floating Widget (main site only) */}
      {!isClone && <UniversalQuiz />}

      {!isClone && (
        <section id="reviews" className="py-12 md:py-16 lg:py-20 bg-slate-50 relative overflow-hidden shadow-inner">
        <div className="container mx-auto px-4 md:px-6 relative">

          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionHeader title="Нам доверяют" subtitle="Реальные отзывы наших клиентов и партнеров" />

            {/* Rating Badges */}
            <div className="flex flex-nowrap justify-center gap-3 md:gap-6 mt-8 animate-fade-in delay-100 p-6 overflow-x-auto md:overflow-visible scrollbar-hide">
              <div className="flex items-center gap-2 md:gap-3 bg-white border border-gray-100 shadow-md rounded-full px-4 md:px-6 py-3 shrink-0">
                <img src={googleGIcon} alt="Google" className="w-5 h-5 md:w-6 md:h-6" loading="lazy" decoding="async" />
                <div className="flex flex-col items-start leading-none">
                  <div className="flex gap-1 text-brand-gold text-[10px]">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" stroke="none" />)}
                  </div>
                  <span className="font-bold text-slate-700 text-xs md:text-sm mt-1">5.0 рейтинг</span>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 bg-white border border-gray-100 shadow-md rounded-full px-4 md:px-6 py-3 shrink-0">
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

          <div className="relative group">
            {/* Scroll Buttons (Desktop Only) */}
            <button
              onClick={() => scroll('left')}
              className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-brand-900 hover:text-brand-gold hover:scale-110 hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Назад"
            >
              <ChevronLeft size={28} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-brand-900 hover:text-brand-gold hover:scale-110 hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Вперед"
            >
              <ChevronRight size={28} strokeWidth={1.5} />
            </button>

            <div ref={scrollContainerRef} className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4 md:mx-0 md:px-0 t-scrollbar">
              {REVIEWS.map((review) => (
                <div key={review.id} className="min-w-[85vw] sm:min-w-[400px] lg:min-w-[33%] xl:min-w-[25%] snap-center flex h-auto">
                  <div className="bg-white p-8 rounded-3xl relative w-full flex flex-col hover:shadow-xl transition-all duration-300 border border-transparent shadow-sm group">
                    {/* Quote Icon */}
                    <div className="absolute top-8 right-8 text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
                    </div>

                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={16} className={`${idx < review.rating ? 'text-brand-gold fill-brand-gold' : 'text-gray-100'}`} />
                      ))}
                    </div>

                    <p className="text-slate-700 italic leading-relaxed mb-6 font-medium text-lg flex-grow">
                      "{review.text}"
                    </p>

                    <div className="mt-auto flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-900 border border-brand-100 flex items-center justify-center font-bold font-serif text-lg">
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
        </div>
        </section>
      )}

      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-3xl md:rounded-[3rem] p-8 xs:p-10 md:p-14 lg:p-20 text-center shadow-2xl relative overflow-hidden isolate">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute -top-24 -right-24 w-64 md:w-96 lg:w-[600px] h-64 md:h-96 lg:h-[600px] bg-brand-red blur-[120px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 md:w-96 lg:w-[500px] h-64 md:h-96 lg:h-[500px] bg-brand-gold blur-[120px] opacity-10"></div>

            <h2 className="text-2xl xs:text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 md:mb-10 relative z-10 leading-tight">
              Нужна независимая <br className="hidden md:block" /> экспертиза?
            </h2>
            <p className="text-base xs:text-lg md:text-2xl text-slate-300 mb-10 md:mb-12 max-w-3xl mx-auto relative z-10 leading-relaxed font-light">
              Позвоните или напишите на почту — быстро уточним задачу и подскажем, что подготовить по документам.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4 px-4 xs:px-0">
              <Button
                size="lg"
                to={`tel:${CONTACT_PHONE_E164}`}
                className="w-full sm:w-auto text-base md:text-lg px-12 py-5 justify-center shadow-xl shadow-brand-red/20"
              >
                Позвонить
              </Button>
              <Button
                size="lg"
                to={`mailto:${CONTACT_EMAIL}`}
                variant="outline-white"
                className="w-full sm:w-auto text-base md:text-lg px-12 py-5 justify-center"
              >
                Написать на почту
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
