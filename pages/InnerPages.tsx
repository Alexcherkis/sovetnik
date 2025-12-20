import React, { useState, useEffect } from 'react';
import { SectionHeader, Button, AccordionItem } from '../components/Components';
import { TEAM, FAQ_GROUPS, PRICES, BLOG_POSTS, SERVICES } from '../constants';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Calendar, User, ArrowLeft, ArrowRight, Share2, Tag, ChevronRight, Send } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

// --- ABOUT PAGE ---
export const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Intro Section - Increased padding */}
      <div className="bg-brand-light py-32 md:py-40 2xl:py-48">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            title="Экспертное бюро Советникъ"
            subtitle="Традиции качества. Безупречная репутация. Профессионализм."
          />
          <div className="max-w-4xl 2xl:max-w-5xl mx-auto text-base md:text-xl 2xl:text-2xl text-slate-600 leading-relaxed text-center mb-16 font-light">
            <p className="mb-8">
              <span className="font-serif font-bold text-brand-900 text-2xl 2xl:text-3xl">«Советникъ»</span> — это не просто экспертная организация. Это интеллектуальный центр,
              объединяющий лучших специалистов в области финансов, строительства и права.
              Мы обеспечиваем надежный фундамент доказательной базы для судебных процессов
              и сложных корпоративных переговоров.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="text-4xl font-serif font-bold text-brand-red mb-4">15+</div>
                <div className="text-sm font-bold text-brand-900 uppercase tracking-wider mb-2">лет опыта</div>
                <p className="text-sm text-slate-500">Успешной практики в арбитражных судах и судах общей юрисдикции.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="text-4xl font-serif font-bold text-brand-red mb-4">500+</div>
                <div className="text-sm font-bold text-brand-900 uppercase tracking-wider mb-2">экспертиз</div>
                <p className="text-sm text-slate-500">Проведено нашими специалистами с подтвержденным качеством.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="text-4xl font-serif font-bold text-brand-red mb-4">100%</div>
                <div className="text-sm font-bold text-brand-900 uppercase tracking-wider mb-2">конфиденциальность</div>
                <p className="text-sm text-slate-500">Строгое соблюдение этических норм и защита данных клиентов.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title="Команда экспертов" subtitle="Профессионалы высшей квалификации" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-12">
            {TEAM.map((member, idx) => (
              <div key={idx} className="group relative">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-6 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm font-medium">{member.experience} успешной работы</p>
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-900">{member.name}</h3>
                <p className="text-brand-red font-medium uppercase tracking-wide text-xs mt-1">{member.role}</p>
                <div className="w-12 h-0.5 bg-gray-200 mt-4 group-hover:bg-brand-red transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-brand-900 text-white py-20 2xl:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Принципы работы Бюро</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Мы не просто считаем цифры или осматриваем здания. Мы ищем истину, которая поможет нашему доверителю защитить свои права.
              </p>
              <Button to="/contacts" variant="white">Стать клиентом</Button>
            </div>
            <div className="space-y-6">
              {[
                { title: "Независимость", desc: "Объективность исследований — наш главный актив." },
                { title: "Компетентность", desc: "Постоянное повышение квалификации сотрудников." },
                { title: "Ответственность", desc: "Мы отвечаем за каждое слово в экспертном заключении." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-800 flex items-center justify-center shrink-0 border border-brand-700">
                    <CheckCircle2 className="text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-serif mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CONTACTS PAGE ---
export const Contacts: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Increased top padding */}
      <div className="bg-brand-900 text-white pt-32 pb-32 2xl:pt-48 2xl:pb-40">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Связаться с нами</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Оставьте заявку на бесплатную консультацию. Мы разберем вашу ситуацию и предложим решение.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Info Card */}
          <div className="bg-white rounded-xl shadow-xl p-8 lg:p-10 border border-gray-100 flex flex-col justify-between h-full order-2 lg:order-1">
            <div>
              <h3 className="text-2xl font-serif font-bold text-brand-900 mb-8">Контакты офиса</h3>

              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-red shrink-0 group-hover:bg-brand-red group-hover:text-white transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div className="ml-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Адрес</p>
                    <p className="text-lg text-brand-900 font-medium leading-snug">
                      ЖК «Статус»<br />
                      20 этаж, офис 157
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-red shrink-0 group-hover:bg-brand-red group-hover:text-white transition-colors">
                    <Phone size={24} />
                  </div>
                  <div className="ml-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Телефон</p>
                    <a href="tel:+79991234567" className="text-lg text-brand-900 font-medium hover:text-brand-red transition-colors">
                      +7 (999) 123-45-67
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Пн-Пт: 09:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-red shrink-0 group-hover:bg-brand-red group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div className="ml-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:info@sovetnik-expert.ru" className="text-lg text-brand-900 font-medium hover:text-brand-red transition-colors">
                      info@sovetnik-expert.ru
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-sm text-slate-500 leading-relaxed">
                Пожалуйста, согласуйте время визита заранее по телефону, чтобы эксперт был на месте и мог уделить вам время.
              </p>
            </div>
          </div>

          {/* Contact Form & Map Container */}
          <div className="lg:col-span-2 space-y-8 order-1 lg:order-2">

            {/* Form */}
            <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 border border-gray-100">
              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-brand-900 mb-4">Заявка принята!</h3>
                  <p className="text-lg text-slate-600 max-w-md">
                    Благодарим за обращение. Секретарь бюро свяжется с вами в течение 15 минут для уточнения деталей.
                  </p>
                  <Button onClick={() => setFormState('idle')} variant="outline" className="mt-8">
                    Отправить еще одну
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-2xl font-serif font-bold text-brand-900 mb-6 flex items-center">
                    Напишите нам
                    <span className="hidden md:inline-block ml-4 h-px bg-gray-200 flex-grow"></span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Ваше имя</label>
                      <input required type="text" placeholder="Иван Иванов" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:bg-white transition-all text-brand-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Телефон</label>
                      <input required type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:bg-white transition-all text-brand-900" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-8">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Сообщение / Кратко о ситуации</label>
                    <textarea required rows={4} placeholder="Опишите вашу задачу..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:bg-white transition-all text-brand-900 resize-none"></textarea>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-slate-400 text-center md:text-left">
                      Нажимая кнопку, вы соглашаетесь с <Link to="/privacy" className="text-brand-red underline">политикой конфиденциальности</Link>
                    </p>
                    <Button type="submit" disabled={formState === 'submitting'} className="w-full md:w-auto px-10">
                      {formState === 'submitting' ? 'Отправка...' : 'Отправить заявку'}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Map Image */}
            <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg h-[300px] relative group border border-gray-300">
              <img
                src="/images/home-hero.png"
                alt="Карта проезда"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-brand-red text-white p-3 rounded-full shadow-xl animate-bounce">
                  <MapPin size={32} fill="currentColor" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- FAQ PAGE ---
export const FAQ: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Composite key: `${groupIndex}-${itemIndex}`
  const toggle = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-32 md:py-40 2xl:py-48">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <SectionHeader
          title="База знаний"
          subtitle="Ответы экспертов на вопросы о процедуре, сроках и стоимости"
        />

        <div className="space-y-12">
          {FAQ_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx}>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900 mb-6 pl-4 border-l-4 border-brand-red">
                {group.title}
              </h3>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {group.items.map((item, itemIdx) => {
                  const key = `${groupIdx}-${itemIdx}`;
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
          ))}
        </div>

        <div className="mt-16 text-center bg-brand-900 text-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-brand-gold opacity-10 rounded-full blur-3xl"></div>
          <h3 className="text-2xl font-bold font-serif mb-4 relative z-10">Случай нестандартный?</h3>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10">
            Если вы не нашли ответ на свой вопрос, или ваша ситуация требует индивидуального разбора — свяжитесь с нами напрямую.
          </p>
          <Button to="/contacts" variant="white" className="relative z-10">
            Консультация эксперта
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- PRICE PAGE ---
export const Price: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-32 md:py-40 2xl:py-48">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <SectionHeader title="Стоимость услуг" subtitle="Прозрачное ценообразование без скрытых доплат" />

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-brand-900 text-white p-5 text-sm font-bold uppercase tracking-wider">
            <div className="col-span-5">Услуга</div>
            <div className="col-span-2">Стоимость</div>
            <div className="col-span-3">Сроки</div>
            <div className="col-span-2">Регион</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {PRICES.map((row, index) => (
              <div key={index} className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 p-5 hover:bg-gray-50 transition-colors">

                <div className="md:col-span-5 font-serif font-bold text-brand-900 text-lg md:text-base flex items-center">
                  {row.service}
                </div>

                <div className="md:col-span-2 flex items-center justify-between md:justify-start">
                  <span className="md:hidden text-xs text-slate-400 font-bold uppercase">Цена:</span>
                  <span className="text-brand-red font-bold">{row.price}</span>
                </div>

                <div className="md:col-span-3 flex items-center justify-between md:justify-start text-slate-600 text-sm">
                  <span className="md:hidden text-xs text-slate-400 font-bold uppercase">Срок:</span>
                  <span className="flex items-center"><Clock size={14} className="mr-1.5 text-brand-gold" /> {row.time}</span>
                </div>

                <div className="md:col-span-2 flex items-center justify-between md:justify-start">
                  <span className="md:hidden text-xs text-slate-400 font-bold uppercase">Регион:</span>
                  <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${row.note.includes('Башкортостан') ? 'bg-brand-50 text-brand-800' : 'bg-gray-100 text-gray-600'}`}>
                    {row.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-6 bg-brand-50 rounded-lg border border-brand-100 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="bg-white p-3 rounded-full text-brand-900 shadow-sm shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <h4 className="font-bold text-brand-900 text-lg">Нужна точная смета?</h4>
            <p className="text-sm text-slate-600">Стоимость экспертизы зависит от сложности объекта и количества вопросов. Оставьте заявку, мы рассчитаем точную цену за 30 минут.</p>
          </div>
          <Button to="/contacts" className="md:ml-auto whitespace-nowrap">Заказать расчет</Button>
        </div>
      </div>
    </div>
  );
};

// --- BLOG PAGE ---
export const Blog: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-32 md:py-40 2xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="Блог экспертов" subtitle="Практические кейсы, новости законодательства и советы" />

        {/* Grid: 2 cols on Tablet, 3 cols on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full border border-gray-100 hover:-translate-y-1">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-brand-900 uppercase tracking-wider shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-slate-400 mb-4 space-x-3">
                  <span className="flex items-center"><Calendar size={12} className="mr-1" /> {post.date}</span>
                  <span className="flex items-center"><Clock size={12} className="mr-1" /> {post.readTime}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-900 mb-3 leading-snug group-hover:text-brand-red transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-brand-red font-bold text-sm uppercase tracking-wider mt-auto">
                  Читать статью <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
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

  return (
    <article className="bg-white min-h-screen pb-20">
      {/* Article Header */}
      <div className="bg-brand-900 text-white pt-40 pb-24 2xl:pt-48 2xl:pb-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-20 blur-sm" />
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