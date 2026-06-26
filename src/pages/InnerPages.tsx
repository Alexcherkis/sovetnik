import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { SectionHeader, Button, AccordionItem } from '../components/Components';
import { TEAM, FAQ_GROUPS, PRICES, BLOG_POSTS, SERVICES, SERVICE_CATEGORIES } from '../data/constants';
import { MapPin, Phone, Mail, Clock, CheckCircle2, User, HelpCircle, FileText, ChevronDown, ChevronUp, Tag, Calendar, ArrowLeft, ArrowRight, Share2, Send, ChevronRight, Scale, Briefcase, FileCheck, Search, X, LayoutGrid } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { YANDEX_METRICA_ID } from '../config/analytics';
import { SEO } from '../components/SEO';
import { SITE_ORIGIN } from '../config/site';
import homeHeroImg from '../assets/images/home-hero.webp';

// --- HELPER COMPONENTS ---
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

// --- ABOUT PAGE ---

// --- CONTACTS PAGE REMOVED (Replaced by Global Modal) ---

// --- FAQ PAGE ---
export const FAQ: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Composite key: `${groupIndex}-${itemIndex}`
  const toggle = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  // Fuse.js options
  const fuseOptions = {
    keys: ['question', 'answer'],
    threshold: 0.3, // 0.0 = perfect match, 1.0 = match anything
    includeScore: true
  };

  // Filter Logic with Fuse
  const filteredGroups = React.useMemo(() => {
    if (!searchQuery.trim()) return FAQ_GROUPS;

    // Flatten all items for searching, preserving original group and item indices
    const allItems = FAQ_GROUPS.flatMap((group, groupIdx) =>
      group.items.map((item, itemIdx) => ({ ...item, groupTitle: group.title, originalGroupIdx: groupIdx, originalItemIdx: itemIdx }))
    );
    const fuse = new Fuse(allItems, fuseOptions);
    const result = fuse.search(searchQuery);

    // Reconstruct groups from search results
    const groups: typeof FAQ_GROUPS = [];

    result.forEach(({ item }) => {
      let group = groups.find(g => g.title === item.groupTitle);
      if (!group) {
        group = { title: item.groupTitle!, items: [] };
        groups.push(group);
      }
      group.items.push({ question: item.question, answer: item.answer });
    });

    return groups;
  }, [searchQuery]);

  const quickTags = ["Стоимость", "Сроки", "Суд", "Документы", "Рецензия"];

  return (
    <div className="bg-gray-50 min-h-screen py-32 md:py-40 2xl:py-48">
      <SEO
        title="Частые вопросы (FAQ)"
        description="Ответы экспертов на популярные вопросы о судебной экспертизе, оценке и сроках работы."
        breadcrumbs={[{ name: 'База знаний', item: '/faq' }]}
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_GROUPS.flatMap(group =>
            group.items.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          )
        }}
      />
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <SectionHeader
          title="База знаний"
          subtitle="Ответы экспертов на вопросы о процедуре, сроках и стоимости"
        />

        {/* Search Input Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск по вопросам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border border-gray-200 rounded-2xl text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand-red transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {quickTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm text-slate-500 hover:border-brand-gold hover:text-brand-900 transition-colors shadow-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="animate-fade-in-up">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900 mb-6 pl-4 border-l-4 border-brand-red">
                  {group.title}
                </h3>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {group.items.map((item, itemIdx) => {
                    // Find original index to maintain stable keys and state
                    const originalGroupIdx = FAQ_GROUPS.findIndex(g => g.title === group.title);
                    const originalItemIdx = FAQ_GROUPS[originalGroupIdx]?.items.findIndex(i => i.question === item.question) ?? itemIdx;
                    const key = `${originalGroupIdx}-${originalItemIdx}`;

                    return (
                      <AccordionItem
                        key={key}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openSection === key}
                        onClick={() => toggle(key)}
                      />
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4 text-slate-400">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-2">Ничего не найдено</h3>
              <p className="text-slate-500">Попробуйте изменить запрос или свяжитесь с нами.</p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center bg-brand-900 text-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-brand-gold opacity-10 rounded-full blur-3xl"></div>
          <h3 className="text-2xl font-bold font-serif mb-4 relative z-10">Случай нестандартный?</h3>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10">
            Если вы не нашли ответ на свой вопрос, или ваша ситуация требует индивидуального разбора — свяжитесь с нами напрямую.
          </p>
          <Button
            onClick={() => {
              const event = new CustomEvent('openContactModal', { detail: { service: 'Вопрос из FAQ' } });
              window.dispatchEvent(event);
            }}
            variant="white"
            className="relative z-10"
          >
            Консультация эксперта
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- PRICE PAGE (Originally Services Registry) ---
export const Price: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile State
  const [mobileCategorySlug, setMobileCategorySlug] = useState<string | null>(null);

  const categories = Object.values(SERVICE_CATEGORIES);
  const isDrawerOpen = !!mobileCategorySlug;

  // Body scroll lock for drawer
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isDrawerOpen]);

  // Unified Filter Logic
  const filteredGroups = React.useMemo(() => {
    let filteredServices = SERVICES;

    if (searchQuery.trim()) {
      const fuse = new Fuse(SERVICES, {
        keys: [{ name: 'title', weight: 0.7 }, { name: 'shortDesc', weight: 0.5 }],
        threshold: 0.4,
      });
      filteredServices = fuse.search(searchQuery).map(r => r.item);
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

  // Logic for Mobile Drawer Content
  const mobileDrawerContent = React.useMemo(() => {
    if (!mobileCategorySlug) return null;
    return categories.find(c => c.slug === mobileCategorySlug);
  }, [mobileCategorySlug]);

  const mobileDrawerServices = React.useMemo(() => {
    if (!mobileDrawerContent) return [];
    return SERVICES.filter(s => s.categorySlug === mobileDrawerContent.slug);
  }, [mobileDrawerContent]);


  // Search Logic for Mobile (when no category selected)
  const mobileSearchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const fuse = new Fuse(SERVICES, {
      keys: [{ name: 'title', weight: 0.7 }, { name: 'shortDesc', weight: 0.5 }],
      threshold: 0.4,
    });
    return fuse.search(searchQuery).map(r => r.item);
  }, [searchQuery]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24 md:pb-0">
      <SEO
        title="Прайс-лист на экспертизы и оценку"
        description="Полный каталог экспертных услуг бюро: строительная, финансовая, почерковедческая экспертиза, оценка бизнеса и недвижимости, землеустройство, юридическое сопровождение. Цены от 5 000 ₽."
        url="/price"
      />

      {/* HEADER */}
      <div className="bg-brand-900 text-white pt-24 pb-12 md:pt-36 md:pb-16 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-[pulse_10s_infinite]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-serif font-bold mb-2">Каталог услуг</h1>
          <p className="text-slate-400 text-sm md:text-base font-light">
            {searchQuery ? `Поиск: "${searchQuery}"` : 'Выберите категорию, чтобы увидеть услуги'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-20">

        {/* --- MOBILE VIEW --- */}
        <div className="md:hidden">
          {/* Mobile Search */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Найти услугу..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 shadow-sm text-sm focus:ring-2 focus:ring-brand-red/20 outline-none placeholder:text-slate-400"
            />
            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
          </div>

          {/* Content Switching: Search Results OR Category Grid */}
          {searchQuery ? (
            /* Search Results List */
            <div className="space-y-3">
              {mobileSearchResults.length > 0 ? (
                mobileSearchResults.map(service => (
                  <Link
                    key={service.id}
                    to={`/services/${service.slug}`}
                    className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm active:scale-[0.99] transition-transform"
                  >
                    <div className="flex-1 pr-4">
                      <h4 className="font-bold text-brand-900 text-sm mb-1">{service.title}</h4>
                      <span className="text-xs text-slate-500">{service.shortDesc}</span>
                    </div>
                    <div className="bg-brand-50 p-2 rounded-full text-brand-red">
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-10 text-slate-500 text-sm">Ничего не найдено</div>
              )}
            </div>
          ) : (
            /* Category Grid */
            <div className="grid grid-cols-2 gap-3">
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setMobileCategorySlug(cat.slug)}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform h-32 text-center"
                >
                  <div className="mb-3 p-3 bg-brand-50 text-brand-red rounded-full">
                    <cat.icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold text-brand-900 leading-tight px-1">{cat.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>


        {/* --- DESKTOP VIEW (Tabs + Grid) --- */}
        <div className="hidden md:flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* SIDEBAR */}
          <aside className="w-64 shrink-0 sticky top-24 self-start">
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

          {/* RIGHT CONTENT */}
          <div className="flex-1 w-full min-w-0">
            {/* Desktop Search */}
            <div className="relative mb-8 max-w-xl">
              <input
                type="text"
                placeholder="Поиск услуги..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value && activeCategory !== 'all') setActiveCategory('all');
                }}
                className="w-full h-12 bg-white border border-gray-200 rounded-xl pl-12 pr-4 shadow-sm outline-none focus:ring-2 focus:ring-brand-gold/50"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>

            {filteredGroups.length > 0 ? (
              <div className="space-y-10">
                {filteredGroups.map(group => (
                  <div key={group.category.slug} className="scroll-mt-32" id={group.category.slug}>
                    <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-2">
                      <group.category.icon size={24} className="text-brand-red" />
                      <h2 className="text-2xl font-serif font-bold text-brand-900">{group.category.title}</h2>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                      {group.services.map(service => (
                        <ServiceGridItem key={service.id} service={service} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-500">Ничего не найдено</div>
            )}
          </div>
        </div>

      </div>

      {/* === MOBILE DRAWER (Portal/Fixed) === */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileCategorySlug(null)}
      />

      {/* Sheet */}
      <div className={`fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] transform transition-transform duration-300 ease-out md:hidden flex flex-col max-h-[85vh] ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'}`}>

        {/* Handle */}
        <div className="w-full flex justify-center pt-3 pb-1" onTouchStart={() => setMobileCategorySlug(null)}>
          <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
        </div>

        {/* Header */}
        {mobileDrawerContent && (
          <div className="px-6 pb-4 pt-4 border-b border-gray-100 flex items-start justify-between bg-white shrink-0 sticky top-0 z-20">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-brand-50 rounded-lg text-brand-red">
                <mobileDrawerContent.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-900 leading-tight">{mobileDrawerContent.title}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{mobileDrawerContent.subtitle}</p>
              </div>
            </div>
            <button onClick={() => setMobileCategorySlug(null)} className="p-2 bg-gray-50 rounded-full text-slate-400 hover:text-brand-red ml-2 shrink-0">
              <X size={20} />
            </button>
          </div>
        )}

        {/* List */}
        <div className="overflow-y-auto p-4 space-y-3 overscroll-contain pb-20">
          {mobileDrawerServices.map(service => (
            <Link key={service.id} to={`/services/${service.slug}`} className="flex items-center p-4 bg-gray-50 rounded-xl active:bg-brand-50 transition-colors" onClick={() => setMobileCategorySlug(null)}>
              <div className="flex-1 pr-4">
                <h4 className="font-bold text-brand-900 text-sm mb-1">{service.title}</h4>
                <div className="flex items-center text-[10px] text-slate-500 gap-2">
                  <span className="px-1.5 py-0.5 bg-white rounded border border-gray-200 shadow-sm">{service.priceStart}</span>
                  <span>{service.duration}</span>
                </div>
              </div>
              <div className="bg-white p-2 rounded-full text-brand-900 shadow-sm">
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
          <div className="p-4 rounded-xl bg-brand-900/5 border border-brand-900/10 text-center mt-4 mb-4">
            <p className="text-xs text-brand-900 font-medium mb-2">Не нашли нужную услугу?</p>
            <button onClick={() => { setMobileCategorySlug(null); window.dispatchEvent(new CustomEvent('openContactModal', { detail: { service: 'Не нашел в прайсе' } })); }} className="text-brand-red text-xs font-bold uppercase tracking-wider">
              Связаться с менеджером
            </button>
          </div>
        </div>
      </div>

      {/* Floating Call Button for Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <a
          href="tel:+79870224999"
          className="flex items-center justify-center w-14 h-14 bg-brand-green text-white rounded-full shadow-2xl shadow-green-900/40 animate-pulse-slow active:scale-90 transition-transform"
        >
          <Phone size={24} fill="currentColor" />
        </a>
      </div>

    </div>
  );
};

// --- BLOG PAGE ---
export const Blog: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12 md:pt-32 md:pb-20">
      <SEO
        title="Блог экспертов"
        description="Статьи и кейсы от экспертов бюро Советникъ. Разбор судебной практики."
        breadcrumbs={[{ name: 'Блог', item: '/blog' }]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "blogPost": BLOG_POSTS.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "url": `${SITE_ORIGIN}/blog/${post.slug}`,
            "image": post.image
          }))
        }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="Блог экспертов" subtitle="Практические кейсы, новости законодательства и советы" />

        {/* Grid: 2 cols on Tablet, 3 cols on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-500 overflow-hidden h-full border border-gray-100 hover:border-brand-gold/30 hover:-translate-y-2">
              <div className="h-64 overflow-hidden relative bg-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading={post.id <= 6 ? "eager" : "lazy"}
                  fetchPriority={post.id <= 6 ? "high" : "auto"}
                />
                <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/10 transition-colors duration-500"></div>
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-lg text-xs font-bold text-brand-900 uppercase tracking-wider shadow-md border border-gray-100">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-slate-400 mb-5 space-x-4">
                  <span className="flex items-center bg-gray-50 px-2 py-1 rounded"><Calendar size={12} className="mr-2 text-brand-gold" /> {post.date}</span>
                  <span className="flex items-center bg-gray-50 px-2 py-1 rounded"><Clock size={12} className="mr-2 text-brand-gold" /> {post.readTime}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900 mb-4 leading-tight group-hover:text-brand-red transition-colors">
                  {post.title}
                </h3>
                <p className="text-base text-slate-600 line-clamp-3 mb-8 flex-grow leading-relaxed font-light">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-brand-red font-bold text-xs uppercase tracking-[0.15em] mt-auto group-hover:translate-x-2 transition-transform duration-300">
                  Читать статью <ArrowRight size={14} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- BLOG POST PAGE ---
export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Статья не найдена</h2>
        <Button onClick={() => navigate('/blog')}>Вернуться в блог</Button>
      </div>
    );
  }

  // --- SEO SCHEMA ---
  const parseRuDate = (dateStr: string): string => {
    const months: Record<string, string> = {
      'янв': '01', 'фев': '02', 'мар': '03', 'апр': '04', 'май': '05', 'мая': '05',
      'июн': '06', 'июл': '07', 'авг': '08', 'сен': '09', 'окт': '10', 'ноя': '11', 'дек': '12'
    };
    try {
      const parts = dateStr.split(' ');
      const day = parts[0]?.padStart(2, '0');
      const month = months[parts[1]?.toLowerCase().slice(0, 3)] || '01';
      const year = parts[2];
      return `${year}-${month}-${day}`;
    } catch { return new Date().toISOString().split('T')[0]; }
  };
  const isoDate = parseRuDate(post.date);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.image],
    "datePublished": isoDate,
    "dateModified": isoDate,
    "author": {
      "@type": "Organization",
      "name": "Советникъ — Экспертное Бюро",
      "url": SITE_ORIGIN
    },
    "publisher": {
      "@type": "Organization",
      "name": "Советникъ",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_ORIGIN}/favicon.svg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}/blog/${post.slug}`
    },
    "description": post.excerpt
  };

  return (
    <article className="bg-white min-h-screen pb-20">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.image}
        url={`/blog/${post.slug}`}
        type="article"
        schema={articleSchema}
        breadcrumbs={[
          { name: 'Блог', item: '/blog' },
          { name: post.title, item: `/blog/${post.slug}` }
        ]}
      />
      {/* Article Header */}
      <div className="bg-brand-900 text-white pt-40 pb-24 2xl:pt-48 2xl:pb-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-20 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center space-x-2 bg-brand-red/20 border border-brand-red/30 px-3 py-1 rounded-full text-brand-red text-xs font-bold uppercase tracking-wider mb-6">
            <Tag size={12} /> <span>{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center space-x-6 text-slate-400 text-sm">
            <span className="flex items-center"><Calendar size={14} className="mr-2" /> {post.date}</span>
            <span className="flex items-center"><Clock size={14} className="mr-2" /> {post.readTime} чтения</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl 2xl:max-w-4xl mx-auto -mt-12 bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 relative z-20">
          <div className="prose prose-lg 2xl:prose-xl prose-slate max-w-none first-letter:text-5xl first-letter:font-serif first-letter:text-brand-red first-letter:font-bold first-letter:mr-2 first-letter:float-left">
            {post.content}
          </div>

          <div className="border-t border-gray-100 mt-12 pt-8 flex justify-between items-center">
            <Button variant="ghost" to="/blog" className="pl-0 hover:bg-transparent hover:text-brand-red">
              <ArrowLeft size={16} className="mr-2" /> Все статьи
            </Button>
            <div className="flex space-x-2">
              <button className="p-2 text-slate-400 hover:text-brand-900 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};





// --- CONTACTS PAGE ---
export const Contacts: React.FC = () => {
  const [showRequisites, setShowRequisites] = useState(false);
  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-brand-gold selection:text-brand-900 pb-20 md:pb-0">
      <SEO
        title="Контакты — Советникъ"
        description="Офис Экспертного бюро Советникъ в Уфе. Премиальный сервис и профессиональная экспертиза."
        url="/contacts"
        breadcrumbs={[{ name: 'Контакты', item: '/contacts' }]}
      />

      {/* 1. Hero Section - Ultra Premium & Compact */}
      <div className="relative bg-[#0B1221] pt-24 pb-24 md:pt-36 md:pb-48 overflow-hidden">
        {/* Background Art */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Office vibe"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-20 filter saturate-0 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1221]/80 via-[#0B1221]/90 to-[#0B1221]"></div>

          {/* Animated Gold Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3 animate-pulse duration-[8000ms]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12">
            {/* Left Content */}
            <div className="max-w-4xl w-full">
              <div className="flex items-center gap-4 mb-6 opacity-0 animate-fade-in-right">
                <div className="h-px w-12 bg-[#D4AF37]"></div>
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em]">Свяжитесь с нами</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white mb-6 tracking-tight leading-none opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
                Наши <span className="italic font-light text-slate-500">Контакты</span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl font-light max-w-xl leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
                Мы всегда открыты для диалога. Найдите лучшее решение вашей задачи уже сегодня.
              </p>
            </div>

            {/* Right Decorative Element (Desktop) */}
            <div className="hidden md:block relative opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
              <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center relative animate-[spin_60s_linear_infinite]">
                <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_40s_linear_infinite_reverse]"></div>
                <div className="text-center">
                  <span className="block text-3xl font-serif font-bold text-white">24/7</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">Прием заявок</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Floating Card */}
      <div className="container mx-auto px-4 md:px-6 -mt-12 md:-mt-24 relative z-20 pb-16 md:pb-24">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col lg:flex-row ring-1 ring-slate-900/5">

          {/* LEFT: Information Content */}
          <div className="w-full lg:w-5/12 p-8 md:p-14 lg:p-20 flex flex-col justify-center relative bg-white z-10">

            {/* Pattern Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[10rem] -z-10 opacity-50"></div>

            <div className="space-y-12 md:space-y-16">

              {/* Address */}
              <div className="relative group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#0B1221] text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <MapPin size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Центральный офис</span>
                </div>

                <div className="pl-16">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0B1221] leading-tight mb-3">
                    Уфа, ул. 50 лет СССР, 34
                  </h2>
                  <p className="text-base md:text-lg text-slate-500 font-light leading-relaxed">
                    ЖК «Статус», 1 этаж <br /> <span className="text-sm text-slate-400">Удобная парковка для клиентов</span>
                  </p>

                  <div className="mt-5 inline-flex items-center gap-x-2 bg-brand-50 border border-brand-100 px-4 py-2 rounded-lg">
                    <MapPin size={16} className="text-brand-red flex-shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-brand-900 uppercase tracking-widest block leading-tight">Работаем по всей России</span>
                      <span className="text-[10px] text-brand-700 leading-none">Работа по РФ дистанционно и с выездом</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contacts List */}
              <div className="pl-16 space-y-10">
                {/* Phone */}
                <div className="group">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">Телефон</span>
                  <a href="tel:+79870224999" className="text-3xl md:text-4xl font-serif font-bold text-[#0B1221] hover:text-[#D4AF37] transition-colors block leading-none tracking-tight mb-2" onClick={() => typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_phone')}>
                    +7 (987) 022-49-99
                  </a>
                  <span className="inline-flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Сейчас работаем
                  </span>
                </div>

                {/* Email */}
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">Электронная почта</span>
                  <a href="mailto:expert-sovetnik-rf@ya.ru" className="text-lg md:text-xl font-medium text-slate-700 hover:text-[#D4AF37] transition-colors border-b border-slate-200 pb-1 hover:border-[#D4AF37]" onClick={() => typeof window.ym !== 'undefined' && window.ym(YANDEX_METRICA_ID, 'reachGoal', 'click_email')}>
                    expert-sovetnik-rf@ya.ru
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Visual Map Section */}
          <div className="w-full lg:w-7/12 relative h-[450px] md:h-[500px] lg:h-auto bg-slate-100">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=56.015079%2C54.750645&z=17.2&pt=56.015079,54.750645,pm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              title="Карта"
              className="absolute inset-0 w-full h-full grayscale-[30%] hover:grayscale-0 transition-all duration-1000 saturate-50 hover:saturate-100 mix-blend-multiply"
            ></iframe>

            {/* Map Card Overlay (Desktop) */}
            <div className="hidden lg:block absolute bottom-12 left-12 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl max-w-xs border border-white/50">
              <p className="text-[#0B1221] font-serif font-bold text-lg mb-2">Как добраться?</p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Мы находимся в самом центре города. Для наших клиентов всегда доступна парковка.
              </p>
              <a
                href="https://yandex.ru/maps/-/CDu~MR~9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest text-[#0B1221] hover:text-[#D4AF37] flex items-center gap-2 transition-colors"
              >
                Маршрут <ArrowRight size={14} />
              </a>
            </div>

            {/* Mobile Map Button - Integrated and Clean */}
            <a
              href="https://yandex.ru/maps/-/CDu~MR~9"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden absolute bottom-6 right-6 left-6 bg-white/95 backdrop-blur-sm text-[#0B1221] py-3 rounded-xl shadow-lg border border-white/20 flex items-center justify-center gap-2 font-bold text-sm"
            >
              <MapPin size={16} /> Открыть карту
            </a>
          </div>
        </div>
      </div>

      {/* 3. Requisites - Hidden by Default (Premium UX) */}
      <div className="container mx-auto px-6 pb-20">
        <div className="border-t border-slate-200 pt-12 md:pt-16 flex flex-col items-center">

          <button
            onClick={() => setShowRequisites(!showRequisites)}
            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-slate-50 border border-slate-200 hover:border-brand-gold hover:bg-white transition-all text-slate-500 hover:text-brand-900 font-medium text-sm uppercase tracking-wider"
          >
            <span>Юридические реквизиты</span>
            {showRequisites ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showRequisites && (
            <div className="w-full mt-8 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-serif font-bold text-[#0B1221] mb-2">ООО «Экспертное Бюро Советникъ»</h3>
                  <p className="text-slate-500 text-sm max-w-md">
                    Официальные данные о регистрации компании для проверки контрагента.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">ИНН</p>
                  <p className="font-mono text-lg text-[#0B1221] select-all">0276966601</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">ОГРН</p>
                  <p className="font-mono text-lg text-[#0B1221] select-all">1210200055740</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};