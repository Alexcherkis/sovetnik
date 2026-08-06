import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, ChevronRight, Send, Search, ArrowUp, Cookie, ArrowUpRight, Clock, Shield, ShieldCheck, FileCheck } from 'lucide-react';
import { NAV_ITEMS } from '../data/constants';
import { Button } from './Components';
import { SearchModal } from './Search';
import { SpeedDial } from './SpeedDial';
import { YANDEX_METRICA_ID } from '../config/analytics';
import { ANALYTICS_ENABLED, COMPANY_INN, COMPANY_LEGAL_NAME, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164, LOGO_URL, SITE_NAME, SOCIAL_TELEGRAM_URL, SOCIAL_WHATSAPP_URL } from '../config/site';



// --- COMPONENT: Navbar ---
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setExpandedItem(null);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isHomePage = location.pathname === '/';
  const isClone = import.meta.env.MODE === 'clone';
  // In clone mode the home hero is light, so the navbar must be in "scrolled" style immediately.
  const isScrolledOrNotHome = isClone ? true : (scrolled || !isHomePage || isOpen);

  const navBgClass = isScrolledOrNotHome
    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 py-2 md:py-2'
    : 'bg-transparent py-3 md:py-3 border-b border-white/10';

  const positionClass = isHomePage ? 'fixed' : 'sticky';
  const textClass = isScrolledOrNotHome ? 'text-brand-900' : 'text-white';
  const logoMainColor = isScrolledOrNotHome ? 'text-brand-900' : 'text-white';
  const logoSubColor = isScrolledOrNotHome ? 'text-brand-700' : 'text-gray-300';
  const menuBtnColor = isScrolledOrNotHome ? 'text-brand-900 hover:bg-gray-100' : 'text-white hover:bg-white/10';
  const searchBtnColor = isScrolledOrNotHome ? 'text-brand-900 hover:text-brand-red' : 'text-white hover:text-brand-gold';

  const toggleAccordion = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <header className={`${positionClass} w-full z-50 transition-all duration-300 top-0 ${navBgClass}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">

            <Link to="/" className="flex flex-col items-start group relative z-50" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-3">
                {isClone && (
                  <span className="inline-flex items-center justify-center rounded-xl bg-white/90 border border-slate-200 p-1 shadow-sm">
                    <img
                      src={LOGO_URL}
                      alt={SITE_NAME}
                      className="w-8 h-8 md:w-9 md:h-9 object-contain"
                      loading="eager"
                      decoding="async"
                    />
                  </span>
                )}
                <span className={`text-xl md:text-2xl font-serif font-bold tracking-wide transition-colors ${logoMainColor}`}>
                  {SITE_NAME}
                </span>
              </div>
              {!isClone && (
                <span className={`text-[10px] uppercase tracking-[0.2em] font-medium hidden sm:block ${logoSubColor}`}>
                  Экспертное бюро
                </span>
              )}
            </Link>

            <nav className="hidden lg:flex items-center lg:space-x-3 xl:space-x-6">
              {NAV_ITEMS.map((item) => (
                <div key={item.path} className="relative group h-full py-1">
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      if (item.path === '#') {
                        e.preventDefault();
                        return;
                      }
                      if (item.path === '#open-modal') {
                        e.preventDefault();
                        const event = new CustomEvent('openContactModal', { detail: { service: 'Меню: Контакты' } });
                        window.dispatchEvent(event);
                      }
                    }}
                    className={`text-sm font-bold uppercase tracking-wider transition-all flex items-center relative whitespace-nowrap ${isActive(item.path) ? 'text-brand-gold' : textClass
                      } hover:text-brand-gold ${item.path === '#' ? 'cursor-default' : ''}`}
                  >
                    {item.label}
                    {item.subItems && <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform" />}
                  </Link>

                  {item.subItems && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-72">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-2 ring-1 ring-black ring-opacity-5">
                        <div className="relative bg-white z-10">
                          {item.subItems.map(sub => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className={`block px-6 py-3 text-[15px] transition-colors border-l-4 font-medium ${isActive(sub.path)
                                ? 'bg-brand-50 text-brand-gold border-brand-gold'
                                : 'text-gray-700 hover:bg-brand-50 hover:text-brand-gold border-transparent hover:border-brand-gold'
                                }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 z-50">
              {!isClone && (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={`p-2 transition-colors duration-300 focus:outline-none ${searchBtnColor}`}
                  aria-label="Поиск"
                >
                  <Search size={22} />
                </button>
              )}

              {/* Иконки связи для мобильных (скрыты на десктопе, там текст) */}
              <div className="flex items-center xl:hidden">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className={`p-2 transition-colors duration-300 focus:outline-none ${searchBtnColor}`}
                  aria-label="Написать на почту"
                  onClick={() => typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_email')}
                >
                  <Mail size={22} />
                </a>
                <a
                  href={`tel:${CONTACT_PHONE_E164}`}
                  className={`p-2 transition-colors duration-300 focus:outline-none ${searchBtnColor}`}
                  aria-label="Позвонить"
                  onClick={() => typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_phone')}
                >
                  <Phone size={22} />
                </a>
              </div>

              <div className={`hidden xl:flex flex-col items-end justify-center ${textClass}`}>
                <a
                  href={`tel:${CONTACT_PHONE_E164}`}
                  className="font-bold text-lg leading-none hover:text-brand-gold transition-colors whitespace-nowrap font-serif"
                  onClick={() => typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_phone')}
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <div className="flex items-center gap-2 mt-1.5 opacity-90 hover:opacity-100 transition-opacity">
                  <Mail size={12} className={isScrolledOrNotHome ? "text-brand-700" : "text-white/70"} />
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-[12px] tracking-wide hover:text-brand-gold transition-colors"
                    onClick={() => typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_email')}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              {!isClone && (
                <Button
                  onClick={() => {
                    const event = new CustomEvent('openContactModal', { detail: { service: 'Консультация (шапка)' } });
                    window.dispatchEvent(event);
                  }}
                  variant={isScrolledOrNotHome ? 'primary' : 'white'}
                  size="sm"
                  className="hidden lg:inline-flex shadow-lg"
                >
                  Консультация
                </Button>
              )}

              <button
                className={`lg:hidden p-2 rounded-md transition-colors focus:outline-none ${menuBtnColor}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`lg:hidden fixed inset-0 bg-white z-[60] transition-transform duration-300 ease-in-out flex flex-col pt-[80px] will-change-transform overscroll-contain ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex-1 overflow-y-auto">
          <nav className="py-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.path} className="border-b border-gray-50 last:border-0">
                {item.subItems ? (
                  <div className="flex flex-col">
                    <button
                      onClick={() => toggleAccordion(item.label)}
                      className="flex justify-between items-center w-full px-6 py-4 active:bg-gray-50 transition-colors text-left"
                    >
                      <span className={`text-lg font-serif font-bold ${expandedItem === item.label || isActive(item.path) ? 'text-brand-red' : 'text-brand-900'}`}>
                        {item.label}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform duration-300 ${expandedItem === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 bg-gray-50/50 ${expandedItem === item.label ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="py-2">
                        {item.subItems.map(sub => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={`flex items-center py-3 pl-10 pr-6 text-base transition-colors border-l-2 ml-6 mb-1 ${isActive(sub.path) ? 'text-brand-red border-brand-red font-bold' : 'text-slate-600 border-transparent'
                                }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex justify-between items-center px-6 py-4 active:bg-gray-50 transition-colors ${isActive(item.path) ? 'bg-brand-50' : ''}`}
                    onClick={(e) => {
                      if (item.path === '#open-modal') {
                        e.preventDefault();
                        const event = new CustomEvent('openContactModal', { detail: { service: 'Мобильное меню: Контакты' } });
                        window.dispatchEvent(event);
                      }
                      setIsOpen(false);
                    }}
                  >
                    <span className={`text-lg font-serif font-bold ${isActive(item.path) ? 'text-brand-red' : 'text-brand-900'}`}>{item.label}</span>
                    <ChevronRight size={20} className={isActive(item.path) ? 'text-brand-red' : 'text-gray-300'} />
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white shrink-0 pb-10 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-10">
          {!isClone && (
            <Button
              onClick={() => {
                const event = new CustomEvent('openContactModal', { detail: { service: 'Заявка из мобильного меню' } });
                window.dispatchEvent(event);
                setIsOpen(false);
              }}
              className="w-full justify-center py-4 text-base font-bold shadow-lg shadow-brand-red/10 mb-6"
            >
              Оставить заявку
            </Button>
          )}

          <div className="flex flex-col gap-4 px-2">
            <div className="flex justify-between items-center">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex flex-col" onClick={() => typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_email')}>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Электронная почта</span>
                <span className="text-lg font-medium text-brand-900">{CONTACT_EMAIL}</span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 active:bg-gray-200 transition-colors" onClick={() => typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_email')}>
                <Mail size={22} />
              </a>
            </div>

            <div className="flex justify-between items-center">
              <a href={`tel:${CONTACT_PHONE_E164}`} className="flex flex-col" onClick={() => typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_phone')}>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Горячая линия</span>
                <span className="text-xl font-serif font-bold text-brand-900">{CONTACT_PHONE_DISPLAY}</span>
              </a>
              <a href={`tel:${CONTACT_PHONE_E164}`} className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-red active:bg-brand-red active:text-white transition-colors" onClick={() => typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_phone')}>
                <Phone size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ... keep Footer and Layout as they were ...
interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 md:border-none last:border-none">
      <h4 className="hidden md:block text-lg font-serif font-bold mb-6 text-white tracking-wide border-l-2 border-brand-gold pl-3">
        {title}
      </h4>
      <button
        className={`md:hidden flex items-center justify-between w-full py-4 text-left focus:outline-none transition-colors duration-300 ${isOpen ? 'text-brand-gold' : 'text-slate-300'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs font-bold uppercase tracking-[0.15em]">{title}</span>
        <ChevronDown
          size={14}
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-gold' : 'text-slate-500'}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          } md:max-h-none md:opacity-100 md:pb-0`}
      >
        {children}
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const isClone = import.meta.env.MODE === 'clone';
  const mapLink = "https://yandex.ru/maps/172/ufa/search/%D0%9B%D0%B5%D1%81%D0%BD%D0%BE%D0%B9%20%D0%BF%D1%80%D0%BE%D0%B5%D0%B7%D0%B4%208%2F3/";

  return (
    <footer className="bg-brand-950 text-white relative overflow-hidden border-t border-brand-800/20">
      {/* Architectural Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* 1. DESKTOP FOOTER (Restored Rich Layout) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pt-20 pb-12">
          {/* Column 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group mb-2">
              <span className="text-3xl font-serif font-bold tracking-tight text-white">
                {SITE_NAME}
              </span>
              {!isClone && (
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 mt-1 pl-1">Экспертное бюро</p>
              )}
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
              Традиции качества. Безупречная репутация. Профессионализм. Мы создаем доказательства, которые побеждают в суде.
            </p>
            {isClone && (
              <div className="text-xs text-slate-400 border border-white/10 rounded-xl p-4 bg-white/5">
                <div className="font-bold text-white mb-1">Реквизиты</div>
                <div>{COMPANY_LEGAL_NAME}</div>
                <div>ИНН: {COMPANY_INN}</div>
              </div>
            )}
            <div className="flex space-x-3 pt-2">
              {[
                ...(SOCIAL_TELEGRAM_URL ? [{ icon: Send, link: SOCIAL_TELEGRAM_URL, label: "Telegram" }] : []),
                ...(SOCIAL_WHATSAPP_URL ? [{ icon: Send, link: SOCIAL_WHATSAPP_URL, label: "WhatsApp" }] : []),
                { icon: Mail, link: `mailto:${CONTACT_EMAIL}`, label: "Email" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-gold transition-all duration-300 text-slate-400 hover:text-white border border-white/5 hover:scale-110"
                  onClick={() => {
                    if (!ANALYTICS_ENABLED) return;
                    if (item.link.startsWith('mailto:')) {
                      typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_email');
                    } else if (item.link.includes('t.me')) {
                      typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_tg');
                    }
                  }}
                >
                  <item.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Directions (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-serif font-bold text-white mb-6">Направления</h4>
            <ul className="space-y-4">
              <li><Link to="/services/category/financial" className="text-slate-400 hover:text-brand-gold transition-colors text-sm hover:translate-x-1 duration-200 inline-block">Финансы и Экономика</Link></li>
              <li><Link to="/services/category/construction" className="text-slate-400 hover:text-brand-gold transition-colors text-sm hover:translate-x-1 duration-200 inline-block">Строительство и Земля</Link></li>
              <li><Link to="/services/category/valuation" className="text-slate-400 hover:text-brand-gold transition-colors text-sm hover:translate-x-1 duration-200 inline-block">Оценка и Активы</Link></li>
              <li><Link to="/services/trademark-valuation" className="text-slate-500 hover:text-brand-gold transition-colors text-[11px] uppercase tracking-wider ml-4 block">— Товарные знаки</Link></li>
              <li><Link to="/services/patent-valuation" className="text-slate-500 hover:text-brand-gold transition-colors text-[11px] uppercase tracking-wider ml-4 block">— Патенты и ПО</Link></li>
              <li><Link to="/services/category/legal" className="text-slate-400 hover:text-brand-gold transition-colors text-sm hover:translate-x-1 duration-200 inline-block">Юридическая защита</Link></li>
              <li><Link to="/price" className="text-brand-gold font-bold text-xs uppercase tracking-widest hover:text-white transition-colors mt-2 inline-flex items-center">Все услуги <ArrowUpRight size={12} className="ml-1" /></Link></li>
            </ul>
          </div>

          {/* Column 3: Bureau (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-serif font-bold text-white mb-6">Бюро</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-400 hover:text-brand-gold transition-colors text-sm hover:translate-x-1 duration-200 inline-block">О компании</Link></li>
              <li><Link to="/price" className="text-slate-400 hover:text-brand-gold transition-colors text-sm hover:translate-x-1 duration-200 inline-block">Стоимость услуг</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-brand-gold transition-colors text-sm hover:translate-x-1 duration-200 inline-block">Блог экспертов</Link></li>
              <li><Link to="/#reviews" className="text-slate-400 hover:text-brand-gold transition-colors text-sm hover:translate-x-1 duration-200 inline-block">Отзывы</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-brand-gold transition-colors text-sm hover:translate-x-1 duration-200 inline-block">Вопрос-ответ</Link></li>
            </ul>
          </div>

          {/* Column 4: Contacts (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-serif font-bold text-white mb-6">Контакты</h4>
            <ul className="space-y-6">
              <li className="flex items-start">
                <MapPin className="shrink-0 text-brand-gold mr-4 mt-1" size={18} />
                <div className="flex flex-col">
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 text-sm leading-relaxed hover:text-brand-gold transition-colors"
                  >
                    г. Уфа, Лесной пр-д, д. 8/3<br />
                  </a>
                  <span className="text-brand-gold text-xs font-bold mt-2 uppercase tracking-wide">Работаем по всей России</span>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="shrink-0 text-brand-gold mr-4 mt-1" size={18} />
                <div className="flex flex-col">
                  <a href={`tel:${CONTACT_PHONE_E164}`} className="text-white font-bold text-lg hover:text-brand-gold transition-colors">{CONTACT_PHONE_DISPLAY}</a>
                  <span className="text-slate-500 text-xs mt-1">Ежедневно 09:00 — 20:00</span>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="shrink-0 text-brand-gold mr-4" size={18} />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-400 hover:text-white transition-colors text-sm" onClick={() => typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_email')}>{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. MOBILE FOOTER (Compact & Proportional - KEPT NEW) */}
          <div className="md:hidden lg:hidden col-span-1 space-y-6 pt-10">
          {/* Mobile Case: Mini Accordions */}
          <div className="space-y-3">
            <FooterColumn title="Направления">
              <ul className="space-y-1 py-2 px-1">
                <li><Link to="/services/category/financial" className="flex items-center justify-between text-slate-300 py-3 px-2 border-b border-white/5 text-[15px]">Финансы <ChevronRight size={16} className="text-white/20" /></Link></li>
                <li><Link to="/services/category/construction" className="flex items-center justify-between text-slate-300 py-3 px-2 border-b border-white/5 text-[15px]">Строительство <ChevronRight size={16} className="text-white/20" /></Link></li>
                <li><Link to="/services/category/valuation" className="flex items-center justify-between text-slate-300 py-3 px-2 border-b border-white/5 text-[15px]">Оценка <ChevronRight size={16} className="text-white/20" /></Link></li>
                <li><Link to="/services/category/legal" className="flex items-center justify-between text-slate-300 py-3 px-2 border-b border-white/5 text-[15px]">Юристы <ChevronRight size={16} className="text-white/20" /></Link></li>
                <li><Link to="/price" className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-widest py-4 px-2">Весь перечень услуг <ArrowUpRight size={14} /></Link></li>
              </ul>
            </FooterColumn>

            <FooterColumn title="Информация">
              <ul className="space-y-1 py-2 px-1">
                <li><Link to="/about" className="flex items-center py-3 px-2 border-b border-white/5 text-slate-300 text-[15px]">О бюро</Link></li>
                <li><Link to="/blog" className="flex items-center py-3 px-2 border-b border-white/5 text-slate-300 text-[15px]">Кейсы и статьи</Link></li>
                <li><Link to="/faq" className="flex items-center py-3 px-2 text-slate-300 text-[15px]">Вопросы экспертам</Link></li>
              </ul>
            </FooterColumn>
          </div>

          {/* Brand Signature Mobile - Simplified */}
          <div className="text-center pt-4 pb-2">
            <Link to="/" className="inline-block">
              <span className="text-xl font-serif font-bold tracking-tight text-white/80">{SITE_NAME}</span>
            </Link>
          </div>
        </div>

        {/* 3. BOTTOM BAR (Clean) */}
        <div className="py-6 border-t border-white/5 mt-0 md:mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[11px] text-slate-500 text-center md:text-left font-medium uppercase tracking-[0.05em]">
              &copy; {currentYear} {isClone ? "Экспертные услуги" : "Экспертное бюро «Советникъ»"}. Все права защищены.
            </div>

            <div className="flex gap-6">
              <Link to="/privacy" className="text-[11px] text-slate-500 hover:text-brand-gold uppercase tracking-wider font-medium transition-colors">Приватность</Link>
              <Link to="/terms" className="text-[11px] text-slate-500 hover:text-brand-gold uppercase tracking-wider font-medium transition-colors">Оферта</Link>
              <span className="hidden md:inline text-slate-700">|</span>
              {!isClone && (
                <a
                  href="https://direct-sites.ru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-slate-500 hover:text-brand-gold uppercase tracking-wider font-medium transition-colors flex items-center gap-1"
                >
                  Разработка <span className="hidden sm:inline">сайта</span> — Direct Sites
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { ContactModal } from './ContactModal';

// ... (previous imports)

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [serviceTitle, setServiceTitle] = useState<string | undefined>(undefined);
  const isClone = import.meta.env.MODE === 'clone';
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for custom event to open modal
  useEffect(() => {
    const handleOpenModal = (event: CustomEvent<{ service?: string } | undefined>) => {
      if (isClone) {
        // In clone mode we have no lead form/modal. Reuse existing CTAs by redirecting to Contacts.
        navigate('/contacts');
        return;
      }
      setServiceTitle(event.detail?.service);
      setIsContactModalOpen(true);
    };

    window.addEventListener('openContactModal', handleOpenModal as EventListener);
    return () => window.removeEventListener('openContactModal', handleOpenModal as EventListener);
  }, [isClone, navigate]);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden w-full relative">
      <Navbar />



      <main className="flex-grow pt-0">
        {children}
      </main>
      <Footer />


      <SpeedDial />

      {!isClone && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          serviceTitle={serviceTitle}
        />
      )}

      <button
        onClick={goTop}
        className={`fixed bottom-8 right-28 z-40 bg-white text-brand-900 border border-gray-200 p-3 rounded-full shadow-xl transition-all duration-300 hidden lg:flex items-center justify-center hover:bg-brand-red hover:text-white hover:border-brand-red ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Наверх"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};