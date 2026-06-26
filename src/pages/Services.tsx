import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SectionHeader, Button, ServiceCard, TrustBadge } from '../components/Components';
import { SERVICES, SERVICE_CATEGORIES, CITIES } from '../data/constants';
import { CheckCircle2, ArrowRight, FileText, HelpCircle, Briefcase, FileCheck, MapPin, Filter, ChevronRight, Clock, Search, X, LayoutGrid, ChevronLeft, ChevronDown, TrendingUp, PieChart, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';
import { RegionalInterlinking } from '../components/RegionalInterlinking';
import { getDynamicSEO } from '../utils/seoUtils';
import { SITE_NAME, SITE_ORIGIN, CONTACT_PHONE_E164, OG_IMAGE_URL, CONTACT_ADDRESS_CITY } from '../config/site';
import { getCitySpecificContent, CitySpecificContent } from '../data/citySpecifics';
import { getAuthorForService } from '../data/authors';

const ServiceGridItem = ({ service }: { service: any }) => (
  <Link
    to={`/services/${service.slug}`}
    className="group flex flex-col p-5 bg-white rounded-xl border border-slate-300 shadow-md hover:shadow-xl hover:border-brand-red/30 transition-all duration-300 h-full relative overflow-hidden"
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-lg font-bold text-brand-900 group-hover:text-brand-red transition-colors leading-tight pr-4">
        {service.title}
      </h3>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-brand-red">
        <ArrowRight size={18} />
      </div>
    </div>

    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4 flex-grow">
      {service.description || service.shortDesc}
    </p>

    <div className="mt-auto flex items-center justify-between text-xs font-medium pt-3 border-t border-gray-50">
      <div className="flex items-center text-slate-400">
        <Clock size={12} className="mr-1.5" />
        {service.duration}
      </div>
      <div className="bg-brand-50 text-brand-900 px-2 py-1 rounded font-bold group-hover:bg-brand-red group-hover:text-white transition-colors">
        {service.priceStart}
      </div>
    </div>
  </Link>
);

export const ServicesList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Object.values(SERVICE_CATEGORIES);

  const filteredGroups = useMemo(() => {
    let filteredServices = SERVICES;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filteredServices = filteredServices.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.tasks.some(t => t.toLowerCase().includes(q))
      );
    }

    const groups = categories.map(cat => ({
      category: cat,
      services: filteredServices.filter(s => s.categorySlug === cat.slug)
    })).filter(group => group.services.length > 0);

    if (activeCategory !== 'all') {
      return groups.filter(g => g.category.slug === activeCategory);
    }

    return groups;
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-white min-h-screen font-sans">
      <SEO
        title="Каталог услуг экспертизы"
        description="Полный перечень экспертных услуг: от строительной до финансовой экспертизы. Выберите нужную категорию."
        url="/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": SERVICES.map((s, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${SITE_ORIGIN}/services/${s.slug}`,
            "name": s.title
          }))
        }}
      />

      {/* COMPACT HERO */}
      <div className="bg-brand-900 text-white pt-28 pb-12 md:pt-36 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Стоимость услуг</h1>
          <p className="text-slate-400 text-sm md:text-base font-light max-w-xl">
            Единый каталог компетенций бюро. Найдите экспертизу за 2 клика.
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="container mx-auto px-4 py-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* SIDEBAR (Clean & Transparent) */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
            <nav className="space-y-1">
              <button
                onClick={() => { setActiveCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${activeCategory === 'all' ? 'bg-brand-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-900'}`}
              >
                <LayoutGrid size={16} className={`mr-3 ${activeCategory === 'all' ? 'text-brand-gold' : 'text-slate-400'}`} />
                Все направления
              </button>

              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${activeCategory === cat.slug ? 'bg-brand-50 text-brand-red font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-brand-900'}`}
                >
                  <cat.icon size={16} className={`mr-3 ${activeCategory === cat.slug ? 'text-brand-red' : 'text-slate-400'}`} />
                  {cat.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* CONTENT AREA */}
          <div className="flex-1 w-full min-w-0">

            {/* SEARCH BAR (Sticky & Pro) */}
            <div className="mb-8 sticky top-[110px] z-30 transition-all duration-300">

              <div className="relative z-10">
                <div className="relative max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 p-2 ring-1 ring-gray-100 overflow-hidden group focus-within:ring-2 focus-within:ring-brand-gold/50 focus-within:shadow-xl transition-all">
                  <div className="flex items-center">
                    <div className="pl-4 pr-3 text-slate-400 group-focus-within:text-brand-red transition-colors">
                      <Search size={22} />
                    </div>
                    <input
                      type="text"
                      placeholder="Поиск услуги (например: строительная, оценка)..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (activeCategory !== 'all') setActiveCategory('all');
                      }}
                      className="w-full h-12 bg-transparent text-base md:text-lg text-brand-900 placeholder:text-slate-400 placeholder:font-light outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="p-3 text-slate-400 hover:text-brand-red hover:bg-red-50 rounded-xl transition-all mr-1"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>

                  {/* Suggested Tags (Visible when empty or searching) */}
                  <div className="flex items-center gap-2 px-4 pb-2 pt-1 overflow-x-auto scrollbar-hide border-t border-dashed border-gray-100 mt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0 mr-1">Например:</span>
                    {['Банкротство', 'Залив', 'Оценка', 'Земля', 'Почерк', 'Рецензия'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSearchQuery(tag);
                          setActiveCategory('all');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-2.5 py-1 bg-slate-50 hover:bg-brand-50 text-slate-500 hover:text-brand-900 border border-slate-100 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Category Chips (Below Search) */}
                <div className="lg:hidden w-full overflow-x-auto pb-1 px-1 scrollbar-hide -mx-1 flex gap-2 mt-4 relative z-20">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${activeCategory === 'all' ? 'bg-brand-900 text-white border-brand-900 shadow-md transform scale-105' : 'bg-white text-slate-600 border-slate-200'}`}
                  >
                    Все
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-2 ${activeCategory === cat.slug ? 'bg-brand-red text-white border-brand-red shadow-md transform scale-105' : 'bg-white text-slate-600 border-slate-200'}`}
                    >
                      {activeCategory === cat.slug && <cat.icon size={12} />}
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RESULTS */}
            {filteredGroups.length > 0 ? (
              <div className="space-y-10">
                {filteredGroups.map(group => (
                  <div key={group.category.slug} className="scroll-mt-32" id={group.category.slug}>
                    <div className="flex items-center gap-3 mb-4 md:mb-5 border-b border-gray-100 pb-2">
                      <div className="text-brand-red">
                        <group.category.icon size={22} />
                      </div>
                      <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-900">{group.category.title}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {group.services.map(service => (
                        <ServiceGridItem key={service.id} service={service} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search size={40} className="text-slate-200 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">По вашему запросу ничего не найдено.</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="text-brand-red text-sm font-bold mt-2 hover:underline">
                  Сбросить фильтры
                </button>
              </div>
            )}

            {/* FOOTER CTA */}
            <div className="mt-16 pt-8 border-t border-gray-100">
              <div className="bg-brand-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-white text-lg font-bold mb-1">Не нашли нужную услугу?</h3>
                  <p className="text-slate-400 text-sm">Свяжитесь с нами, мы поможем.</p>
                </div>
                <Button
                  onClick={() => {
                    const event = new CustomEvent('openContactModal', { detail: { service: 'Общий вопрос из каталога' } });
                    window.dispatchEvent(event);
                  }}
                  className="relative z-10 bg-white text-brand-900 hover:bg-gray-100 text-sm px-6 py-3 shadow-lg border-none shrink-0"
                >
                  Написать эксперту
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export const ServiceDetail: React.FC = () => {
  const { slug, city } = useParams<{ slug: string, city: string }>();

  const currentCity = city ? CITIES.find(c => c.slug === city) : null;
  // If city is provided but unknown, return 404 to avoid duplicate/garbage PSEO URLs.
  if (city && !currentCity) {
    return (
      <>
        <SEO noindex />
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-3xl font-serif font-bold mb-4 text-brand-900">Страница не найдена</h2>
          <Button onClick={() => navigate('/services')}>Вернуться в каталог</Button>
        </div>
      </>
    );
  }
  const cityIn = currentCity?.nameIn || 'в РФ';
  const cityName = currentCity?.name || '';
  const citySpecificContent = currentCity ? getCitySpecificContent(currentCity.slug) : null;

  const service = SERVICES.find(s => s.slug === slug);
  const otherServices = SERVICES.filter(s => s.slug !== slug && s.categorySlug === service?.categorySlug).slice(0, 3);
  const navigate = useNavigate();

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-3xl font-serif font-bold mb-4 text-brand-900">Услуга не найдена</h2>
        <Button onClick={() => navigate('/services')}>Вернуться в каталог</Button>
      </div>
    );
  }

  // --- Dynamic Structured Data (SEO) ---
  const dynamicSEO = getDynamicSEO(service.title, cityIn, service.priceStart, service.duration, slug || '', cityName);

  // Base service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.categoryLabel,
    "name": `${service.title} ${cityIn}`,
    "description": dynamicSEO.description,
    "provider": {
      "@type": "ProfessionalService",
      "name": cityName ? `${SITE_NAME} в ${cityName}` : SITE_NAME,
      "telephone": CONTACT_PHONE_E164,
      "image": OG_IMAGE_URL,
      "priceRange": "40000-500000RUB"
    },
    "areaServed": [
      { "@type": "City", "name": cityName || CONTACT_ADDRESS_CITY || "РФ" },
      { "@type": "Country", "name": "Россия" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Стоимость услуг",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.title
          },
          "price": service.priceStart.replace(/[^0-9]/g, ''),
          "priceCurrency": "RUB"
        }
      ]
    }
  };

  // FAQ Schema for SEO (invisible but indexed)
  const faqSchema = citySpecificContent?.localFAQ && citySpecificContent.localFAQ.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": citySpecificContent.localFAQ.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Combine schemas
  const combinedSchemas = faqSchema ? [serviceSchema, faqSchema] : serviceSchema;

  // Author & dates
  const serviceAuthor = getAuthorForService(service);
  const serviceDateModified = service.dateModified || new Date().toISOString().split('T')[0];

  // FAQ schema from service.questions for AI-generated answers
  const serviceFaqSchema = service.questions.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.questions.map(q => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.includes('?') ? `Ответ зависит от конкретных обстоятельств дела. Для точного ответа свяжитесь с экспертом ${SITE_NAME}.` : `Подробную консультацию по данному вопросу можно получить у экспертов ${SITE_NAME}.`
      }
    }))
  } : null;
  const schemasWithFaq = serviceFaqSchema ? (
    Array.isArray(combinedSchemas) ? [...combinedSchemas, serviceFaqSchema] : [combinedSchemas, serviceFaqSchema]
  ) : combinedSchemas;

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-red selection:text-white">
      <SEO
        title={dynamicSEO.title}
        description={dynamicSEO.description}
        image={service.heroImage}
        url={`/services/${slug}${city ? '/' + city : ''}`}
        schema={schemasWithFaq}
        city={cityName}
        service={{
          name: service.title,
          description: dynamicSEO.description,
          price: service.priceStart,
          duration: service.duration,
          category: service.categoryLabel
        }}
        author={serviceAuthor ? {
          name: serviceAuthor.name,
          honorific: serviceAuthor.honorific,
          url: `${SITE_ORIGIN}/authors/${serviceAuthor.slug}`
        } : undefined}
        datePublished="2023-01-01"
        dateModified={serviceDateModified}
        breadcrumbs={[
          { name: 'Услуги', item: '/services' },
          { name: service.categoryLabel || 'Категория', item: `/services/category/${service.categorySlug}` },
          { name: `${service.title} ${cityName || 'РФ'}`, item: `/services/${slug}${city ? '/' + city : ''}` }
        ]}
      />

      {/* 1. HERO SECTION (Immersive) */}
      <div className="relative bg-brand-900 text-white min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center overflow-hidden pt-24 pb-16">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={service.heroImage || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80"}
            alt={service.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-20 scale-105 animate-[kenburns_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/95 to-brand-900/40"></div>

        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-4xl animate-fade-in-up">
            {/* Breadcrumbs / Tag */}
            {/* Breadcrumbs / Tag */}
            <Link to="/price" className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors mb-6 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Вернуться в каталог</span>
            </Link>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-black mb-6 leading-[1.1] text-white">
              {service.title} <span className="text-brand-gold">{cityIn}</span>
            </h1>

            {/* Leads */}
            <p className="text-base sm:text-lg md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed border-l-2 border-brand-red pl-6 mb-10">
              {service.shortDesc}
            </p>

            {/* Desktop CTAs */}
            <div className="hidden md:flex flex-wrap gap-4 items-center">
              <Button
                size="lg"
                onClick={() => {
                  const event = new CustomEvent('openContactModal', { detail: { service: service.title } });
                  window.dispatchEvent(event);
                }}
                className="shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(220,38,38,0.6)] px-10 py-5 text-lg"
              >
                Заказать экспертизу
              </Button>
              <div className="flex items-center gap-3 px-6 text-slate-400 text-sm font-medium">
                <Clock size={18} className="text-[#D4AF37]" />
                <span>Срок: <span className="text-white">{service.duration}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MOBILE CARD (Visible only on mobile/tablet) */}
      <div className="md:hidden px-4 -mt-12 relative z-20 pb-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-fade-in-up">
          <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Базовая стоимость</div>
              <div className="text-2xl font-serif font-black text-brand-red">{service.priceStart}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Срок</div>
              <div className="font-bold text-brand-900">{service.duration}</div>
            </div>
          </div>
          <Button
            onClick={() => {
              const event = new CustomEvent('openContactModal', { detail: { service: service.title } });
              window.dispatchEvent(event);
            }}
            className="w-full justify-center py-4 text-base shadow-lg"
          >
            Заказать расчет
          </Button>
        </div>
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* LEFT COLUMN: Content */}
          <div className="lg:col-span-8 space-y-16 md:space-y-24">

              {/* Description with BLUF (Bottom Line Up Front for AI) */}
            <section className="prose prose-lg md:prose-xl text-slate-600 max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-brand-900 prose-p:leading-relaxed prose-li:marker:text-brand-red">
              <h2 className="text-3xl md:text-4xl mb-6">О процедуре</h2>
              <p className="text-lg md:text-xl font-semibold text-brand-900 leading-relaxed mb-6">
                {service.fullDesc.split('.')[0]}.
              </p>
              {/* Fallback description parser */}
              {service.longDescription || (
                <div dangerouslySetInnerHTML={{ __html: service.fullDesc.replace(/\n/g, '<br/>') }} />
              )}
            </section>

            {/* Tasks (Grid cards) */}
            <section>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-900 mb-8 flex items-center">
                <Briefcase className="text-brand-red mr-3" size={28} />
                Ключевые задачи
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.tasks.map((task, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-transparent hover:border-brand-gold/30 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="text-brand-red shrink-0 mt-1" size={20} />
                      <p className="text-brand-900 font-medium leading-snug">{task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Documents */}
            {/* Documents - Premium Redesign */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-110"></div>

              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-900 mb-8 flex items-center relative z-10">
                <FileCheck className="text-brand-red mr-3" size={28} />
                Необходимые документы
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {service.documents.map((doc, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-gold/50 hover:bg-white hover:shadow-md transition-all duration-300">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-brand-900 font-serif font-bold text-sm shrink-0 shadow-sm border border-slate-100">
                      {i + 1}
                    </span>
                    <span className="text-base md:text-lg text-slate-700 font-medium leading-tight">{doc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Questions Box */}
            {service.questions.length > 0 && (
              <section className="bg-brand-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                {/* Glows */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold rounded-full blur-[100px] opacity-20"></div>

                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 relative z-10">
                  Вопросы эксперту:
                </h2>
                <div className="grid gap-6 relative z-10">
                  {service.questions.map((q, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <HelpCircle className="text-[#D4AF37] shrink-0 mt-1" size={20} />
                      <p className="text-slate-200 font-light leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="lg:sticky lg:top-32 space-y-8">

              {/* Price Card (Desktop) */}
              <div className="hidden md:block bg-white p-8 rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-slate-100">
                <h3 className="font-serif font-bold text-xl text-brand-900 mb-6 pb-4 border-b border-slate-100">Условия работы</h3>

                <div className="space-y-6 mb-8">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Базовая стоимость</span>
                    <span className="text-4xl font-serif font-black text-brand-red">{service.priceStart}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Минимальный срок</span>
                    <div className="flex items-center gap-2 font-bold text-brand-900 text-lg">
                      <Clock className="text-[#D4AF37]" size={20} />
                      {service.duration}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    const event = new CustomEvent('openContactModal', { detail: { service: service.title } });
                    window.dispatchEvent(event);
                  }}
                  className="w-full justify-center py-4 text-base shadow-xl shadow-brand-red/20 mb-4"
                >
                  Рассчитать стоимость
                </Button>
                <p className="text-center text-xs text-slate-400">
                  Консультация эксперта — бесплатно
                </p>
              </div>

              {/* Trust Badge (Crucial for Direct Traffic) */}
              <TrustBadge />

              {/* Other Services */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-brand-900 mb-4">Похожие услуги</h4>
                <nav className="space-y-2">
                  {otherServices.map(s => (
                    <Link key={s.id} to={`/services/${s.slug}`} className="block p-3 bg-white rounded-xl border border-slate-200 hover:border-[#D4AF37] hover:shadow-md transition-all">
                      <div className="text-sm font-medium text-slate-700 leading-tight mb-1">{s.title}</div>
                      <div className="text-xs text-brand-red font-bold">{s.priceStart}</div>
                    </Link>
                  ))}
                </nav>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* City Specific Content Block */}
      {citySpecificContent && (
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-900 mb-6">
                Особенности экспертизы {citySpecificContent.cityName}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {citySpecificContent.uniqueParagraph}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-brand-900 mb-4">Суды города</h3>
                  <ul className="space-y-2">
                    {citySpecificContent.localCourts.map((court, idx) => (
                      <li key={idx} className="text-slate-600">{court}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-brand-900 mb-4">Специфика</h3>
                  <p className="text-slate-600 leading-relaxed">{citySpecificContent.specifics}</p>
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
              title={`Частые вопросы по ${service.title.toLowerCase()} ${cityIn}`}
              subtitle="Ответы на популярные вопросы наших клиентов"
              centered={false}
            />
            <div className="mt-8 space-y-4">
              {citySpecificContent.localFAQ.map((faq, idx) => (
                <details key={idx} className="group bg-slate-50 rounded-xl border border-slate-200 p-5 cursor-pointer">
                  <summary className="flex justify-between items-center font-bold text-brand-900 marker:content-none">
                    <span className="text-base md:text-lg">{faq.question}</span>
                    <ChevronDown size={20} className="shrink-0 text-brand-gold transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed pt-4 border-t border-slate-200">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Оценка бизнеса — CTA для всех страниц */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur border border-white/20 px-5 py-2 rounded-full text-brand-gold text-xs font-bold uppercase tracking-wider mb-6">
              <PieChart size={14} /> Оценка бизнеса в РФ
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight">
              Нужна <span className="text-brand-gold">оценка бизнеса</span> или доли?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Определим реальную стоимость компании, доли участника или патента для сделки, суда или банка.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => window.dispatchEvent(new CustomEvent('openContactModal', { detail: { service: 'Оценка бизнеса (снизу)' } }))}
                size="lg"
                className="bg-brand-red border-none shadow-2xl shadow-brand-red/30 px-8"
              >
                <Briefcase size={18} className="mr-2" /> Заказать оценку
              </Button>
              <Button
                size="lg"
                variant="outline-white"
                to={`tel:${CONTACT_PHONE_E164}`}
                className="px-8"
              >
                <Phone size={18} className="mr-2" /> Позвонить
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Regional Links & Interlinking Cloud */}
      <RegionalInterlinking 
        currentServiceSlug={slug} 
        currentCitySlug={city} 
        currentCategorySlug={service.categorySlug} 
      />

    </div>
  );
};
