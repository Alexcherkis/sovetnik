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
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost' | 'outline-white';
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
    "outline-white": "border-2 border-white/30 text-white hover:bg-white hover:text-brand-900 focus:ring-white",
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
  className?: string;
}> = ({ title, subtitle, centered = true, light = false, className = '' }) => (
  <div className={`mb-10 md:mb-16 ${centered ? 'text-center' : 'text-left'} ${className}`}>
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
// Feature/Service Card (PREMIUM REDESIGN - CLEAN VARIANT)
export const ServiceCard: React.FC<{
  title: string;
  description: string;
  price: string;
  time: string;
  icon: LucideIcon;
  slug: string;
  region?: string;
}> = ({ title, description, icon: Icon, slug }) => (
  <Link
    to={`/services/${slug}`}
    className="group relative bg-white rounded-2xl shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col h-full hover:-translate-y-2 p-8"
  >
    {/* Clean Top Gradient (Optional, very subtle) */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 to-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Icon */}
    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 text-brand-900 group-hover:bg-brand-900 group-hover:text-brand-gold transition-colors duration-300">
      <Icon className="w-6 h-6" strokeWidth={1.5} />
    </div>

    <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900 mb-3 leading-tight pr-4 group-hover:text-brand-red transition-colors duration-300">
      {title}
    </h3>

    <p className="text-sm md:text-base text-slate-500 mb-8 leading-relaxed line-clamp-3">
      {description}
    </p>

    {/* 'Read More' Link - Simple and Clean */}
    <div className="mt-auto flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-brand-red transition-colors duration-300">
      ПОДРОБНЕЕ <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
    </div>
  </Link>
);

// Accordion Item
export const AccordionItem: React.FC<{
  question: string;
  answer: React.ReactNode;
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
          <path d="M6 9L12 15L18 9" />
        </svg>
      </span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div className="px-6 pb-8 pt-0 text-sm md:text-base text-slate-600 leading-relaxed w-full">
        {answer}
      </div>
    </div>
  </div>
);

// --- NEW: Trust Badge (For Direct & Conversion) ---
export const TrustBadge: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`bg-white border-2 border-brand-gold/20 rounded-2xl p-6 shadow-xl shadow-brand-gold/5 relative overflow-hidden group hover:border-brand-gold/40 transition-all duration-500 ${className}`}>
    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
    
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-900 shrink-0">
          <Banknote size={20} className="text-[#B8860B]" />
        </div>
        <div className="text-sm font-serif font-bold text-brand-900 leading-tight italic">
          Легитимность <br/> подтверждена
        </div>
      </div>

      <ul className="space-y-4">
        {[
          "Члены СРО оценщиков и экспертов",
          "Страхование ответственности на 100 млн ₽",
          "Соответствие ФСО и ФЗ-73",
          "Аккредитация в судах и ТОП-бенках"
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <svg className="w-4 h-4 text-[#B8860B] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[11px] md:text-xs text-slate-600 font-medium leading-relaxed uppercase tracking-wider">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-6 border-t border-brand-gold/10 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Опыт бюро</span>
          <span className="text-lg font-serif font-black text-brand-900 tracking-tight">15 ЛЕТ +</span>
        </div>
        <div className="bg-[#B8860B] text-white p-2 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-md">
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
             <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
           </svg>
        </div>
      </div>
    </div>
  </div>
);