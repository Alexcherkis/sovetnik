import https from 'https';

const API_TOKEN = 'y0__wgBEJLIlpYCGMKHRCCGzZqCGKOAOkyGBo17pnZszU5PuwjXm_E-';
const CLIENT_LOGIN = 'e-20085514';
const CAMPAIGN_ID = 706426574;
const SITELINK_SET_ID = 1499877090; // Созданный ранее набор из 8 быстрых ссылок

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

const GLOBAL_NEGATIVES = [
  "бесплатно", "своими руками", "!как составить", "образец", "бланк", "скачать",
  "реферат", "диплом", "курсовая", "книга", "статья", "форум", "отзывы сотрудников",
  "вакансии", "работа", "обучение", "курсы", "гост", "снип", "авито", "бу", "клининг", "просушка"
];

async function main() {
  console.log(`--- ОБНОВЛЕНИЕ КАМПАНИИ ${CAMPAIGN_ID} ---`);

  // 1. Обновление параметров кампании (Название + Минус-слова + Настройки)
  console.log('1. Обновление параметров кампании...');
  await apiRequest('campaigns', 'update', {
    Campaigns: [
      {
        Id: CAMPAIGN_ID,
        Name: "[Поиск | Уфа + РБ] Строительная экспертиза, Заливы, Приемка новостроек",
        NegativeKeywords: { Items: GLOBAL_NEGATIVES },
        TextCampaign: {
          Settings: [
            { Option: "ADD_METRICA_TAG", Value: "YES" },
            { Option: "ENABLE_EXTENDED_AD_TITLE", Value: "YES" },
            { Option: "ENABLE_SITE_MONITORING", Value: "YES" }
          ]
        }
      }
    ]
  });
  console.log('Параметры кампании успешно обновлены!');

  // 2. Обновление объявлений группы 5702010666 (Строительно-техническая экспертиза)
  console.log('\n2. Обновление объявлений группы "Независимая строительная экспертиза"...');
  const utmMain1 = `https://buro-sovetnik.com/services/construction?utm_source=yandex&utm_medium=cpc&utm_campaign=${CAMPAIGN_ID}&utm_content={ad_id}&utm_term={keyword}`;

  const adsGroup1 = [
    {
      Id: 17545642684,
      TextAd: {
        Title: "Независимая строительная экспертиза",
        Title2: "Взыщем 100% ущерба по 73-ФЗ",
        Text: "Экспертиза качества ремонта и стройки. Заключение для суда. Допуск СРО!",
        Href: utmMain1,
        DisplayUrlPath: "стройэкспертиза",
        SitelinkSetId: SITELINK_SET_ID
      }
    },
    {
      Id: 17545648906,
      TextAd: {
        Title: "Строительная экспертиза в Уфе",
        Title2: "Бюро Советникъ. Опыт 15 лет",
        Text: "Выезд эксперта на объект. Инструментальный контроль. Заключение для суда!",
        Href: utmMain1,
        DisplayUrlPath: "стройэкспертиза",
        SitelinkSetId: SITELINK_SET_ID
      }
    },
    {
      Id: 17545649208,
      TextAd: {
        Title: "Экспертиза некачественного ремонта",
        Title2: "Найдем скрытые дефекты по ГОСТ",
        Text: "Поможем вернуть деньги за плохой ремонт. Составим смету недостатков для суда!",
        Href: utmMain1,
        DisplayUrlPath: "стройэкспертиза",
        SitelinkSetId: SITELINK_SET_ID
      }
    }
  ];

  const res1 = await apiRequest('ads', 'update', { Ads: adsGroup1 });
  console.log(`Объявления строительной экспертизы обновлены:`, JSON.stringify(res1));

  // 3. Обновление объявлений группы 5702015220 (Оценка ущерба / Залив)
  console.log('\n3. Обновление объявлений группы "Оценка ущерба (Залив / Пожар)"...');
  const utmMain3 = `https://buro-sovetnik.com/services/damage-expert?utm_source=yandex&utm_medium=cpc&utm_campaign=${CAMPAIGN_ID}&utm_content={ad_id}&utm_term={keyword}`;

  const adsGroup3 = [
    {
      Id: 17545666550,
      TextAd: {
        Title: "Независимая экспертиза после залива",
        Title2: "Взыщем 100% ущерба через суд",
        Text: "Затопили соседи или УК? Оценим ущерб ремонту и мебели. Отчет для суда по ФСО!",
        Href: utmMain3,
        DisplayUrlPath: "ущерб-залив",
        SitelinkSetId: SITELINK_SET_ID
      }
    },
    {
      Id: 17545666551,
      TextAd: {
        Title: "Вас обвиняют в заливе соседей?",
        Title2: "Снизим сумму претензий до 50%",
        Text: "Соседи завысили смету на ремонт? Найдем необоснованные траты. Оспорим в суде!",
        Href: utmMain3,
        DisplayUrlPath: "ущерб-залив",
        SitelinkSetId: SITELINK_SET_ID
      }
    },
    {
      Id: 17545666552,
      TextAd: {
        Title: "Оценка ущерба квартире при заливе",
        Title2: "Бюро Советникъ в Уфе и РБ",
        Text: "Фиксируем скрытые повреждения: сырость, проводка, мебель. Смета и защита в суде!",
        Href: utmMain3,
        DisplayUrlPath: "ущерб-залив",
        SitelinkSetId: SITELINK_SET_ID
      }
    }
  ];

  const res3 = await apiRequest('ads', 'update', { Ads: adsGroup3 });
  console.log(`Объявления по заливам и ущербу обновлены:`, JSON.stringify(res3));

  console.log('\n=============================================');
  console.log('КАМПАНИЯ 706426574 ПОЛНОСТЬЮ ОБНОВЛЕНА И ГОТОВА!');
  console.log('=============================================');
}

main().catch(err => {
  console.error('CRITICAL ERROR:', err);
});
