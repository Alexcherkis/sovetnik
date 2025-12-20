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
    <div className="fixed inset-0 z-[100] flex flex-col bg-brand-950/98 backdrop-blur-xl animate-fade-in-up transition-all duration-300">
      
      {/* Header / Input Area */}
      <div className="container mx-auto px-4 md:px-6 pt-6 md:pt-12 pb-6 flex-shrink-0">
        <div className="flex justify-end mb-8">
          <button 
            onClick={onClose}
            className="p-3 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-brand-red transition-all duration-300 group shadow-lg"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-gold w-8 h-8 md:w-10 md:h-10 opacity-80" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Поиск по услугам, статьям..."
            className="w-full bg-transparent border-b-2 border-white/20 text-white text-2xl md:text-4xl lg:text-5xl font-serif font-bold py-4 pl-12 md:pl-16 pr-4 focus:outline-none focus:border-brand-gold transition-colors placeholder:text-white/20"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-grow overflow-y-auto no-scrollbar">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl pb-20">
          
          {query.trim() === '' ? (
            // Empty State - Suggestions
            <div className="mt-8 md:mt-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-6">Популярные запросы</h3>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {['Оценка бизнеса', 'Банкротство', 'Приемка квартиры', 'Рецензия на экспертизу'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-slate-200 hover:border-brand-gold hover:text-brand-gold hover:bg-white/10 transition-all duration-300 text-sm md:text-base font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            // Results List
            <div className="mt-8 space-y-3">
              <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-2">
                 <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                   Результаты поиска
                 </h3>
                 <span className="text-brand-gold text-xs font-bold">{results.length} найдено</span>
              </div>
              
              {results.map((result, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleLinkClick(result.link)}
                  className="group flex items-center p-4 md:p-6 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 border border-white/5 hover:border-white/20 hover:translate-x-1"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-900 border border-white/20 flex items-center justify-center text-brand-gold shrink-0 transition-transform group-hover:scale-110">
                    {result.type === 'service' && <Briefcase size={20} />}
                    {result.type === 'blog' && <FileText size={20} />}
                    {result.type === 'faq' && <HelpCircle size={20} />}
                  </div>
                  <div className="ml-4 md:ml-6 flex-grow min-w-0">
                    <h4 className="text-lg md:text-xl font-bold text-slate-100 group-hover:text-white transition-colors truncate">
                      {result.title}
                    </h4>
                    <div className="flex items-center mt-1.5 flex-wrap gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        result.type === 'service' ? 'bg-blue-500/20 text-blue-300' :
                        result.type === 'blog' ? 'bg-purple-500/20 text-purple-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {result.type === 'service' ? 'Услуга' : result.type === 'blog' ? 'Статья' : 'Вопрос'}
                      </span>
                      <span className="text-xs text-slate-400 border-l border-white/20 pl-2 truncate">
                        {result.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className="pl-4">
                     <div className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent group-hover:bg-brand-gold text-white/20 group-hover:text-white transition-all duration-300">
                        <ArrowRight size={20} className="-ml-0.5" />
                     </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // No Results
            <div className="mt-20 text-center text-slate-500">
              <div className="inline-flex p-6 rounded-full bg-white/5 mb-6">
                 <SearchIcon size={48} className="opacity-50" />
              </div>
              <p className="text-xl md:text-2xl font-serif text-slate-300">Ничего не найдено по запросу "{query}"</p>
              <p className="text-sm mt-2 text-slate-500">Попробуйте использовать синонимы или более общий запрос</p>
            </div>
          )}
          
        </div>
      </div>
    </div>,
    document.body
  );
};