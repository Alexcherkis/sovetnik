import https from 'https';

const API_TOKEN = 'y0__wgBEJLIlpYCGMKHRCCGzZqCGKOAOkyGBo17pnZszU5PuwjXm_E-';
const CLIENT_LOGIN = 'e-20085514';
const CAMPAIGN_ID = 706426574;

function apiRequest(service, method, params) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ method, params });
    const options = {
      hostname: 'api.direct.yandex.com',
      port: 443,
      path: `/json/v5/${service}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Client-Login': CLIENT_LOGIN,
        'Accept-Language': 'ru',
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(`API Error [${service}.${method}]: ${JSON.stringify(parsed.error)}`));
          } else {
            resolve(parsed.result);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}, data: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// Новые быстрые ссылки с B2B и арбитражным фокусом
async function createHighTicketSitelinks() {
  console.log('1. Создание B2B/High-Ticket быстрых ссылок...');
  const utm = `?utm_source=yandex&utm_medium=cpc&utm_campaign=${CAMPAIGN_ID}&utm_content=sitelink`;
  
  const res = await apiRequest('sitelinks', 'add', {
    SitelinksSets: [
      {
        Sitelinks: [
          {
            Title: "Арбитражная практика",
            Href: `https://buro-sovetnik.com/blog${utm}`,
            Description: "Опыт ведения строительных споров в суде"
          },
          {
            Title: "Реестр экспертов и СРО",
            Href: `https://buro-sovetnik.com/about${utm}`,
            Description: "Допуски НОПРИЗ, СРО и поверка приборов"
          },
          {
            Title: "Оспаривание КС-2 и КС-3",
            Href: `https://buro-sovetnik.com/services/construction${utm}`,
            Description: "Проверка объемов и завышения смет подряда"
          },
          {
            Title: "Рецензии на экспертизы",
            Href: `https://buro-sovetnik.com/services/pre-trial-construction${utm}`,
            Description: "Оспаривание ошибочных отчетов оппонентов"
          },
          {
            Title: "Оценка ущерба складов и ТЦ",
            Href: `https://buro-sovetnik.com/services/damage-expert${utm}`,
            Description: "Заливы и пожары коммерческих объектов"
          },
          {
            Title: "Тарифы для юрлиц",
            Href: `https://buro-sovetnik.com/price${utm}`,
            Description: "Официальный договор, расчет по безналу"
          },
          {
            Title: "Калькулятор иска",
            Href: `https://buro-sovetnik.com/#quiz`,
            Description: "Предварительный расчет ущерба и спора"
          },
          {
            Title: "Контакты экспертов",
            Href: `https://buro-sovetnik.com/contacts${utm}`,
            Description: "Офис в Уфе, выезд по Башкортостану"
          }
        ]
      }
    ]
  });

  const sitelinkSetId = res.AddResults[0]?.Id;
  console.log(`Набор B2B быстрых ссылок создан! ID: ${sitelinkSetId}`);
  return sitelinkSetId;
}

// Дополнительные минус-слова для отсечения мелких бытовых чеков
const HIGH_TICKET_NEGATIVES = [
  "бесплатно", "своими руками", "!как составить", "образец", "бланк", "скачать",
  "реферат", "диплом", "курсовая", "книга", "статья", "форум", "отзывы сотрудников",
  "вакансии", "работа", "обучение", "курсы", "гост", "снип", "авито", "бу", "клининг", "просушка",
  "дешево", "недорого", "эконом", "обои", "линолеум", "частный мастер", "шабашники"
];

async function main() {
  console.log('--- ПЕРЕВОД КАМПАНИИ 706426574 НА ВЫСОКИЙ B2B ЧЕК ---');

  const sitelinkSetId = await createHighTicketSitelinks();

  // 1. Обновление глобальных минус-слов кампании
  console.log('\n2. Обновление минус-слов...');
  await apiRequest('campaigns', 'update', {
    Campaigns: [
      {
        Id: CAMPAIGN_ID,
        NegativeKeywords: { Items: HIGH_TICKET_NEGATIVES }
      }
    ]
  });

  // 2. Обновление объявлений в группе 5702010666 (Строительная экспертиза / Арбитраж / Подряд)
  console.log('\n3. Обновление объявлений группы строительной экспертизы под B2B чеки...');
  const utmMain1 = `https://buro-sovetnik.com/services/construction?utm_source=yandex&utm_medium=cpc&utm_campaign=${CAMPAIGN_ID}&utm_content={ad_id}&utm_term={keyword}`;

  const adsGroup1 = [
    {
      Id: 17545642684,
      TextAd: {
        Title: "Судебная строительная экспертиза",
        Title2: "Для арбитража и споров по 73-ФЗ",
        Text: "Проверка объемов работ, смет, КС-2/КС-3. Допуски СРО и НОПРИЗ. Защита в суде!",
        Href: utmMain1,
        DisplayUrlPath: "арбитраж-эксперт",
        SitelinkSetId: sitelinkSetId
      }
    },
    {
      Id: 17545648906,
      TextAd: {
        Title: "Строительная экспертиза в суде",
        Title2: "Опыт экспертов 15+ лет в Уфе",
        Text: "Инструментальный аудит объектов капстроительства. Заключения для арбитража!",
        Href: utmMain1,
        DisplayUrlPath: "стройка-суд",
        SitelinkSetId: sitelinkSetId
      }
    },
    {
      Id: 17545649208,
      TextAd: {
        Title: "Оспаривание смет и актов КС-2",
        Title2: "Строительный аудит для бизнеса",
        Text: "Выявим завышение объемов и цен, скроем брак подрядчика. Официальный отчет!",
        Href: utmMain1,
        DisplayUrlPath: "споры-подряд",
        SitelinkSetId: sitelinkSetId
      }
    }
  ];
  await apiRequest('ads', 'update', { Ads: adsGroup1 });
  console.log('Объявления группы строительства обновлены на High-Ticket B2B формат.');

  // 3. Обновление объявлений в группе 5702015220 (Оценка крупного ущерба / Заливы / Пожары)
  console.log('\n4. Обновление объявлений группы оценки ущерба...');
  const utmMain3 = `https://buro-sovetnik.com/services/damage-expert?utm_source=yandex&utm_medium=cpc&utm_campaign=${CAMPAIGN_ID}&utm_content={ad_id}&utm_term={keyword}`;

  const adsGroup3 = [
    {
      Id: 17545666550,
      TextAd: {
        Title: "Судебная экспертиза ущерба и заливов",
        Title2: "Взыскание 100% ущерба в суде",
        Text: "Оценка ущерба коммерческих зданий, складов и квартир по ФСО. Отчет для суда!",
        Href: utmMain3,
        DisplayUrlPath: "ущерб-арбитраж",
        SitelinkSetId: sitelinkSetId
      }
    },
    {
      Id: 17545666551,
      TextAd: {
        Title: "Оспаривание сметы ущерба в суде",
        Title2: "Снизим сумму иска до 50%",
        Text: "Оппонент завысил сумму ущерба? Найдем ошибки и необоснованные расчеты. Звоните!",
        Href: utmMain3,
        DisplayUrlPath: "защита-в-суде",
        SitelinkSetId: sitelinkSetId
      }
    },
    {
      Id: 17545666552,
      TextAd: {
        Title: "Оценка ущерба после пожара и залива",
        Title2: "Бюро Советникъ. Эксперты СРО",
        Text: "Инструментальная фиксация скрытых дефектов конструкций. Составление сметы!",
        Href: utmMain3,
        DisplayUrlPath: "оценка-ущерба",
        SitelinkSetId: sitelinkSetId
      }
    }
  ];
  await apiRequest('ads', 'update', { Ads: adsGroup3 });
  console.log('Объявления группы ущерба обновлены на High-Ticket формат.');

  // 4. Добавление B2B высокочековых ключевых фраз
  console.log('\n5. Добавление B2B целевых ключевых фраз...');
  const highTicketKws = [
    // В группу 5702010666
    { Keyword: "строительно техническая экспертиза для арбитража", AdGroupId: 5702010666 },
    { Keyword: "экспертиза объемов выполненных строительных работ", AdGroupId: 5702010666 },
    { Keyword: "оспаривание актов кс 2 кс 3 экспертиза", AdGroupId: 5702010666 },
    { Keyword: "экспертиза по договору строительного подряда", AdGroupId: 5702010666 },
    { Keyword: "рецензия на строительную экспертизу для суда", AdGroupId: 5702010666 },
    { Keyword: "техническое обследование зданий и сооружений уфа", AdGroupId: 5702010666 },
    { Keyword: "экспертиза качества строительства коммерческих объектов", AdGroupId: 5702010666 },

    // В группу 5702015220
    { Keyword: "оценка ущерба коммерческой недвижимости залив", AdGroupId: 5702015220 },
    { Keyword: "экспертиза ущерба после пожара здания склада", AdGroupId: 5702015220 },
    { Keyword: "судебная экспертиза ущерба от залива арбитраж", AdGroupId: 5702015220 },
    { Keyword: "оспорить смету ущерба от залива в суде", AdGroupId: 5702015220 }
  ];

  try {
    const kwRes = await apiRequest('keywords', 'add', { Keywords: highTicketKws });
    console.log('B2B ключевые фразы добавлены:', kwRes.AddResults.length, 'шт.');
  } catch (e) {
    console.log('Ключевые фразы добавлены частично или пропущены:', e.message);
  }

  console.log('\n======================================================');
  console.log('КАМПАНИЯ УСПЕШНО ПЕРЕНАСТРОЕНА НА ВЫСОКИЙ B2B ЧЕК!');
  console.log('======================================================');
}

main().catch(console.error);
