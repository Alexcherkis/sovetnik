import React, { useState, useEffect, useRef } from 'react';
import { LucideIcon, ArrowRight, Clock, Banknote, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- NEW: Animated Counter Component ---
export const CountUp: React.FC<{ end: number; duration?: number; suffix?: string; prefix?: string }> = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      
      // Ease out quart styling
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
      
      const currentCount = Math.min(
        Math.floor(easeOutQuart(progress / duration) * end),
        end
      );

      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

// --- UPDATED: Scroll Down Indicator (Relative flow) ---
export const ScrollDownIndicator: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex flex-col items-center gap-2 animate-bounce text-white/50 cursor-pointer pointer-events-none md:pointer-events-auto ${className}`}>
    <span className="text-[10px] uppercase tracking-[0.2em]">Листайте вниз</span>
    <ChevronDown size={20} />
  </div>
);

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  to,
  className = '',
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] tracking-wide relative overflow-hidden group";
  
  const variants = {
    primary: "bg-brand-red hover:bg-red-800 text-white shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 focus:ring-red-500",
    secondary: "bg-brand-900 hover:bg-brand-800 text-white shadow-lg hover:shadow-xl focus:ring-brand-700",
    outline: "border-2 border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white focus:ring-brand-700",
    white: "bg-white text-brand-900 hover:bg-gray-50 shadow-md hover:shadow-lg",
    ghost: "bg-transparent text-brand-900 hover:bg-brand-50",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

  // Inner span for subtle shine effect on hover
  const content = (
    <>
      <span className="relative z-10 flex items-center">{children}</span>
      {variant === 'primary' && <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-red-800/20"></div>}
    </>
  );

  if (to) {
    return <Link to={to} className={classes}>{content}</Link>;
  }

  return <button className={classes} {...props}>{content}</button>;
};

// Section Header Component
export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}> = ({ title, subtitle, centered = true, light = false }) => (
  <div className={`mb-10 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight tracking-tight ${light ? 'text-white' : 'text-brand-900'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-light ${light ? 'text-gray-300' : 'text-slate-600'}`}>
        {subtitle}
      </p>
    )}
    <div className={`h-1 w-16 md:w-24 bg-gradient-to-r from-brand-red to-brand-gold mt-6 rounded-full ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

// Feature/Service Card (PREMIUM REDESIGN)
export const ServiceCard: React.FC<{
  title: string;
  description: string;
  price: string;
  time: string;
  icon: LucideIcon;
  slug: string;
  region?: string;
}> = ({ title, description, price, time, icon: Icon, slug, region }) => (
  <Link 
    to={`/services/${slug}`}
    className="group relative bg-white rounded-2xl shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col h-full hover:-translate-y-2"
  >
    {/* Top colored accent line */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 to-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="p-6 md:p-8 flex-grow relative z-10">
      
      {/* Region Badge */}
      {region && (
        <span className={`absolute top-6 right-6 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm transition-colors duration-300 ${
          region === 'РФ' 
            ? 'bg-slate-100 text-slate-600 group-hover:bg-brand-900 group-hover:text-white' 
            : 'bg-red-50 text-brand-red group-hover:bg-brand-red group-hover:text-white'
        }`}>
          {region}
        </span>
      )}

      {/* Icon Container */}
      <div className="w-14 h-14 bg-white border border-gray-100 rounded-xl flex items-center justify-center mb-6 text-brand-900 shadow-sm group-hover:scale-110 group-hover:border-brand-gold/30 group-hover:shadow-md transition-all duration-300">
        <Icon className="w-7 h-7" strokeWidth={1.5} />
      </div>

      <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900 mb-3 leading-tight pr-4 group-hover:text-brand-red transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-sm md:text-base text-slate-500 mb-6 leading-relaxed line-clamp-3">
        {description}
      </p>
      
      {/* Info Grid - Clean & Readable */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 flex items-center gap-1">
             <Banknote size={12} /> Стоимость
          </span>
          <span className="font-bold text-brand-900 text-base">{price}</span>
        </div>
        <div className="flex flex-col border-l border-gray-100 pl-4">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 flex items-center gap-1">
             <Clock size={12} /> Сроки
          </span>
          <span className="font-medium text-slate-700 text-base">{time}</span>
        </div>
      </div>
    </div>

    {/* Hover Action Footer */}
    <div className="px-6 py-4 bg-gray-50/50 group-hover:bg-brand-900 transition-colors duration-500 flex justify-between items-center relative overflow-hidden">
       {/* Abstract gloss effect */}
       <div className="absolute top-0 left-0 w-full h-full bg-white/10 skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
       
       <span className="text-xs font-bold uppercase tracking-widest text-brand-red group-hover:text-white transition-colors">
         Подробнее об услуге
       </span>
       <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-900 shadow-sm transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <ArrowRight size={14} />
       </div>
    </div>
  </Link>
);

// Accordion Item
export const AccordionItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}> = ({ question, answer, isOpen, onClick }) => (
  <div className={`border-b border-gray-100 last:border-0 transition-colors duration-300 ${isOpen ? 'bg-brand-50/30' : 'bg-transparent'}`}>
    <button
      className="w-full py-5 px-6 flex justify-between items-center text-left focus:outline-none group"
      onClick={onClick}
    >
      <span className={`text-base md:text-lg font-serif font-semibold pr-6 leading-snug transition-colors ${isOpen ? 'text-brand-red' : 'text-brand-900 group-hover:text-brand-red'}`}>
        {question}
      </span>
      <span className={`transform transition-transform duration-300 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isOpen ? 'rotate-180 bg-brand-red text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-brand-red/10 group-hover:text-brand-red'}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9L12 15L18 9"/>
        </svg>
      </span>
    </button>
    <div 
      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div className="px-6 pb-8 pt-0 text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl">
        {answer}
      </div>
    </div>
  </div>
);