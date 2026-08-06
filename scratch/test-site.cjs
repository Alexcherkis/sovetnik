const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-proxy-server'] });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`[CONSOLE_ERROR]: ${msg.text()}`);
    }
  });
  page.on('pageerror', error => {
    errors.push(`[PAGE_ERROR]: ${error.message}`);
  });
  
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000); // wait a bit for react to mount
  
  const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML || 'NO ROOT');
  
  console.log('--- ERRORS ---');
  errors.forEach(e => console.log(e));
  console.log('--- ROOT HTML (first 500 chars) ---');
  console.log(rootHtml.substring(0, 500));
  
  await browser.close();
})();
