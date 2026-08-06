import React from 'react';
import { Button } from './Components';
import { Phone, ArrowRight } from 'lucide-react';

export const BlogCTA = ({ title, text, link, buttonText }: any) => {
  return (
    <div className="my-8 p-6 bg-brand-900 text-white rounded-xl shadow-lg border border-brand-800 relative overflow-hidden not-prose">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red rounded-bl-full opacity-20 -mr-10 -mt-10"></div>
      <div className="relative z-10">
        <h4 className="text-xl font-bold mb-2 font-serif text-brand-gold">{title || "Нужна консультация юриста?"}</h4>
        <p className="mb-4 text-gray-300">{text || "Оставьте заявку, и наши специалисты свяжутся с вами в течение 15 минут для бесплатного анализа вашей ситуации."}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button to={link || "/contact"} variant="primary" className="bg-brand-red hover:bg-red-700 text-white border-none group">
            {buttonText || "Получить консультацию"} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <a href="tel:+78000000000" className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-all text-white border border-gray-600 hover:bg-gray-800">
            <Phone size={16} className="mr-2" /> Позвонить
          </a>
        </div>
      </div>
    </div>
  );
};
