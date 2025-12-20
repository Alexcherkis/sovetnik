import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, ChevronRight, Send, Search, ArrowUp, Cookie } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Button } from './Components';
import { SearchModal } from './Search';

// --- COMPONENT: Cookie Consent ---
const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('sovetnik-cookie-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000); // Delay appearance
    }
  }, []);

  const accept = () => {
    localStorage.setItem('sovetnik-cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-0 left-0 right-0 z-[60] p-4 animate-fade-in-up pointer-events-none">
      <div className="container mx-auto max-w-4xl pointer-events-auto">
        <div className="bg-brand-900/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-brand-700 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-brand-800 p-2 rounded-full text-brand-gold shrink-0 hidden md:block">
              <Cookie size={24} />
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed text-center md:text-left">
              Мы используем файлы cookie для улучшения работы сайта. Продолжая работу с сайтом, вы даете согласие на обработку персональных данных.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={accept}
              className="flex-1 md:flex-none px-6 py-2.5 bg-brand-gold text-white text-sm font-bold rounded-lg hover:bg-yellow-600 transition-colors whitespace-nowrap"
            >
              Согласен
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="px-4 py-2.5 bg-transparent border border-brand-700 text-slate-400 text-sm font-bold rounded-lg hover:bg-brand-800 hover:text-white transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const isScrolledOrNotHome = scrolled || !isHomePage || isOpen;

  const navBgClass = isScrolledOrNotHome
    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 py-3'
    : 'bg-transparent py-5 border-b border-white/10';

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

      <header className={`${positionClass} w-full z-40 transition-all duration-300 top-0 ${navBgClass}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">

            <Link to="/" className="flex flex-col items-start group relative z-50" onClick={() => setIsOpen(false)}>
              <div className="flex items-center">
                <span className={`text-2xl md:text-3xl font-serif font-bold tracking-wide transition-colors ${logoMainColor}`}>
                  Советникъ
                  <span className="text-brand-gold text-4xl leading-none inline-block ml-0.5 relative top-1">.</span>
                </span>
              </div>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-medium hidden sm:block ${logoSubColor}`}>
                Экспертное бюро
              </span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <div key={item.path} className="relative group h-full py-2">
                  <Link
                    to={item.path}
                    className={`text-sm font-bold uppercase tracking-wider transition-all flex items-center relative ${isActive(item.path) ? 'text-brand-gold' : textClass
                      } hover:text-brand-gold`}
                  >
                    {item.label}
                    {item.subItems && <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform" />}
                    {isActive(item.path) && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-gold rounded-full"></span>}
                  </Link>

                  {item.subItems && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-72">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-2 ring-1 ring-black ring-opacity-5">
                        <div className="relative bg-white z-10">
                          {item.subItems.map(sub => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className={`block px-6 py-3 text-sm transition-colors border-l-4 font-medium font-serif ${isActive(sub.path)
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

            <div className="flex items-center gap-2 md:gap-6 z-50">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 transition-colors duration-300 focus:outline-none ${searchBtnColor}`}
                aria-label="Поиск"
              >
                <Search size={22} />
              </button>

              <div className={`hidden xl:flex flex-col items-end ${textClass}`}>
                <a href="tel:+79991234567" className="font-bold text-lg leading-none hover:text-brand-gold transition-colors whitespace-nowrap font-serif">
                  +7 (999) 123-45-67
                </a>
                <span className="text-[10px] opacity-70 uppercase tracking-wider">Ежедневно 9:00-18:00</span>
              </div>

              <Button
                to="/contacts"
                variant={isScrolledOrNotHome ? 'primary' : 'white'}
                size="sm"
                className="hidden lg:inline-flex shadow-lg"
              >
                Консультация
              </Button>

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
        className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out flex flex-col pt-[80px] ${isOpen ? 'translate-x-0' : 'translate-x-full'
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

                    <div className={`overflow-hidden transition-all duration-300 bg-gray-50/50 ${expandedItem === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
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
                    onClick={() => setIsOpen(false)}
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
          <Button
            to="/contacts"
            className="w-full justify-center py-4 text-base font-bold shadow-lg shadow-brand-red/10 mb-6"
            onClick={() => setIsOpen(false)}
          >
            Оставить заявку
          </Button>

          <div className="flex justify-between items-center px-2">
            <a href="tel:+79991234567" className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Горячая линия</span>
              <span className="text-xl font-serif font-bold text-brand-900">+7 (999) 123-45-67</span>
            </a>
            <a href="tel:+79991234567" className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-red active:bg-brand-red active:text-white transition-colors">
              <Phone size={24} />
            </a>
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
    <div className="border-b border-brand-800 md:border-none last:border-none">
      <h4 className="hidden md:block text-lg font-serif font-bold mb-6 text-white tracking-wide border-l-2 border-brand-gold pl-3">
        {title}
      </h4>
      <button
        className="md:hidden flex items-center justify-between w-full py-5 text-left text-white font-serif font-bold tracking-wide focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown
          size={18}
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-brand-gold`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          } md:max-h-none md:opacity-100 md:pb-0`}
      >
        {children}
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-brand-950 text-white pt-16 pb-8 border-t border-brand-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Tablet Optimization: md:grid-cols-2 for better spacing, lg:grid-cols-4 for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-16 mb-12">
          <div className="space-y-6 pb-10 md:pb-0 border-b border-brand-800 md:border-none">
            <Link to="/" className="inline-block group">
              <span className="text-3xl font-serif font-bold tracking-wide text-white">
                Советникъ<span className="text-brand-gold">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Экспертное бюро. Независимая финансовая и строительная экспертиза. Профессиональная защита ваших интересов.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 bg-brand-900 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors cursor-pointer text-slate-300 hover:text-white border border-brand-800">
                <Send size={18} />
              </a>
              <a href="mailto:info@sovetnik-expert.ru" className="w-10 h-10 bg-brand-900 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors cursor-pointer text-slate-300 hover:text-white border border-brand-800">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <FooterColumn title="Направления">
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/services/category/financial" className="hover:text-white transition-colors flex items-center hover:translate-x-1 duration-200">Финансы и Экономика</Link></li>
              <li><Link to="/services/category/construction" className="hover:text-white transition-colors flex items-center hover:translate-x-1 duration-200">Строительство и Земля</Link></li>
              <li><Link to="/services/category/valuation" className="hover:text-white transition-colors flex items-center hover:translate-x-1 duration-200">Оценка и Активы</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors flex items-center hover:translate-x-1 duration-200 text-brand-gold font-bold">Все услуги</Link></li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Бюро">
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center hover:translate-x-1 duration-200">О компании</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors flex items-center hover:translate-x-1 duration-200">Команда экспертов</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors flex items-center hover:translate-x-1 duration-200">Отзывы доверителей</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors flex items-center hover:translate-x-1 duration-200">Блог</Link></li>
              <li><Link to="/price" className="hover:text-white transition-colors flex items-center hover:translate-x-1 duration-200">Стоимость услуг</Link></li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Контакты">
            <ul className="space-y-5 text-sm text-slate-400">
              <li className="flex items-start group">
                <MapPin className="mr-4 text-brand-gold shrink-0 mt-0.5" size={20} />
                <span className="leading-relaxed group-hover:text-white transition-colors">
                  ЖК «Статус»,<br />
                  20 этаж, офис 157
                </span>
              </li>
              <li className="flex items-center group">
                <Phone className="mr-4 text-brand-gold shrink-0" size={20} />
                <a href="tel:+79991234567" className="hover:text-white font-medium text-lg font-serif">+7 (999) 123-45-67</a>
              </li>
              <li className="flex items-center group">
                <Mail className="mr-4 text-brand-gold shrink-0" size={20} />
                <a href="mailto:info@sovetnik-expert.ru" className="hover:text-white">info@sovetnik-expert.ru</a>
              </li>
            </ul>
          </FooterColumn>
        </div>

        <div className="border-t border-brand-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-4 text-center md:text-left">
          <p>© {currentYear} Экспертное бюро "Советникъ". Все права защищены.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">Политика конфиденциальности</Link>
            <Link to="/terms" className="hover:text-slate-400 transition-colors">Оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-grow pt-0">
        {children}
      </main>
      <Footer />
      <CookieConsent />

      <a
        href="tel:+79991234567"
        className="fixed bottom-6 right-6 lg:hidden z-50 bg-brand-red text-white p-4 rounded-full shadow-2xl active:scale-90 transition-transform hover:bg-red-700 ring-4 ring-white/20"
        aria-label="Позвонить"
      >
        <Phone size={24} fill="currentColor" />
      </a>

      <button
        onClick={goTop}
        className={`fixed bottom-8 right-8 z-40 bg-white text-brand-900 border border-gray-200 p-3 rounded-full shadow-xl transition-all duration-300 hidden lg:flex items-center justify-center hover:bg-brand-red hover:text-white hover:border-brand-red ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Наверх"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};