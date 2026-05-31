import React from 'react';
import { Link } from 'react-router-dom';
import { CITIES, SERVICES } from '../data/constants';
import { SectionHeader } from './Components';
import { MapPin, ArrowRight, Grid } from 'lucide-react';

interface RegionalInterlinkingProps {
    currentServiceSlug?: string;
    currentCitySlug?: string;
    currentCategorySlug?: string;
}

export const RegionalInterlinking: React.FC<RegionalInterlinkingProps> = ({
    currentServiceSlug,
    currentCitySlug,
    currentCategorySlug
}) => {
    // 1. Other cities for the SAME service
    const otherCities = CITIES.filter(c => c.slug !== currentCitySlug);
    
    // 2. Other services in the SAME city
    const sameCityServices = currentCitySlug 
        ? SERVICES.filter(s => s.slug !== currentServiceSlug && (currentCategorySlug ? s.categorySlug === currentCategorySlug : true)).slice(0, 8)
        : [];

    return (
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 md:px-6">
                
                {/* Block 1: Same Service in Other Cities (Horizontal Interlinking) */}
                {currentServiceSlug && (
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-brand-900 text-brand-gold rounded-xl flex items-center justify-center shadow-lg">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900">Федеральный охват</h3>
                                <p className="text-sm text-slate-500">Услуга доступна во всех крупнейших городах России</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                            {CITIES.map(city => (
                                <Link
                                    key={city.slug}
                                    to={`/services/${currentServiceSlug}/${city.slug}`}
                                    className={`px-4 py-3 rounded-xl text-center text-xs md:text-sm font-medium transition-all border ${
                                        city.slug === currentCitySlug 
                                        ? 'bg-brand-red text-white border-brand-red shadow-md font-bold' 
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-brand-gold hover:text-brand-900 hover:shadow-md'
                                    }`}
                                >
                                    {city.name}
                                </Link>
                            ))}
                            <Link
                                to={`/services/${currentServiceSlug}`}
                                className={`px-4 py-3 rounded-xl text-center text-xs md:text-sm font-medium transition-all border ${
                                    !currentCitySlug 
                                    ? 'bg-brand-red text-white border-brand-red shadow-md font-bold' 
                                    : 'bg-white text-slate-600 border-slate-300 border-dashed hover:border-brand-red hover:text-brand-red'
                                }`}
                            >
                                Вся Россия
                            </Link>
                        </div>
                    </div>
                )}

                {/* Block 2: Other Services in This City (Vertical Interlinking) */}
                {currentCitySlug && sameCityServices.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-brand-red text-white rounded-xl flex items-center justify-center shadow-lg">
                                <Grid size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900">
                                    Другие услуги {CITIES.find(c => c.slug === currentCitySlug)?.nameIn}
                                </h3>
                                <p className="text-sm text-slate-500">Комплексная экспертиза и оценка в вашем регионе</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {sameCityServices.map(service => (
                                <Link
                                    key={service.id}
                                    to={`/services/${service.slug}/${currentCitySlug}`}
                                    className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-brand-gold hover:shadow-xl transition-all duration-300"
                                >
                                    <h4 className="text-sm font-serif font-bold text-brand-900 group-hover:text-brand-red transition-colors mb-2 leading-tight">
                                        {service.title}
                                    </h4>
                                    <div className="flex items-center text-brand-red text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Подробнее <ArrowRight size={12} className="ml-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
