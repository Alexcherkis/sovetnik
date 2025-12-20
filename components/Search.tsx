import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search as SearchIcon, X, ArrowRight, FileText, Briefcase, HelpCircle, ChevronRight, Hash } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SERVICES, BLOG_POSTS, FAQ_GROUPS } from '../constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ResultType = 'service' | 'blog' | 'faq';

interface SearchResult {
  type: ResultType;
  title: string;
  subtitle: string;
  link: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Lock body scroll and focus input
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery(''); // Reset on close
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Search Logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const newResults: SearchResult[] = [];

    // 1. Search Services
    SERVICES.forEach(service => {
      if (
        service.title.toLowerCase().includes(q) ||
        service.shortDesc.toLowerCase().includes(q) ||
        service.tasks.some(t => t.toLowerCase().includes(q))
      ) {
        newResults.push({
          type: 'service',
          title: service.title,
          subtitle: service.categoryLabel, // Fixed: Using categoryLabel instead of non-existent category
          link: `/services/${service.slug}`
        });
      }
    });

    // 2. Search Blog
    BLOG_POSTS.forEach(post => {
      if (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q)
      ) {
        newResults.push({
          type: 'blog',
          title: post.title,
          subtitle: post.date,
          link: `/blog/${post.slug}`
        });
      }
    });

    // 3. Search FAQ
    FAQ_GROUPS.forEach(group => {
      group.items.forEach(item => {
        if (
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
        ) {
          newResults.push({
            type: 'faq',
            title: item.question,
            subtitle: "Частые вопросы",
            link: '/faq'
          });
        }
      });
    });

    setResults(newResults);
  }, [query]);

  const handleLinkClick = (link: string) => {
    navigate(link);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-brand-950/99 backdrop-blur-xl animate-fade-in-up transition-all duration-300">

      {/* Header / Input Area */}
      <div className="container mx-auto px-4 md:px-6 pt-6 md:pt-12 pb-6 flex-shrink-0">
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-brand-red transition-all duration-300 group shadow-lg border border-slate-700"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* New Input Design: Solid Block */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <SearchIcon className="text-brand-gold w-6 h-6 group-focus-within:text-white transition-colors duration-300" />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Поиск по услугам, статьям..."
              className="w-full bg-brand-900 rounded-2xl py-5 pl-16 pr-6 text-white text-xl md:text-2xl font-medium placeholder:text-slate-500 border border-brand-800 focus:border-brand-gold/50 focus:bg-brand-800 outline-none transition-all shadow-xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-grow overflow-y-auto no-scrollbar">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl pb-20">

          {query.trim() === '' ? (
            // Empty State - Suggestions
            <div className="mt-8 md:mt-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6 ml-1">Популярные запросы</h3>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {['Оценка бизнеса', 'Банкротство', 'Приемка квартиры', 'Рецензия на экспертизу'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-6 py-3 rounded-xl bg-brand-900 text-slate-300 border border-brand-800 hover:border-brand-gold hover:text-white hover:bg-brand-800 transition-all duration-300 text-sm md:text-base font-medium shadow-md"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            // Results List
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-end mb-2 px-1">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                  Результаты поиска
                </h3>
                <span className="text-brand-gold text-xs font-bold">{results.length} найдено</span>
              </div>

              {results.map((result, idx) => (
                <div
                  key={idx}
                  onClick={() => handleLinkClick(result.link)}
                  className="group flex items-center p-4 rounded-2xl bg-brand-900 hover:bg-brand-800 cursor-pointer transition-all duration-300 border border-brand-800 hover:border-brand-gold/50 hover:shadow-lg hover:shadow-brand-gold/5 active:scale-[0.99]"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-950 border border-brand-800 flex items-center justify-center text-brand-gold shrink-0 transition-transform group-hover:scale-105 shadow-inner">
                    {result.type === 'service' && <Briefcase size={22} />}
                    {result.type === 'blog' && <FileText size={22} />}
                    {result.type === 'faq' && <HelpCircle size={22} />}
                  </div>
                  <div className="ml-5 flex-grow min-w-0">
                    <h4 className="text-lg font-bold text-white group-hover:text-brand-gold transition-colors truncate">
                      {result.title}
                    </h4>
                    <div className="flex items-center mt-1 gap-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${result.type === 'service' ? 'bg-blue-500/20 text-blue-300' :
                        result.type === 'blog' ? 'bg-purple-500/20 text-purple-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                        {result.type === 'service' ? 'Услуга' : result.type === 'blog' ? 'Статья' : 'Вопрос'}
                      </span>
                      <span className="text-sm text-slate-400 truncate max-w-[200px] md:max-w-none">
                        {result.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className="pl-4">
                    <ChevronRight size={20} className="text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // No Results
            <div className="mt-20 text-center text-slate-500">
              <div className="inline-flex p-6 rounded-full bg-white/5 mb-6">
                <SearchIcon size={48} className="opacity-30" />
              </div>
              <p className="text-xl md:text-2xl font-serif text-slate-400">Ничего не найдено</p>
              <p className="text-sm mt-2 text-slate-600">Попробуйте изменить запрос</p>
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
};