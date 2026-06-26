/**
 * SSR Prerender Script
 * 
 * Рендерит SPA-страницы в статический HTML для поисковых систем.
 * Читает URL из готовых sitemap, запускает Playwright,
 * рендерит каждую страницу с выполненным JS и сохраняет HTML.
 * 
 * Запуск: node scripts/prerender.mjs
 * 
 * Требования: npm install -D playwright && npx playwright install chromium
 */

import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'url';
import { lookup } from 'mime-types';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST_DIR = join(ROOT, 'dist');
const PORT = 4174; // Используем другой порт, чтобы не конфликтовать с preview

// ============================================================
// 1. Парсинг sitemap.xml — получаем все URL для пререндера
// ============================================================
function parseSitemap(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    // Ищем все <loc>...</loc> теги
    const locs = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)];
    return locs.map(m => {
      try {
        const url = new URL(m[1]);
        return url.pathname;
      } catch {
        return null;
      }
    }).filter(Boolean);
  } catch (err) {
    console.warn(`⚠️  Не удалось прочитать sitemap: ${filePath}`, err.message);
    return [];
  }
}

// ============================================================
// 2. Простой статический файловый сервер (без лишних зависимостей)
// ============================================================
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

function createStaticServer(distDir) {
  return createServer((req, res) => {
    try {
      let pathname = parse(req.url).pathname;
      
      // SPA fallback: если файл не найден, отдаём index.html
      let filePath = join(distDir, pathname === '/' ? 'index.html' : pathname);
      
      if (!existsSync(filePath)) {
        // Если нет точного файла, пробуем index.html в поддиректории
        const indexPath = join(distDir, pathname, 'index.html');
        if (existsSync(indexPath)) {
          filePath = indexPath;
        } else {
          // SPA fallback — отдаём index.html для роутинга
          filePath = join(distDir, 'index.html');
        }
      }
      
      const ext = extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const content = readFileSync(filePath);
      
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      });
      res.end(content);
    } catch (err) {
      console.error(`[500] ${req.url}: ${err.message}`);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  });
}

// ============================================================
// 3. Пререндер
// ============================================================
async function prerender() {
  console.log('\n=== 🚀 SSR PRERENDER START ===\n');
  
  // Проверяем, что dist существует
  if (!existsSync(DIST_DIR)) {
    console.error('❌ Директория dist не найдена. Сначала выполните vite build.');
    process.exit(1);
  }
  
  // Читаем sitemap для получения всех URL
  const sitemapFiles = [
    join(DIST_DIR, 'sitemap-core.xml'),
    join(DIST_DIR, 'sitemap-pseo.xml'),
  ];
  
  const allRoutes = [
    // Статические маршруты (на случай если sitemap не полный)
    '/',
    '/about',
    '/contacts',
    '/faq',
    '/price',
    '/blog',
    '/services',
    '/privacy',
    '/terms',
    '/team',
    '/reviews',
    // Читаем из sitemap
    ...sitemapFiles.flatMap(f => parseSitemap(f)),
  ];
  
  // Убираем дубликаты и сортируем
  const uniqueRoutes = [...new Set(allRoutes)].sort();
  
  console.log(`📋 Найдено ${uniqueRoutes.length} маршрутов для пререндера:`);
  console.log(`   • Статические: 11`);
  console.log(`   • Из sitemap-core: ${parseSitemap(join(DIST_DIR, 'sitemap-core.xml')).length}`);
  console.log(`   • Из sitemap-pseo: ${parseSitemap(join(DIST_DIR, 'sitemap-pseo.xml')).length}`);
  
  // Запускаем статический сервер
  const server = createStaticServer(DIST_DIR);
  
  await new Promise((resolve, reject) => {
    server.listen(PORT, '127.0.0.1', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
  console.log(`\n🌐 Сервер запущен на http://127.0.0.1:${PORT}\n`);
  
  // Запускаем Playwright
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });
  
  const BASE_URL = `http://127.0.0.1:${PORT}`;
  const MAX_CONCURRENT = 15; // Увеличиваем параллельность для скорости
  let rendered = 0;
  let failed = 0;
  let skipped = 0;
  const startTime = Date.now();
  
  // Функция рендера одной страницы
  async function renderRoute(route) {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (compatible; PrerenderBot/1.0; +https://buro-sovetnik.com)',
      viewport: { width: 1920, height: 1080 },
      locale: 'ru-RU',
    });
    
    const page = await context.newPage();
    
    // Перехватываем ненужные запросы (аналитика, шрифты, картинки, карты — для скорости)
    await page.route('**/*.{png,jpg,jpeg,gif,webp,svg,ico,woff,woff2,ttf,eot}', route => route.abort());
    await page.route(/mc\.yandex\.ru|yandex\.ru|www\.googletagmanager\.com/, route => route.abort());
    
    try {
      const response = await page.goto(`${BASE_URL}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });
      
      if (!response || response.status() >= 400) {
        throw new Error(`HTTP ${response?.status() || 'No response'}`);
      }
      
      // Ждём, пока React отрендерит хотя бы один элемент в root
      await page.waitForSelector('#root > *', { timeout: 15000 });
      
      // Даём время на Helmet и асинхронные рендеры
      await page.waitForTimeout(1000);
      
      // Получаем полный HTML с обновлённым head
      const html = await page.content();
      
      // Определяем путь сохранения
      const normalizedRoute = route.endsWith('/') ? route : route;
      const filePath = normalizedRoute === '/'
        ? join(DIST_DIR, 'index.html')
        : join(DIST_DIR, normalizedRoute, 'index.html');
      
      // Создаём директорию
      const dir = dirname(filePath);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      
      writeFileSync(filePath, html);
      
      return true;
    } catch (err) {
      console.error(`   ❌ [${route}] ${err.message}`);
      return false;
    } finally {
      await page.close();
      await context.close();
    }
  }
  
  // Рендерим с лимитом параллельности
  async function processBatch(routes) {
    const results = [];
    for (let i = 0; i < routes.length; i += MAX_CONCURRENT) {
      const batch = routes.slice(i, i + MAX_CONCURRENT);
      const batchResults = await Promise.allSettled(batch.map(route => renderRoute(route)));
      
      for (let j = 0; j < batch.length; j++) {
        const result = batchResults[j];
        const route = batch[j];
        
        if (result.status === 'fulfilled' && result.value === true) {
          rendered++;
          results.push(true);
          
          // Логируем прогресс
          const progress = ((rendered + failed) / uniqueRoutes.length * 100).toFixed(1);
          process.stdout.write(`\r   ✅ [${rendered + failed}/${uniqueRoutes.length}] ${progress}% — ${route}          `);
        } else {
          failed++;
          results.push(false);
        }
      }
    }
    return results;
  }
  
  console.log('⏳ Начинаю рендеринг...\n');
  await processBatch(uniqueRoutes);
  
  // Итоговая статистика
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n\n=== ✅ PRERENDER COMPLETE ===`);
  console.log(`   ⏱  Время: ${elapsed}с`);
  console.log(`   ✅ Успешно: ${rendered}`);
  console.log(`   ❌ Ошибок: ${failed}`);
  console.log(`   📄 Всего: ${rendered + failed}`);
  
  // Закрываем браузер и сервер
  await browser.close();
  server.close();
  
  // Если всё упало — ошибка
  if (rendered === 0) {
    console.error('\n❌ Критическая ошибка: ни одна страница не отрендерилась!');
    process.exit(1);
  }
}

prerender().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});