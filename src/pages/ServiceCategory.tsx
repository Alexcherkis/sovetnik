import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICE_CATEGORIES, SERVICES, CITIES } from '../data/constants';
import { Button, ServiceCard, SectionHeader } from '../components/Components';
import { UniversalQuiz } from '../components/UniversalQuiz';
import { CheckCircle2, ChevronRight, ArrowRight, Clock, ChevronDown, ChevronUp, FileText, Phone, Star, Shield, TrendingUp, Zap, FileCheck, Monitor, Briefcase, Home, Building2, Map, PieChart, Award } from 'lucide-react';
import { NotFound } from './NotFound';

import { SEO } from '../components/SEO';
import { RegionalInterlinking } from '../components/RegionalInterlinking';
import { getDynamicSEO } from '../utils/seoUtils';
import { SITE_NAME, OG_IMAGE_URL, CONTACT_PHONE_E164 } from '../config/site';
import { getCitySpecificContent, CitySpecificContent } from '../data/citySpecifics';

const SERVICE_ICONS: Record<string, any> = {
  'business-valuation-llc': Briefcase,
  'startup-valuation': TrendingUp,
  'trademark-valuation': Zap,
  'patent-valuation': FileCheck,
  'software-valuation': Monitor,
  'knowhow-valuation': Shield,
  'apartment-valuation': Home,
  'commercial-valuation': Building2,
  'land-valuation': Map,
  'equipment-valuation': PieChart,
};

export const ServiceCategoryLanding: React.FC = () => {
  const { categorySlug, city } = useParams<{ categorySlug: string, city: string }>();

  const currentCity = city ? CITIES.find(c => c.slug === city) : null;
  if (city && !currentCity) {
    return <NotFound />;
  }
  const cityIn = currentCity?.nameIn || 'в РФ';
  const cityName = currentCity?.name || '';

  const [expandedService, setExpandedService] = useState<string | null>(null);

  const categoryData = SERVICE_CATEGORIES[categorySlug || ''];
  const citySpecificContent = currentCity ? getCitySpecificContent(currentCity.slug) : null;

  if (!categoryData) {
    return <NotFound />;
  }

  const services = SERVICES.filter(s => s.categorySlug === categorySlug);

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": categoryData.title,
    "description": categoryData.description,
    "provider": {
      "@type": "ProfessionalService",
      "name": SITE_NAME,
      "image": OG_IMAGE_URL
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги в категории",
      "itemListElement": services.map(s => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.title
        },
        "price": s.priceStart.replace(/[^0-9]/g, ''),
        "priceCurrency": "RUB"
      }))
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ...(categoryData.benefits && categoryData.benefits.length > 0 ? categoryData.benefits.map(b => ({
        "@type": "Question",
        "name": b.title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": b.desc
        }
      })) : []),
      ...(citySpecificContent?.localFAQ && citySpecificContent.localFAQ.length > 0 ? citySpecificContent.localFAQ.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      })) : [])
    ]
  };

  const combinedSchemas: any[] = [categorySchema];
  if (faqSchema) combinedSchemas.push(faqSchema);

  const dynamicSEO = getDynamicSEO(categoryData.title, cityIn, "10 000 ₽", "3 дней", categorySlug || '');

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={dynamicSEO.title}
        description={dynamicSEO.description}
        image={categoryData.heroImage}
        url={`/services/category/${categorySlug}${city ? '/' + city : ''}`}
        schema={combinedSchemas}
        city={cityName}
        breadcrumbs={[
          { name: "Главная", item: "/" },
          { name: "Услуги", item: "/services" },
          { name: `${categoryData.title} ${cityName || 'РФ'}`, item: `/services/category/${categorySlug}${city ? '/' + city : ''}` }
        ]}
      />

      {/* 1. HERO — Refined */}
      <section className="relative overflow-hidden bg-brand-950">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={categoryData.heroImage}
            alt={categoryData.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-[0.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-950/95 to-brand-950"></div>
        </div>

        {/* Subtle gold glow */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-gold/5 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-16 md:min-h-[60vh] md:py-28">
            {/* Left: Content */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-brand-gold/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3 md:mb-5">
                <Award size={10} />
                <span>Оценка активов</span>
                <span className="w-6 md:w-8 h-px bg-brand-gold/30 ml-2"></span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.06] tracking-tight mb-3 md:mb-5">
                {categoryData.title} {city && <span className="text-brand-gold">{cityIn}</span>}
              </h1>
              <p className="text-base md:text-xl text-slate-300 leading-relaxed font-light max-w-xl">
                {categoryData.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-10">
                <Button
                  onClick={() => {
                    const event = new CustomEvent('openContactModal', { detail: { service: `Категория: ${categoryData.title}` } });
                    window.dispatchEvent(event);
                  }}
                  className="px-8 shadow-xl shadow-brand-red/20"
                >
                  Заказать оценку
                </Button>
                <Button variant="outline-white" onClick={() => {
                  document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Все услуги
                </Button>
              </div>
            </div>

            {/* Right: Decorative stat (desktop only) */}
            <div className="hidden md:block shrink-0">
              <div className="text-right">
                <div className="text-7xl lg:text-8xl font-serif font-bold text-white/5 select-none">
                  {String(services.length).padStart(2, '0')}
                </div>
                <div className="text-sm text-white/30 uppercase tracking-[0.3em] font-medium -mt-2">
                  услуг в направлении
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro & Benefits (Why Us for this category) */}
      <section className="py-10 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            <div className="order-2 lg:order-1">
              <SectionHeader
                title="Почему выбирают нас?"
                subtitle={`Ваши преимущества при заказе услуги «${categoryData.title}»`}
                centered={false}
              />
              <p className="text-sm md:text-lg text-slate-600 leading-relaxed mb-6 md:mb-8">
                {categoryData.description}
              </p>

              <div className="space-y-3 md:space-y-6">
                {categoryData.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-red/30 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-brand-red border border-gray-100">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-slate-500">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block lg:order-2 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
                <img src={categoryData.heroImage} className="w-full h-full object-cover scale-110 grayscale hover:grayscale-0 transition-all duration-700" alt="Эксперт за работой" />
                <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply"></div>
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-[200px] hidden md:block">
                <div className="text-4xl font-serif font-black text-brand-gold mb-1">{services.length}+</div>
                <div className="text-xs font-bold uppercase text-slate-400">Видов профильных экспертиз</div>
              </div>
            </div>

        </div>
      </div>
    </section>

      {/* City Specific Content Block */}
      {citySpecificContent && (
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="bg-white rounded-2xl p-5 md:p-12 shadow-xl border border-slate-100">
              <h2 className="text-xl md:text-3xl font-serif font-bold text-brand-900 mb-4 md:mb-6">
                Особенности экспертизы {citySpecificContent.cityName}
              </h2>
              <p className="text-sm md:text-lg text-slate-600 leading-relaxed mb-6 md:mb-8">
                {citySpecificContent.uniqueParagraph}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="font-bold text-brand-900 text-sm md:text-base mb-2 md:mb-4">Суды города</h3>
                  <ul className="space-y-1 md:space-y-2">
                    {citySpecificContent.localCourts.map((court, idx) => (
                      <li key={idx} className="text-sm md:text-base text-slate-600">{court}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-brand-900 text-sm md:text-base mb-2 md:mb-4">Специфика</h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{citySpecificContent.specifics}</p>
                </div>
              </div>
              {citySpecificContent.nearbyAreas && (
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Ближайшие районы</span>
                  <p className="text-slate-600 mt-2">{citySpecificContent.nearbyAreas}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section for PSEO */}
      {citySpecificContent?.localFAQ && citySpecificContent.localFAQ.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <SectionHeader
              title={`Частые вопросы по ${categoryData.title.toLowerCase()} ${cityIn}`}
              subtitle="Ответы на популярные вопросы наших клиентов"
              centered={false}
            />
            <div className="mt-8 space-y-4">
              {citySpecificContent.localFAQ.map((faq, idx) => (
                <details key={idx} className="group bg-white rounded-xl border border-slate-200 p-4 md:p-5 cursor-pointer">
                  <summary className="flex justify-between items-center font-bold text-brand-900 marker:content-none gap-2">
                    <span className="text-sm md:text-lg leading-snug">{faq.question}</span>
                    <ChevronDown size={18} className="shrink-0 text-brand-gold transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed pt-3 border-t border-slate-200">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Service List — Premium Card Grid */}
    <section id="services-grid" className="py-16 md:py-24 bg-slate-50 relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionHeader title="Услуги направления" subtitle={`${services.length} видов экспертиз — от оценки бизнеса до патентов и ПО`} centered={true} />
          </div>

          {/* Featured service: first one = business valuation */}
          {services.length > 0 && (() => {
            const featured = services[0];
            const IconComp = SERVICE_ICONS[featured.slug];
            return (
              <div className="max-w-4xl mx-auto mb-6 md:mb-10">
                <div className="group relative bg-white rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-900 via-brand-red to-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 p-4 md:p-8 md:flex md:items-center md:justify-between md:gap-6">
                    <div className="flex items-start gap-4 md:gap-5">
                      <div className="hidden md:flex w-14 h-14 rounded-xl bg-brand-50 items-center justify-center text-brand-900 shrink-0">
                        {IconComp ? <IconComp size={28} /> : <PieChart size={28} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="md:hidden w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-900 shrink-0">
                            {IconComp ? <IconComp size={20} /> : <PieChart size={20} />}
                          </div>
                          <h3 className="text-base md:text-2xl font-serif font-bold text-brand-900">{featured.title}</h3>
                        </div>
                        <p className="text-sm md:text-sm text-slate-500 leading-relaxed line-clamp-3 md:line-clamp-none">{featured.fullDesc}</p>
                        <div className="flex items-center gap-3 md:gap-4 mt-3 text-xs md:text-sm">
                          <span className="text-brand-red font-bold font-serif text-base md:text-lg">{featured.priceStart}</span>
                          <span className="text-slate-300 hidden md:inline">|</span>
                          <span className="text-slate-400 flex items-center"><Clock size={13} className="mr-1" /> {featured.duration}</span>
                        </div>
                        <div className="mt-4 md:hidden">
                          <Button
                            onClick={() => {
                              const event = new CustomEvent('openContactModal', { detail: { service: featured.title } });
                              window.dispatchEvent(event);
                            }}
                            size="sm"
                            className="w-full text-sm shadow-md"
                          >
                            Заказать оценку
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block shrink-0">
                      <Button
                        onClick={() => {
                          const event = new CustomEvent('openContactModal', { detail: { service: featured.title } });
                          window.dispatchEvent(event);
                        }}
                        className="bg-brand-900 text-white hover:bg-brand-red shadow-xl"
                      >
                        Заказать оценку
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Grid: remaining services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {services.slice(1).map(service => {
              const IconComponent = SERVICE_ICONS[service.slug];
              return (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-brand-red/20 flex flex-col"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-900 via-brand-red to-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-3 right-3 md:top-5 md:right-5 bg-brand-900 text-white px-2 py-0.5 md:px-3 md:py-1.5 rounded-md md:rounded-lg font-bold text-[11px] md:text-sm font-serif shadow-lg group-hover:bg-brand-red transition-colors duration-300 z-10">
                    от {service.priceStart.replace(/\s/g, '')}
                  </div>
                  <div className="p-4 md:p-6 pt-5 md:pt-8 pb-0 flex flex-col flex-1">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-900 mb-3 md:mb-5 group-hover:bg-brand-900 group-hover:text-brand-gold transition-all duration-500 shadow-sm">
                      {IconComponent ? <IconComponent size={20} strokeWidth={1.5} /> : <PieChart size={20} strokeWidth={1.5} />}
                    </div>
                    <h3 className="text-base md:text-lg font-serif font-bold text-brand-900 mb-2 md:mb-3 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-sm text-slate-500 leading-relaxed line-clamp-2 md:line-clamp-3 mb-3 md:mb-4 flex-1">
                      {service.shortDesc}
                    </p>
                    <div className="flex items-center text-xs md:text-xs text-slate-400 mb-4 md:mb-5">
                      <Clock size={13} className="mr-1.5 text-brand-gold" />
                      Срок: <span className="text-slate-600 font-medium ml-1">{service.duration}</span>
                    </div>
                  </div>
                  <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <Button
                      onClick={() => {
                        const event = new CustomEvent('openContactModal', { detail: { service: service.title } });
                        window.dispatchEvent(event);
                      }}
                      size="sm"
                      className="w-full justify-center text-sm shadow-md"
                    >
                      Заказать расчёт
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {services.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              В данном разделе пока нет услуг. Свяжитесь с нами для уточнения.
            </div>
          )}
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <section className="py-8 md:py-16 bg-brand-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { value: '15+', label: 'Лет экспертизы' },
              { value: services.length.toString() + '+', label: 'Видов оценки' },
              { value: '500+', label: 'Успешных проектов' },
              { value: '54', label: 'Отзывов с рейтингом 5.0' },
            ].map((stat, idx) => (
              <div key={idx} className="p-4">
                <div className="text-3xl md:text-5xl font-serif font-bold text-brand-gold mb-2">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-10 md:py-24 bg-white relative overflow-hidden">
        {/* Background decor */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent hidden md:block"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <SectionHeader title="Как проводится оценка" subtitle="Прозрачный процесс от заявки до готового отчёта" centered={true} />
          
          <div className="relative max-w-5xl mx-auto mt-8 md:mt-16">
            {/* Desktop: connecting line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-gold/20 via-brand-gold/40 to-brand-gold/20"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
              {[
                { step: '01', title: 'Заявка', desc: 'Оставляете заявку — уточняем задачу', icon: '📋' },
                { step: '02', title: 'Анализ', desc: 'Собираем документы, считаем стоимость', icon: '📊' },
                { step: '03', title: 'Отчёт', desc: 'Готовим официальный отчёт с выводами', icon: '📄' },
                { step: '04', title: 'Готово', desc: 'Получаете отчёт для сделки или суда', icon: '✅' },
              ].map((p, idx) => (
                <div key={idx} className="text-center relative group md:px-6">
                  {/* Step connector dot (desktop) */}
                  <div className="hidden md:flex items-center justify-center mb-8">
                    <div className="w-5 h-5 rounded-full bg-brand-900 border-4 border-brand-gold/30 group-hover:border-brand-gold group-hover:scale-125 transition-all duration-500 relative z-10">
                      <div className="absolute inset-1 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Number circle */}
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-brand-50 border-2 border-brand-100 text-brand-900 flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:border-brand-gold group-hover:shadow-lg group-hover:shadow-brand-gold/20 transition-all duration-500">
                    <span className="text-lg md:text-3xl font-serif font-bold">{p.step}</span>
                  </div>
                  
                  <div className="md:px-2">
                    <h3 className="text-sm md:text-lg font-serif font-bold text-brand-900 mb-1 md:mb-3">{p.title}</h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-[180px] mx-auto">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Universal Quiz (main site only) */}
      {import.meta.env.MODE !== 'clone' && <UniversalQuiz />}

      {/* 4. Cross-Navigation (SEO Regional Cloud) */}
      <RegionalInterlinking 
        currentCitySlug={city} 
        currentCategorySlug={categorySlug} 
      />

    </div >
  );
};