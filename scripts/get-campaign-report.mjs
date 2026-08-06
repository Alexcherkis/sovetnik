import https from 'https';

const API_TOKEN = 'y0__wgBEJLIlpYCGMKHRCCGzZqCGKOAOkyGBo17pnZszU5PuwjXm_E-';
const CLIENT_LOGIN = 'e-20085514';

function fetchReport(reportName, reportType, fieldNames, dateRangeType = 'ALL_TIME', filter = []) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      params: {
        SelectionCriteria: {
          Filter: filter
        },
        FieldNames: fieldNames,
        ReportName: reportName,
        ReportType: reportType,
        DateRangeType: dateRangeType,
        Format: 'TSV',
        IncludeVAT: 'YES',
        IncludeDiscount: 'NO'
      }
    });

    const check = () => {
      const options = {
        hostname: 'api.direct.yandex.com',
        port: 443,
        path: '/json/v5/reports',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Client-Login': CLIENT_LOGIN,
          'Accept-Language': 'ru',
          'processingMode': 'auto',
          'returnMoneyInMicros': 'false',
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(data);
          } else if (res.statusCode === 201 || res.statusCode === 202) {
            const retryIn = parseInt(res.headers['retryin'] || '2', 10);
            setTimeout(check, retryIn * 1000);
          } else {
            reject(new Error(`Reports API error [${res.statusCode}]: ${data}`));
          }
        });
      });

      req.on('error', reject);
      req.write(payload);
      req.end();
    };

    check();
  });
}

async function run() {
  const timestamp = Date.now();
  console.log('--- ЗАПРОС СТАТИСТИКИ ПО КАМПАНИИ 706426574 ЗА ВСЕ ВРЕМЯ ---');
  
  // 1. Статистика по группам
  const groupReport = await fetchReport(
    `GroupStats_${timestamp}`,
    'ADGROUP_PERFORMANCE_REPORT',
    ['AdGroupId', 'AdGroupName', 'Impressions', 'Clicks', 'Ctr', 'Cost', 'AvgCpc', 'Conversions', 'BounceRate'],
    'ALL_TIME',
    [{ Field: 'CampaignId', Operator: 'EQUALS', Values: ['706426574'] }]
  );
  console.log('\n>>> ОТЧЕТ ПО ГРУППАМ ОБЪЯВЛЕНИЙ:');
  console.log(groupReport);

  // 2. Статистика по ключевым словам
  const kwReport = await fetchReport(
    `KWStats_${timestamp}`,
    'CRITERIA_PERFORMANCE_REPORT',
    ['AdGroupId', 'AdGroupName', 'Criteria', 'CriteriaType', 'Impressions', 'Clicks', 'Ctr', 'Cost', 'AvgCpc', 'Conversions'],
    'ALL_TIME',
    [{ Field: 'CampaignId', Operator: 'EQUALS', Values: ['706426574'] }]
  );
  console.log('\n>>> ОТЧЕТ ПО КЛЮЧЕВЫМ ФРАЗАМ:');
  console.log(kwReport);
}

run().catch(console.error);
