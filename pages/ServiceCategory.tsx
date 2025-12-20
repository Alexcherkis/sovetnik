import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES, SERVICE_CATEGORIES } from '../constants';
import { Button, ServiceCard, SectionHeader } from '../components/Components';
import { CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { NotFound } from './NotFound';

import { SEO } from '../components/SEO';

export const ServiceCategoryLanding: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const categoryData = SERVICE_CATEGORIES[categorySlug || ''];

  if (!categoryData) {
    return <NotFound />;
  }

  // Filter services for this category
  const services = SERVICES.filter(s => s.categorySlug === categorySlug);

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={categoryData.title}
        description={`Профессиональная ${categoryData.title.toLowerCase()} от бюро "Советникъ". ${categoryData.subtitle}`}
        image={categoryData.heroImage}
        url={`/services/category/${categorySlug}`}
      />

      {/* 1. Category Hero */}
      {/* Increased padding-top to pt-32 md:pt-48 to avoid header overlap */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center overflow-hidden pt-32 md:pt-48 pb-16">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={categoryData.heroImage}
            alt={categoryData.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-brand-950/50"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 z-10 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
              <categoryData.icon size={14} /> <span>Направление деятельности</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {categoryData.title}
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {categoryData.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" to="/contacts" className="shadow-xl shadow-brand-red/20 px-10">
                Заказать экспертизу
              </Button>
              <Button size="lg" variant="outline" className="text-white border-slate-500 hover:bg-white hover:text-brand-900" onClick={() => {
                document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Выбрать услугу
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro & Benefits (Why Us for this category) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            <div className="order-2 lg:order-1">
              <SectionHeader title={`Почему выбирают нас для ${categoryData.title.toLowerCase()}?`} subtitle="" centered={false} />
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {categoryData.description}
              </p>

              <div className="space-y-6">
                {categoryData.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-red/30 transition-colors">
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

            <div className="order-1 lg:order-2 relative">
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

      {/* 3. Service Grid (The Spoke Content) */}
      <section id="services-grid" className="py-16 md:py-24 bg-brand-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <SectionHeader title="Услуги направления" subtitle="Выберите необходимый вид исследования" centered={false} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
            {services.map(service => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDesc}
                price={service.priceStart}
                time={service.duration}
                icon={service.icon}
                slug={service.slug}
                region={service.region}
              />
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              В данном разделе пока нет услуг. Свяжитесь с нами для уточнения.
            </div>
          )}
        </div>
      </section>

      {/* 4. Cross-Navigation (Don't trap the user) */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="text-2xl font-serif font-bold text-brand-900 mb-8">Другие направления</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(SERVICE_CATEGORIES).filter(cat => cat.slug !== categorySlug).map(cat => (
              <Link key={cat.slug} to={`/services/category/${cat.slug}`} className="group block bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-900 shadow-sm">
                    <cat.icon size={20} />
                  </div>
                  <ArrowRight className="text-gray-300 group-hover:text-brand-red transition-colors" />
                </div>
                <h4 className="font-bold text-lg text-brand-900 mb-2 group-hover:text-brand-red transition-colors">{cat.title}</h4>
                <p className="text-sm text-slate-500 line-clamp-2">{cat.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};