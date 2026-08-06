import https from 'https';

const API_TOKEN = 'y0__wgBEJLIlpYCGMKHRCCGzZqCGKOAOkyGBo17pnZszU5PuwjXm_E-';
const COUNTER_ID = 105184409; // ID Яндекс.Метрики

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
        'Accept-Language': 'ru',
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
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

const GLOBAL_NEGATIVE_KEYWORDS = [
  "вакансии", "работа", "обучение", "курсы", "скачать бесплатно", "своими руками",
  "реферат", "курсовая", "диплом", "образец", "бланк", "бесплатно", "без регистрации",
  "ютуб", "видео", "отзывы сотрудников", "зарплата", "hh ru", "авито", "бу", "дешево", "форум"
];

async function createExtensionsAndSitelinks() {
  console.log('1. Создание уточнений (AdExtensions)...');
  let extensionIds = [];
  try {
    const extRes = await apiRequest('adextensions', 'add', {
      AdExtensions: [
        { Callout: { CalloutText: "По 73-ФЗ для судов" } },
        { Callout: { CalloutText: "Опыт экспертов 15 лет" } },
        { Callout: { CalloutText: "Члены СРО экспертов" } },
        { Callout: { CalloutText: "Судебная защита" } }
      ]
    });
    extensionIds = extRes.AddResults.map(r => r.Id).filter(Boolean);
    console.log(`Уточнения созданы: ${extensionIds.join(', ')}`);
  } catch (e) {
    console.log('Уточнения уже созданы или пропущены:', e.message);
  }

  console.log('2. Создание быстрых ссылок (Sitelinks)...');
  let sitelinkSetId = null;
  try {
    const sitelinksRes = await apiRequest('sitelinks', 'add', {
      SitelinksSets: [
        {
          Sitelinks: [
            {
              Title: "Прайс-лист услуг",
              Href: "https://buro-sovetnik.com/price",
              Description: "Официальные тарифы и сроки выполнения"
            },
            {
              Title: "О Бюро и Лицензии",
              Href: "https://buro-sovetnik.com/about",
              Description: "Сертификаты, СРО и аккредитации"
            },
            {
              Title: "Калькулятор / Квиз",
              Href: "https://buro-sovetnik.com/#quiz",
              Description: "Расчет стоимости экспертизы онлайн"
            },
            {
              Title: "Контакты и Офис",
              Href: "https://buro-sovetnik.com/contacts",
              Description: "Адрес, телефон и реквизиты компании"
            }
          ]
        }
      ]
    });
    sitelinkSetId = sitelinksRes.AddResults[0]?.Id;
    console.log(`Набор быстрых ссылок создан: ${sitelinkSetId}`);
  } catch (e) {
    console.log('Быстрые ссылки уже существуют или пропущены:', e.message);
  }

  return { extensionIds, sitelinkSetId };
}

const CAMPAIGNS_CONFIG = [
  // 1. Финансы и досудебка (Башкортостан)
  {
    name: "[Поиск | Башкирия] Экспертиза Финансов, Аудит, Банкротство, Форензик",
    regionIds: [11111], // Башкортостан
    weeklySpendLimit: 3000000000, // 3000 руб
    groups: [
      {
        name: "Финансово-экономическая экспертиза",
        displayUrl: "финэкспертиза",
        keywords: [
          "судебная финансово экономическая экспертиза",
          "финансово экономическая экспертиза уфа",
          "досудебная финансовая экспертиза",
          "независимая финансовая экспертиза для суда",
          "финансовая экспертиза предприятия",
          "назначение финансово экономической экспертизы"
        ],
        ad: {
          title: "Финансово-экономическая экспертиза",
          title2: "Официально по 73-ФЗ в Уфе и РБ",
          text: "Процессуальный анализ активов, аудит для суда и арбитража. Опыт экспертов 15+ лет. Защита в суде!",
          href: "https://buro-sovetnik.com/services/financial-economic"
        }
      },
      {
        name: "Экспертиза банкротства и субсидиарки",
        displayUrl: "банкротство",
        keywords: [
          "экспертиза преднамеренного банкротства",
          "экспертиза фиктивного банкротства",
          "экспертиза субсидиарной ответственности",
          "финансовый анализ при банкротстве для суда",
          "форензик аудит расследование"
        ],
        ad: {
          title: "Экспертиза при банкротстве и КДЛ",
          title2: "Форензик и выявление активов",
          text: "Анализ преднамеренного банкротства, защита от субсидиарной ответственности. Заключение для суда!",
          href: "https://buro-sovetnik.com/services/bankruptcy"
        }
      },
      {
        name: "Бухгалтерская и налоговая экспертиза",
        displayUrl: "бухаудит",
        keywords: [
          "судебно бухгалтерская экспертиза",
          "налоговая экспертиза для суда",
          "бухгалтерская экспертиза уфа",
          "экспертиза налоговых доначислений",
          "судебная бухгалтерская экспертиза стоимость"
        ],
        ad: {
          title: "Бухгалтерская и налоговая экспертиза",
          title2: "Для арбитражных споров и суда",
          text: "Ревизия первичных документов, оспаривание доначислений ФНС. Официальное заключение эксперта!",
          href: "https://buro-sovetnik.com/services/accounting"
        }
      }
    ]
  },

  // 2. Строительная экспертиза и заливы (Башкортостан)
  {
    name: "[Поиск | Башкирия] Строительная Экспертиза, Заливы, Сметы, Приемка",
    regionIds: [11111],
    weeklySpendLimit: 3000000000,
    groups: [
      {
        name: "Строительно-техническая экспертиза",
        displayUrl: "стройэксперт",
        keywords: [
          "независимая строительная экспертиза уфа",
          "судебная строительно техническая экспертиза",
          "досудебная строительная экспертиза",
          "строительная экспертиза зданий и сооружений",
          "экспертиза качества строительных работ уфа",
          "техническое обследование зданий уфа"
        ],
        ad: {
          title: "Строительная экспертиза в Уфе и РБ",
          title2: "Досудебная и судебная по 73-ФЗ",
          text: "Инструментальный контроль дефектов, проверка объемов работ и соответствия СНиП. Выезд эксперта!",
          href: "https://buro-sovetnik.com/services/construction"
        }
      },
      {
        name: "Экспертиза после залива и ущерба",
        displayUrl: "залив",
        keywords: [
          "независимая экспертиза после залива квартиры",
          "экспертиза ущерба от залива уфа",
          "оценка ущерба после затопления квартиры",
          "судебная экспертиза залива квартиры",
          "акт оценки ущерба от залива для суда"
        ],
        ad: {
          title: "Экспертиза после залива квартиры",
          title2: "Точный расчет ущерба для суда",
          text: "Фиксация всех скрытых повреждений, составление сметы на ремонт. Взыскание ущерба 100%!",
          href: "https://buro-sovetnik.com/services/damage-expert"
        }
      },
      {
        name: "Экспертиза смет и приемка объектов",
        displayUrl: "сметы",
        keywords: [
          "экспертиза сметной документации уфа",
          "проверка смет на строительные работы",
          "приемка квартиры от застройщика экспертиза",
          "экспертиза частного дома перед покупкой"
        ],
        ad: {
          title: "Экспертиза смет и приемка жилья",
          title2: "Выявим завышение цен и дефекты",
          text: "Проверка обоснованности смет, тепловизионный осмотр, выявление строительного брака.",
          href: "https://buro-sovetnik.com/services/estimates"
        }
      }
    ]
  },

  // 3. Кадастр, Землеустройство, Почерковедческая экспертиза (Башкортостан)
  {
    name: "[Поиск | Башкирия] Кадастр, Землеустройство, Почерковедческая Экспертиза",
    regionIds: [11111],
    weeklySpendLimit: 3000000000,
    groups: [
      {
        name: "Землеустроительная и межевая экспертиза",
        displayUrl: "землеустройство",
        keywords: [
          "землеустроительная экспертиза уфа",
          "судебная землеустроительная экспертиза",
          "экспертиза границ земельного участка",
          "исправление реестровой ошибки земельного участка",
          "экспертиза по межевым спорам",
          "раздел земельного участка в судебном порядке"
        ],
        ad: {
          title: "Землеустроительная экспертиза",
          title2: "Межевые споры и границы в суде",
          text: "Выявление наложений в ЕГРН, расчет вариантов раздела земли и сервитута. Геодезический выезд!",
          href: "https://buro-sovetnik.com/services/category/land"
        }
      },
      {
        name: "Почерковедческая экспертиза и давность",
        displayUrl: "почерковед",
        keywords: [
          "почерковедческая экспертиза уфа",
          "судебная экспертиза подписи уфа",
          "экспертиза подлинности подписи на договоре",
          "экспертиза давности документа уфа",
          "криминалистическая экспертиза почерка",
          "почерковедческая экспертиза для суда стоимость"
        ],
        ad: {
          title: "Почерковедческая экспертиза",
          title2: "Проверка подписи и давности в Уфе",
          text: "Установление автора подписи и признаков подделки документов. Официальное заключение для суда!",
          href: "https://buro-sovetnik.com/services/category/handwriting"
        }
      }
    ]
  },

  // 4. Оценка бизнеса и коммерческих активов (Вся Россия)
  {
    name: "[Поиск + РСЯ | РФ] Оценка Бизнеса, Предприятий, Акций и Активов",
    regionIds: [225], // Вся РФ
    weeklySpendLimit: 5000000000, // 5000 руб
    groups: [
      {
        name: "Оценка бизнеса и долей ООО/АО",
        displayUrl: "оценкабизнеса",
        keywords: [
          "оценка стоимости бизнеса ооо",
          "независимая оценка бизнеса предприятия",
          "оценка акций компании для суда",
          "оценка доли в уставном капитале ооо",
          "оценка бизнеса для продажи инвестору",
          "оценка бизнеса при слиянии и поглощении m a",
          "оценка чистых активов предприятия"
        ],
        ad: {
          title: "Оценка бизнеса и долей ООО / АО",
          title2: "По всей России. Отчет по ФСО",
          text: "Оценка предприятий, акций и чистых активов для сделок, суда, залога и выхода участников. Опыт 15+ лет!",
          href: "https://buro-sovetnik.com/services/business-valuation"
        }
      },
      {
        name: "Оценка коммерческой недвижимости и оборудования",
        displayUrl: "комнедвижимость",
        keywords: [
          "оценка коммерческой недвижимости для залога",
          "оценка производственного оборудования предприятия",
          "оценка складских и торговых комплексов",
          "оценка имущественного комплекса завода",
          "оспаривание кадастровой стоимости коммерческой недвижимости"
        ],
        ad: {
          title: "Оценка коммерческой недвижимости",
          title2: "Здания, склады, оборудование по РФ",
          text: "Рыночная оценка для кредитования, баланса и суда. Аккредитованные оценщики. Звоните!",
          href: "https://buro-sovetnik.com/services/commercial-valuation"
        }
      }
    ]
  },

  // 5. Оценка интеллектуальной собственности, патентов и НМА (Вся Россия)
  {
    name: "[Поиск + РСЯ | РФ] Оценка Интеллектуальной Собственности, Патентов, ПО, НМА",
    regionIds: [225], // Вся РФ
    weeklySpendLimit: 5000000000,
    groups: [
      {
        name: "Оценка патентов и ноу-хау",
        displayUrl: "патенты",
        keywords: [
          "оценка стоимости патента на изобретение",
          "оценка патентов и полезных моделей",
          "оценка ноу хау и технологий",
          "оценка интеллектуальной собственности для суда",
          "оценка стоимости лицензионного договора",
          "оценка патента для постановки на баланс"
        ],
        ad: {
          title: "Оценка патентов и технологий",
          title2: "Капитализация НМА по всей РФ",
          text: "Независимая оценка патентов на изобретения, ноу-хау и технологий. Отчет об оценке для суда и банка!",
          href: "https://buro-sovetnik.com/services/patent-valuation"
        }
      },
      {
        name: "Оценка программного обеспечения и товарных знаков",
        displayUrl: "оценкасофта",
        keywords: [
          "оценка стоимости программного обеспечения по",
          "оценка товарного знака бренда",
          "оценка сайта и баз данных для баланса",
          "оценка исключительных прав на софт",
          "капитализация нематериальных активов компании",
          "оценка нематериальных активов нма предприятия"
        ],
        ad: {
          title: "Оценка ПО и товарных знаков",
          title2: "Внесение софта и брендов в уставный капитал",
          text: "Оценка IT-продуктов, баз данных и брендов. Оптимизация налога на прибыль и баланса по ФСО!",
          href: "https://buro-sovetnik.com/services/software-valuation"
        }
      }
    ]
  }
];

async function main() {
  console.log('--- НАЧАЛО СОЗДАНИЯ КАМПАНИЙ ДЛЯ БЮРО СОВЕТНИКЪ ---');
  
  const { extensionIds, sitelinkSetId } = await createExtensionsAndSitelinks();

  for (const [idx, cfg] of CAMPAIGNS_CONFIG.entries()) {
    console.log(`\nСоздание кампании ${idx + 1}/${CAMPAIGNS_CONFIG.length}: ${cfg.name}...`);
    
    const today = new Date().toISOString().split('T')[0];
    const campAddRes = await apiRequest('campaigns', 'add', {
      Campaigns: [
        {
          Name: cfg.name,
          StartDate: today,
          NegativeKeywords: { Items: GLOBAL_NEGATIVE_KEYWORDS },
          TextCampaign: {
            BiddingStrategy: {
              Search: {
                BiddingStrategyType: "WB_MAXIMUM_CLICKS",
                WbMaximumClicks: {
                  WeeklySpendLimit: cfg.weeklySpendLimit
                }
              },
              Network: {
                BiddingStrategyType: cfg.regionIds.includes(225) ? "NETWORK_DEFAULT" : "SERVING_OFF"
              }
            },
            CounterIds: { Items: [COUNTER_ID] }
          }
        }
      ]
    });

    const campaignId = campAddRes.AddResults[0]?.Id;
    if (!campaignId) {
      console.error(`Ошибка создания кампании: ${JSON.stringify(campAddRes)}`);
      continue;
    }
    console.log(`Кампания создана! ID: ${campaignId}`);

    for (const groupCfg of groupCfgList(cfg.groups)) {
      console.log(`  -> Добавление группы: ${groupCfg.name}...`);
      const groupAddRes = await apiRequest('adgroups', 'add', {
        AdGroups: [
          {
            Name: groupCfg.name,
            CampaignId: campaignId,
            RegionIds: cfg.regionIds
          }
        ]
      });

      const groupId = groupAddRes.AddResults[0]?.Id;
      if (!groupId) {
        console.error(`  Ошибка создания группы: ${JSON.stringify(groupAddRes)}`);
        continue;
      }
      console.log(`  Группа создана! ID: ${groupId}`);

      // Добавление ключевых слов
      const kwItems = groupCfg.keywords.map(kw => ({
        Keyword: kw,
        AdGroupId: groupId
      }));
      // Добавим автотаргетинг
      kwItems.push({
        Keyword: "---autotargeting",
        AdGroupId: groupId
      });

      await apiRequest('keywords', 'add', { Keywords: kwItems });
      console.log(`  Ключевые слова (${kwItems.length} шт.) добавлены.`);

      // Добавление объявления
      const finalHref = `${groupCfg.ad.href}?utm_source=yandex&utm_medium=cpc&utm_campaign=${campaignId}&utm_content=${groupId}&utm_term={keyword}`;
      
      const textAdData = {
        Title: groupCfg.ad.title,
        Title2: groupCfg.ad.title2,
        Text: groupCfg.ad.text,
        Href: finalHref,
        DisplayUrlPath: groupCfg.displayUrl
      };

      if (sitelinkSetId) {
        textAdData.SitelinkSetId = sitelinkSetId;
      }
      if (extensionIds && extensionIds.length > 0) {
        textAdData.AdExtensionIds = extensionIds;
      }

      await apiRequest('ads', 'add', {
        Ads: [
          {
            AdGroupId: groupId,
            TextAd: textAdData
          }
        ]
      });
      console.log(`  Объявление добавлено.`);
    }
  }

  console.log('\n=========================================');
  console.log(' ВСЕ 5 КАМПАНИЙ УСПЕШНО СОЗДАНЫ И НАСТРОЕНЫ!');
  console.log('=========================================');
}

function groupCfgList(groups) {
  return groups;
}

main().catch(err => {
  console.error('CRITICAL ERROR:', err);
});
