const fs = require('fs');

// --- НАСТРОЙКИ ---
const SITE_URL = 'https://buro-sovetnik.com';
const COMPANY_NAME = 'Советникъ — Экспертное Бюро';
const COMPANY_ID = 'sovetnik';
const DATE = new Date().toISOString().split('T')[0] + 'T00:00:00+03:00';

// --- ДАННЫЕ УСЛУГ (ВКЛЮЧАЯ СКРЫТЫЕ SEO СТРАНИЦЫ) ---
const SERVICES = [
    {
        id: "financial-economic",
        title: "Финансово-экономическая экспертиза",
        desc: "Глубокий анализ финансовых показателей компании для выявления причин неплатежеспособности, фиктивного банкротства или хищений.",
        price: 40000,
        category: "Финансовая экспертиза",
        image: "finance_audit.webp"
    },
    {
        id: "accounting",
        title: "Бухгалтерская экспертиза",
        desc: "Анализ бухгалтерских записей, отчетности и первичных документов для выявления искажений, нарушений и фактов хищения.",
        price: 40000,
        category: "Финансовая экспертиза",
        image: "finance_accounting.webp"
    },
    {
        id: "tax-expertise",
        title: "Налоговая экспертиза",
        desc: "Проверка правильности исчисления и уплаты налогов, анализ налоговых деклараций и расчетов.",
        price: 40000,
        category: "Финансовая экспертиза",
        image: "finance_audit.webp"
    },
    {
        id: "financial-calc",
        title: "Экспертиза финансовых расчетов",
        desc: "Проверка правильности расчетов по займам, кредитам, процентам, дивидендам.",
        price: 40000,
        category: "Финансовая экспертиза",
        image: "finance_accounting.webp"
    },
    {
        id: "pre-trial-construction",
        title: "Экспертиза качества строительства",
        desc: "Оценка соответствия выполненных строительных работ нормам СНиП и ГОСТ. Приемка квартир.",
        price: 10000,
        category: "Строительная экспертиза",
        image: "construction_pretrial.webp"
    },
    {
        id: "construction-volumes",
        title: "Экспертиза объемов и стоимости работ",
        desc: "Проверка смет, актов КС-2/КС-3 и фактически объемов строительства.",
        price: 10000,
        category: "Строительная экспертиза",
        image: "construction_pretrial.webp"
    },
    {
        id: "forensic-construction",
        title: "Судебная строительная экспертиза",
        desc: "Независимое исследование зданий и сооружений по определению суда.",
        price: 20000,
        category: "Строительная экспертиза",
        image: "construction_forensic.webp"
    },
    {
        id: "construction-general",
        title: "Техническое обследование зданий",
        desc: "Оценка технического состояния несущих конструкций и инженерных систем.",
        price: 10000,
        category: "Строительная экспертиза",
        image: "construction_tech.webp"
    },
    {
        id: "damage",
        title: "Экспертиза ущерба от залива/пожара",
        desc: "Оценка стоимости восстановительного ремонта после аварий.",
        price: 10000,
        category: "Строительная экспертиза",
        image: "construction_damage.webp"
    },
    {
        id: "business-valuation",
        title: "Оценка стоимости бизнеса (ООО/АО)",
        desc: "Оценка рыночной стоимости долей, акций и активов предприятия.",
        price: 30000,
        category: "Оценка",
        image: "valuation_business.webp"
    },
    {
        id: "apartment-valuation",
        title: "Оценка недвижимости (квартиры)",
        desc: "Оценка рыночной стоимости жилья для ипотеки и опеки.",
        price: 5000,
        category: "Оценка",
        image: "valuation_apartment.webp"
    },
    {
        id: "land-valuation",
        title: "Оценка земельных участков",
        desc: "Оценка рыночной стоимости земли всех категорий.",
        price: 10000,
        category: "Оценка",
        image: "valuation_land.webp"
    },
    {
        id: "land-surveying",
        title: "Землеустроительная экспертиза",
        desc: "Установление границ участков, межевые споры.",
        price: 20000,
        category: "Земельная экспертиза",
        image: "construction_surveying.webp"
    },
    {
        id: "handwriting",
        title: "Почерковедческая экспертиза",
        desc: "Установление подлинности подписи и рукописного текста.",
        price: 15000,
        category: "Почерковедческая экспертиза",
        image: "finance_handwriting.webp"
    },
    {
        id: "legal-support",
        title: "Юридическое сопровождение бизнеса",
        desc: "Комплексная защита интересов компании в судах.",
        price: 25000,
        category: "Юридические услуги",
        image: "finance_legal.webp"
    },
    {
        id: "legal-arbitration",
        title: "Представительство в арбитражном суде",
        desc: "Ведение экономических споров во всех инстанциях.",
        price: 30000,
        category: "Юридические услуги",
        image: "finance_legal.webp"
    },
    // --- SEO HIDDEN SERVICES ---
    {
        id: "water-damage-court",
        title: "Оценка ущерба от залива для суда",
        desc: "Профессиональная оценка стоимости восстановительного ремонта после залива. Заключение по ФЗ-73.",
        price: 15000,
        category: "Строительная экспертиза",
        image: "water_damage_expert_1771709902470.png"
    },
    {
        id: "road-volume-expertise",
        title: "Экспертиза объемов дорожных работ",
        desc: "Контрольные обмеры и проверка фактически выполненного асфальтирования по ГОСТ.",
        price: 35000,
        category: "Строительная экспертиза",
        image: "road_construction_expert_1771709915978.png"
    },
    {
        id: "estimate-verification",
        title: "Проверка достоверности сметной стоимости",
        desc: "Анализ смет на предмет обоснованности цен и объемов. Экономия до 30% бюджета.",
        price: 20000,
        category: "Строительная экспертиза",
        image: "construction_estimate_expert_1771709934929.png"
    },
    {
        id: "equipment-valuation",
        title: "Оценка оборудования и станков",
        desc: "Рыночная оценка промышленного оборудования и линий для банков и залога.",
        price: 25000,
        category: "Оценка",
        image: "industrial_machinery_valuation_1771709948073.png"
    },
    {
        id: "project-docs-audit",
        title: "Аудит разделов проектной документации",
        desc: "Экспертиза разделов АР, КР, ИОС на соответствие нормам и ТЗ.",
        price: 15000,
        category: "Строительная экспертиза",
        image: "blueprints_digital_audit_1771709962079.png"
    }
];

// --- ГЕНЕРАЦИЯ XML ---
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${DATE}">
    <shop>
        <name>${COMPANY_NAME}</name>
        <company>${COMPANY_NAME}</company>
        <url>${SITE_URL}</url>
        <currencies>
            <currency id="RUR" rate="1"/>
        </currencies>
        <categories>
            <category id="1">Финансовая экспертиза</category>
            <category id="2">Строительная экспертиза</category>
            <category id="3">Оценка</category>
            <category id="4">Земельная экспертиза</category>
            <category id="5">Почерковедческая экспертиза</category>
            <category id="6">Юридические услуги</category>
        </categories>
        <offers>
            ${SERVICES.map(service => {
    let catId = 1;
    if (service.category === 'Строительная экспертиза') catId = 2;
    if (service.category === 'Оценка') catId = 3;
    if (service.category === 'Земельная экспертиза') catId = 4;
    if (service.category === 'Почерковедческая экспертиза') catId = 5;
    if (service.category === 'Юридические услуги') catId = 6;

    return `
            <offer id="${service.id}">
                <name>${COMPANY_NAME}</name>
                <url>${SITE_URL}/services/${service.id}</url>
                <price>${service.price}</price>
                <currencyId>RUR</currencyId>
                <categoryId>${catId}</categoryId>
                <picture>${SITE_URL}/assets/feed/${service.image}</picture>
                <description>${service.title}. ${service.desc}</description>
                <delivery>false</delivery>
                <pickup>false</pickup>
                <store>false</store>
                <set-ids>sovetnik_services</set-ids>
                <param name="Рейтинг">5.0</param>
                <param name="Число отзывов">54</param>
                <param name="Годы опыта">15</param>
                <param name="Регион">Россия</param>
                <param name="Конверсия">100</param>
                <param name="Исполнитель">${COMPANY_NAME}</param>
                <param name="Тип услуги">${service.category}</param>
                <param name="Формат работы">В офисе и с выездом</param>
                <param name="Предмет экспертизы">Документы, объекты, недвижимость</param>
            </offer>`;
}).join('')}
        </offers>
    </shop>
</yml_catalog>`;

// --- ЗАПИСЬ ---
fs.writeFileSync('public/yandex-feed.yml', xml);
console.log('✅ Yandex Feed Generated Successfully with HIDDEN services!');
