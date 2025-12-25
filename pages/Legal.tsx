import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Lock } from 'lucide-react';

// --- Components for Legal Pages ---

const LegalHeader: React.FC<{ title: string; subtitle: string; icon: any }> = ({ title, subtitle, icon: Icon }) => (
  <div className="bg-brand-950 text-white pt-28 pb-24 md:pt-36 md:pb-32 relative overflow-hidden">
    {/* Abstract Background Elements */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors text-xs md:text-sm font-bold uppercase tracking-wider group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Вернуться на главную
        </Link>
        
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-800 rounded-xl flex items-center justify-center text-brand-gold shadow-lg border border-brand-700 mr-4 md:mr-6 shrink-0">
            <Icon className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            {title}
          </h1>
        </div>
        
        <p className="text-slate-300 text-base md:text-xl font-light max-w-2xl leading-relaxed ml-0 md:ml-[5.5rem]">
          {subtitle}
        </p>
      </div>
    </div>
  </div>
);

const LegalContent: React.FC<{ children: React.ReactNode; date: string }> = ({ children, date }) => (
  <div className="container mx-auto px-4 md:px-6 pb-20">
    <div className="max-w-4xl mx-auto -mt-12 md:-mt-16 bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-100 relative z-20 p-6 md:p-12 lg:p-16">
      <div className="mb-8 border-b border-gray-100 pb-6 flex justify-between items-center text-xs md:text-sm text-slate-400 uppercase tracking-wider font-semibold">
        <span>Юридический документ</span>
        <span>Обновлено: {date}</span>
      </div>
      <div className="space-y-8 md:space-y-12 text-slate-700 leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section>
    <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-900 mb-4 md:mb-6 flex items-baseline">
      <span className="w-2 h-2 rounded-full bg-brand-red mr-3 transform translate-y-[-2px]"></span>
      {title}
    </h2>
    <div className="text-base md:text-lg font-light text-slate-600 space-y-4 pl-0 md:pl-5 border-l-0 md:border-l border-gray-100">
      {children}
    </div>
  </section>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start mb-2 last:mb-0">
    <span className="mr-3 text-brand-gold mt-1.5">•</span>
    <span>{children}</span>
  </li>
);

// --- Pages ---

export const Privacy: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <LegalHeader 
        title="Политика конфиденциальности" 
        subtitle="Мы ценим ваше доверие и гарантируем полную защиту ваших персональных данных в соответствии с законодательством РФ."
        icon={Shield}
      />
      
      <LegalContent date="12 Октября 2023">
        <Section title="1. Общие положения">
          <p>
            Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации о физических лицах, 
            пользующихся сервисами Экспертного бюро «Советникъ» (далее – Сайт). Соблюдение конфиденциальности важно для нас, 
            поэтому мы разработали данную Политику, чтобы вы понимали, как мы собираем, используем, раскрываем и храним вашу информацию.
          </p>
          <p>
            Используя Сайт, Пользователь выражает свое полное согласие на сбор, обработку и использование своих персональных данных 
            в порядке и на условиях, предусмотренных настоящей Политикой.
          </p>
        </Section>

        <Section title="2. Сбор персональных данных">
          <p>Мы собираем только ту информацию, которая необходима для качественного предоставления услуг. К такой информации относятся:</p>
          <ul className="mt-4 space-y-2">
            <ListItem>Имя и фамилия (для обращения к вам);</ListItem>
            <ListItem>Контактный телефон (для оперативной связи);</ListItem>
            <ListItem>Адрес электронной почты (для отправки документов и отчетов);</ListItem>
            <ListItem>Данные, которые вы добровольно указываете при описании вашей ситуации в формах обратной связи.</ListItem>
          </ul>
        </Section>

        <Section title="3. Цели обработки данных">
          <p>Мы используем полученные данные исключительно для следующих целей:</p>
          <ul className="mt-4 space-y-2">
            <ListItem>Предоставление консультационных и экспертных услуг;</ListItem>
            <ListItem>Заключение договоров на оказание услуг;</ListItem>
            <ListItem>Уведомление о ходе выполнения работ по экспертизе;</ListItem>
            <ListItem>Улучшение качества обслуживания и работы сайта.</ListItem>
          </ul>
        </Section>

        <Section title="4. Защита информации">
          <p>
            Мы принимаем необходимые и достаточные организационные и технические меры для защиты персональной информации 
            Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, 
            распространения, а также от иных неправомерных действий третьих лиц.
          </p>
          <p>
            Доступ к персональным данным имеют только уполномоченные сотрудники Бюро, подписавшие соглашение о неразглашении конфиденциальной информации.
          </p>
        </Section>

        <Section title="5. Передача данных третьим лицам">
          <p>
            Мы не передаем ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ 
            (например, по запросу суда или правоохранительных органов), а также случаев, когда это необходимо для выполнения 
            обязательств перед вами (например, отправка заключения почтовой службой).
          </p>
        </Section>
        
        <div className="mt-12 p-6 bg-brand-50 rounded-lg border border-brand-100 text-sm md:text-base text-slate-600">
           <p className="font-bold text-brand-900 mb-2">Контактная информация</p>
           <p>
             По вопросам, связанным с обработкой персональных данных, вы можете обращаться по адресу электронной почты: 
             <a href="mailto:info@sovetnik-expert.ru" className="text-brand-red font-bold hover:underline ml-1">info@sovetnik-expert.ru</a>
           </p>
        </div>
      </LegalContent>
    </div>
  );
};

export const Terms: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <LegalHeader 
        title="Пользовательское соглашение" 
        subtitle="Правила использования сайта и условия предоставления информационных услуг Экспертного бюро «Советникъ»."
        icon={FileText}
      />
      
      <LegalContent date="01 Сентября 2023">
        <Section title="1. Термины и определения">
          <p>
            В настоящем Соглашении, если из текста прямо не вытекает иное, следующие термины имеют указанные значения:
          </p>
          <ul className="mt-4 space-y-2">
            <ListItem><strong>Бюро</strong> — Экспертное бюро «Советникъ».</ListItem>
            <ListItem><strong>Пользователь</strong> — любое физическое или юридическое лицо, использующее Сайт.</ListItem>
            <ListItem><strong>Сайт</strong> — информационный ресурс в сети Интернет, принадлежащий Бюро.</ListItem>
          </ul>
        </Section>

        <Section title="2. Предмет соглашения">
          <p>
            Настоящее Соглашение регулирует отношения между Бюро и Пользователем по поводу использования Сайта. 
            Информация, размещенная на Сайте, носит ознакомительный характер и не является публичной офертой, 
            определяемой положениями Статьи 437 ГК РФ, если иное прямо не указано.
          </p>
        </Section>

        <Section title="3. Интеллектуальная собственность">
          <p>
            Все материалы, представленные на Сайте, включая тексты, изображения, логотипы, дизайн и программный код, 
            являются исключительной собственностью Бюро или используются на основании лицензий.
          </p>
          <p>
            Полное или частичное копирование материалов Сайта без письменного разрешения Администрации запрещено. 
            При цитировании материалов ссылка на Сайт обязательна.
          </p>
        </Section>

        <Section title="4. Ограничение ответственности">
          <p>
            Бюро предпринимает все разумные меры для обеспечения точности и актуальности информации на Сайте, 
            однако не гарантирует ее абсолютную точность в каждый момент времени.
          </p>
          <p>
            Бюро не несет ответственности за любые убытки (прямые или косвенные), возникшие в связи с использованием 
            или невозможностью использования Сайта, а также в связи с использованием информации, размещенной на Сайте.
          </p>
        </Section>

        <Section title="5. Порядок оказания услуг">
          <p>
            Конкретные условия оказания услуг экспертизы и оценки (стоимость, сроки, порядок оплаты) определяются 
            в Договоре, который заключается индивидуально с каждым Клиентом после обсуждения деталей задачи.
          </p>
          <p>
            Оформление заявки на Сайте не накладывает на Пользователя обязательств по оплате услуг до момента подписания Договора.
          </p>
        </Section>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
           <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
             Экспертное Бюро "Советникъ"
           </span>
           <Lock className="text-slate-300 w-5 h-5" />
        </div>
      </LegalContent>
    </div>
  );
};