
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SectionHeader, Button, ServiceCard } from '../components/Components';
import { SERVICES, SERVICE_CATEGORIES } from '../constants';
import { CheckCircle2, ArrowRight, FileText, HelpCircle, Briefcase, FileCheck, MapPin, Filter, ChevronRight, Clock, Search, X, LayoutGrid } from 'lucide-react';

export const ServicesList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Object.values(SERVICE_CATEGORIES);

  const filteredData = useMemo(() => {
    let services = SERVICES;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      services = services.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.tasks.some(t => t.toLowerCase().includes(q))
      );
    }

    if (activeCategory === 'all') {
      return categories.map(cat => ({
        category: cat,
        services: services.filter(s => s.categorySlug === cat.slug)
      })).filter(group => group.services.length > 0);
    } else {
      const cat = SERVICE_CATEGORIES[activeCategory];
      return [{
        category: cat,
        services: services.filter(s => s.categorySlug === activeCategory)
      }];
    }
  }, [activeCategory, searchQuery]);

  import { SEO } from '../components/SEO';

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Все услуги"
        description="Полный реестр экспертных услуг бюро Советникъ. Финансовая экспертиза, строительная экспертиза, оценка. Поиск услуг."
        url="/services"
      />

      <div className="bg-brand-900 text-white pt-28 pb-12 md:pt-40 lg:pt-48 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-10" alt="Office" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 to-brand-900"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl 3xl:text-7xl font-serif font-bold mb-4 md:mb-6 tracking-tight animate-fade-in-up">
            Реестр экспертных услуг
          </h1>
          <p className="text-sm xs:text-base md:text-xl lg:text-2xl text-slate-300 max-w-2xl lg:max-w-4xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Полный перечень компетенций Бюро «Советникъ». Выберите направление или воспользуйтесь поиском.
          </p>
        </div>
      </div>

      <div className="sticky top-[60px] md:top-[80px] z-30 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 py-3 md:py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 lg:gap-10">

            <div className="relative group overflow-hidden">
              <div className="flex items-center overflow-x-auto no-scrollbar gap-2 pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`flex items-center px-4 py-2 md:px-5 md:py-2.5 rounded-full border transition-all duration-200 whitespace-nowrap text-[12px] md:text-sm font-bold flex-shrink-0 ${activeCategory === 'all'
                    ? 'bg-brand-900 text-white border-brand-900 shadow-lg'
                    : 'bg-white text-slate-600 border-gray-200 hover:border-brand-300'
                    }`}
                >
                  <LayoutGrid size={16} className="mr-2" />
                  Все услуги
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`flex items-center px-4 py-2 md:px-5 md:py-2.5 rounded-full border transition-all duration-200 whitespace-nowrap text-[12px] md:text-sm font-bold flex-shrink-0 ${activeCategory === cat.slug
                      ? 'bg-brand-red text-white border-brand-red shadow-lg'
                      : 'bg-white text-slate-600 border-gray-200 hover:border-brand-red/30'
                      }`}
                  >
                    <cat.icon size={16} className="mr-2" />
                    {cat.title}
                  </button>
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent md:hidden pointer-events-none"></div>
            </div>

            <div className="relative w-full md:w-64 lg:w-96 shrink-0">
              <input
                type="text"
                placeholder="Найти услугу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 md:py-2.5 bg-slate-100 border border-transparent focus:bg-white focus:border-brand-gold rounded-lg text-sm transition-all outline-none text-brand-900 placeholder:text-slate-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-red"
                >
                  <X size={14} />
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-16 lg:py-24 min-h-[60vh]">

        {filteredData.length > 0 ? (
          <div className="space-y-12 md:space-y-20 lg:space-y-32">
            {filteredData.map((group) => {
              const { category, services } = group;
              const showRegionalSplit = category.slug === 'valuation';
              const rfServices = showRegionalSplit ? services.filter(s => s.region === 'РФ') : services;
              const rbServices = showRegionalSplit ? services.filter(s => s.region === 'Башкортостан') : [];

              return (
                <div key={category.slug} className="animate-fade-in-up">
                  <div className="flex items-center mb-6 md:mb-10 pb-4 border-b border-gray-200">
                    <div className="hidden md:flex w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl shadow-sm border border-gray-100 items-center justify-center text-brand-900 mr-5 shrink-0">
                      <category.icon size={26} />
                    </div>
                    <div>
                      <h2 className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-brand-900 flex items-center">
                        <category.icon size={20} className="md:hidden mr-3 text-brand-red" />
                        {category.title}
                      </h2>
                      {!searchQuery && (
                        <p className="text-slate-500 text-xs md:text-sm lg:text-lg mt-1 max-w-2xl line-clamp-2">
                          {category.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-8 md:space-y-12">
                    {rfServices.length > 0 && (
                      <div>
                        {showRegionalSplit && (
                          <div className="flex items-center gap-2 mb-4 md:mb-6">
                            <span className="px-3 py-1 rounded bg-brand-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider">
                              Федеральные (РФ)
                            </span>
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                          {rfServices.map(service => (
                            <ServiceCard
                              key={service.id}
                              {...service}
                              description={service.shortDesc}
                              price={service.priceStart}
                              time={service.duration}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {rbServices.length > 0 && (
                      <div className="bg-brand-50/50 p-5 md:p-10 rounded-2xl md:rounded-[2rem] border border-brand-100/50">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 md:mb-8">
                          <div className="flex items-center gap-2">
                            <MapPin className="text-brand-red" size={20} />
                            <h3 className="font-bold text-brand-900 text-base md:text-xl">Услуги по Республике Башкортостан</h3>
                          </div>
                          <span className="text-slate-400 text-xs md:text-sm md:ml-2">
                            (Требуется выезд эксперта)
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                          {rbServices.map(service => (
                            <ServiceCard
                              key={service.id}
                              {...service}
                              description={service.shortDesc}
                              price={service.priceStart}
                              time={service.duration}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
              <Search size={32} />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900 mb-2">Ничего не найдено</h3>
            <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto mb-8">
              По запросу "{searchQuery}" услуг не найдено. Попробуйте изменить запрос или выберите другую категорию.
            </p>
            <Button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} variant="outline">
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl 3xl:max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 bg-brand-light rounded-full mb-6 md:mb-8">
              <HelpCircle size={32} className="text-brand-900 md:w-10 md:h-10" />
            </div>
            <h2 className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl font-serif font-bold text-brand-900 mb-4 md:mb-6">
              Не нашли нужную услугу?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-8 md:mb-12 leading-relaxed font-light">
              Часто задачи требуют индивидуального подхода и комбинации нескольких видов экспертиз.
              Свяжитесь с нами — мы сформируем стратегию под ваш случай.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button to="/contacts" size="lg" className="shadow-xl py-4 md:py-5 px-10 md:px-14">Связаться с экспертом</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug);
  const otherServices = SERVICES.filter(s => s.slug !== slug && s.categorySlug === service?.categorySlug).slice(0, 3);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-3xl font-serif font-bold mb-4 text-brand-900">Услуга не найдена</h2>
        <Button to="/services">Вернуться в каталог</Button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <SEO
        title={service.title}
        description={service.shortDesc}
        image={service.heroImage}
        url={`/services/${slug}`}
        schema={{
          "@type": "Service",
          "serviceType": service.title,
          "provider": {
            "@type": "ProfessionalService",
            "name": "Советникъ"
          },
          "areaServed": service.region,
          "offers": {
            "@type": "Offer",
            "price": service.priceStart.replace(/\D/g, ''),
            "priceCurrency": "RUB"
          }
        }}
      />
      <div className="bg-brand-900 text-white pt-28 pb-16 md:py-32 lg:py-48 4xl:py-64 relative overflow-hidden md:pt-48">
        <div className="absolute inset-0">
          <img
            src={service.heroImage || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop"}
            alt={service.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl 3xl:max-w-6xl animate-fade-in-up">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] md:text-xs lg:text-sm text-gray-400 mb-4 md:mb-8 uppercase tracking-wider font-semibold">
              <Link to="/" className="hover:text-white transition-colors">Главная</Link>
              <ChevronRight size={10} />
              <Link to="/services" className="hover:text-white transition-colors">Услуги</Link>
              <ChevronRight size={10} />
              <span className={`px-2 py-0.5 rounded text-[9px] md:text-[10px] ${service.region === 'РФ' ? 'bg-brand-700 text-white' : 'bg-brand-red text-white'}`}>
                {service.region}
              </span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl 4xl:text-9xl font-serif font-black mb-4 md:mb-8 leading-tight text-white">
              {service.title}
            </h1>
            <p className="text-base xs:text-lg md:text-2xl lg:text-3xl text-gray-300 mb-8 md:mb-12 max-w-2xl lg:max-w-4xl leading-relaxed font-light border-l-4 border-brand-red pl-4 md:pl-6">
              {service.shortDesc}
            </p>

            <div className="hidden md:flex flex-col sm:flex-row gap-5">
              <Button size="lg" to="/contacts" className="w-full sm:w-auto text-lg px-10 py-4 shadow-xl">Заказать экспертизу</Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto !text-white !border-slate-600 hover:!bg-white hover:!text-brand-900" to="/price">Скачать прайс</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden px-4 -mt-10 relative z-20 mb-8">
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-5 xs:p-6 animate-fade-in-up">
          <h3 className="text-base xs:text-lg font-bold text-brand-900 mb-4 border-b border-gray-100 pb-2">Условия</h3>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Стоимость</div>
              <div className="text-lg xs:text-xl font-serif font-black text-brand-red">{service.priceStart}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Срок</div>
              <div className="text-base xs:text-lg font-bold text-brand-900 flex items-center">
                <Clock size={16} className="mr-1 text-brand-gold" />
                {service.duration}
              </div>
            </div>
          </div>
          <Button to="/contacts" className="w-full justify-center shadow-lg py-3 text-sm">
            Заказать расчет
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-16 md:py-24 lg:py-32 3xl:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 3xl:gap-24">

          <div className="lg:col-span-8 space-y-12 md:space-y-20 lg:space-y-32">

            <section className="prose prose-base md:prose-lg lg:prose-xl 3xl:prose-2xl text-slate-600 max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-brand-900">
              <h2 className="text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl mb-4 md:mb-8">Суть услуги</h2>
              {service.longDescription || <p className="leading-relaxed">{service.fullDesc}</p>}
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl font-serif font-bold text-brand-900 mb-6 md:mb-10 flex items-center">
                <Briefcase className="mr-3 md:mr-5 text-brand-red md:w-8 md:h-8" size={24} />
                Задачи, которые мы решаем
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
                {service.tasks.map((task, i) => (
                  <div key={i} className="flex items-start p-4 md:p-6 lg:p-8 bg-slate-50 rounded-xl md:rounded-2xl border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300">
                    <CheckCircle2 className="text-brand-red mr-3 md:mr-4 shrink-0 mt-1" size={18} />
                    <span className="font-medium text-brand-900 text-sm xs:text-base md:text-lg 3xl:text-xl leading-snug">{task}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-brand-900 text-white p-6 xs:p-8 md:p-12 lg:p-16 rounded-2xl md:rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
              <h2 className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-6 md:mb-10 flex items-center relative z-10">
                <HelpCircle className="mr-3 md:mr-5 text-brand-gold md:w-8 md:h-8" size={24} />
                Вопросы на разрешение эксперту
              </h2>
              <div className="space-y-5 md:space-y-8 relative z-10">
                {service.questions.map((q, i) => (
                  <div key={i} className="flex gap-3 xs:gap-5 items-start">
                    <span className="bg-brand-800 text-brand-gold font-bold w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shrink-0 text-xs md:text-base shadow-inner border border-brand-700 font-serif">{i + 1}</span>
                    <p className="text-sm xs:text-base md:text-lg lg:text-xl 3xl:text-2xl leading-relaxed text-gray-200 font-light">{q}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-brand-900 mb-6 md:mb-10 flex items-center">
                <FileCheck className="mr-3 md:mr-5 text-brand-red md:w-8 md:h-8" size={24} />
                Необходимые документы
              </h2>
              <div className="bg-white border border-gray-100 rounded-xl md:rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
                {service.documents.map((doc, i) => (
                  <div key={i} className="p-4 xs:p-5 md:p-8 flex items-start hover:bg-slate-50 transition-colors group">
                    <FileText className="text-slate-300 group-hover:text-brand-red mr-4 shrink-0 mt-1 md:w-6 md:h-6" size={20} />
                    <span className="text-sm xs:text-base md:text-lg lg:text-xl 3xl:text-2xl text-slate-700 font-medium">{doc}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="lg:col-span-4 space-y-8 md:space-y-12">
            <div className="lg:sticky lg:top-36 space-y-8 md:space-y-12">

              <div className="hidden md:block bg-white p-8 lg:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-125 duration-500"></div>

                <div className="relative z-10">
                  <h3 className="text-xl lg:text-2xl font-bold text-brand-900 mb-8 pb-4 border-b border-gray-100">Стоимость и сроки</h3>

                  <div className="space-y-8 mb-10">
                    <div>
                      <div className="text-[10px] lg:text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Стоимость услуги</div>
                      <div className="text-3xl lg:text-4xl 3xl:text-5xl font-serif font-black text-brand-red">{service.priceStart}</div>
                      <div className="text-[10px] lg:text-xs text-slate-400 mt-1 font-medium uppercase">начальная цена</div>
                    </div>
                    <div>
                      <div className="text-[10px] lg:text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Срок выполнения</div>
                      <div className="text-2xl lg:text-3xl font-bold text-brand-900 flex items-center">
                        <Clock size={24} className="mr-2 text-brand-gold lg:w-7 lg:h-7" />
                        {service.duration}
                      </div>
                    </div>
                  </div>

                  <Button to="/contacts" className="w-full justify-center text-lg py-5 shadow-xl">
                    Заказать расчет
                  </Button>
                  <p className="text-center text-[10px] lg:text-xs text-gray-400 mt-5">
                    Расчет стоимости бесплатно в течение 1 часа
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-transparent">
                <h3 className="font-bold text-brand-900 mb-6 text-lg lg:text-xl">Также в этом разделе</h3>
                <nav className="space-y-3 md:space-y-4">
                  {otherServices.map(s => (
                    <Link key={s.id} to={`/services/${s.slug}`} className="block group">
                      <div className="p-4 bg-white border border-gray-200 rounded-xl group-hover:border-brand-gold/50 group-hover:shadow-md transition-all duration-300 flex justify-between items-center">
                        <span className="text-xs xs:text-sm lg:text-base font-bold text-slate-600 group-hover:text-brand-900 leading-snug">{s.title}</span>
                        <ArrowRight size={16} className="text-gray-300 group-hover:text-brand-gold transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 duration-300" />
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="bg-brand-900 rounded-2xl md:rounded-3xl p-8 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <p className="font-serif font-bold text-lg md:text-xl mb-2 relative z-10">Остались вопросы?</p>
                <p className="text-xs lg:text-sm text-slate-400 mb-6 relative z-10">Позвоните нам, и дежурный эксперт проконсультирует вас прямо сейчас.</p>
                <a href="tel:+79991234567" className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-gold hover:text-white transition-colors block relative z-10 font-serif">
                  +7 (999) 123-45-67
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
