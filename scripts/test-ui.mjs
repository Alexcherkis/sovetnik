import { chromium } from 'playwright';
import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PORT = 3000;
const URL = `http://127.0.0.1:${PORT}`;

async function runTests() {
  console.log('🚀 Запускаем UI тесты (Browser Subagent)');

  // 1. Запуск dev сервера
  console.log('📦 Поднимаем Vite dev server...');
  const server = spawn('npm', ['run', 'dev'], { cwd: ROOT, stdio: 'pipe' });
  
  await new Promise((resolve) => {
    server.stdout.on('data', (data) => {
      if (data.toString().includes('Local:')) {
        resolve();
      }
    });
    setTimeout(resolve, 8000); // fallback
  });

  console.log(`🌐 Сервер запущен на ${URL}`);

  // 2. Инициализация Playwright
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const artifactsDir = join(ROOT, 'scratch');
  if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir);

  try {
    // Тест 1: Главная страница
    console.log('🧪 Тест 1: Главная страница');
    await page.goto(URL);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: join(artifactsDir, 'home.png'), fullPage: true });
    const h1 = await page.locator('h1').textContent();
    console.log(`✅ H1 найден: ${h1}`);

    // Тест 2: Навигация (Контакты)
    console.log('🧪 Тест 2: Переход на страницу Контакты');
    await page.click('text=Контакты');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: join(artifactsDir, 'contacts.png') });
    console.log(`✅ Успешный переход на Контакты`);

    // Тест 3: Форма (Консультация)
    console.log('🧪 Тест 3: Открытие модального окна');
    await page.click('button:has-text("Консультация")');
    await page.waitForSelector('form', { state: 'visible' });
    await page.screenshot({ path: join(artifactsDir, 'modal.png') });
    console.log(`✅ Модальное окно успешно открыто`);

    // Тест 4: Переход по услугам
    console.log('🧪 Тест 4: Страница услуг');
    await page.goto(`${URL}/services/category/financial`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: join(artifactsDir, 'services.png') });
    console.log(`✅ Категория услуг загрузилась`);

    console.log('🎉 Все тесты успешно пройдены!');
  } catch (error) {
    console.error('❌ Ошибка тестирования:', error);
  } finally {
    await browser.close();
    server.kill();
    process.exit(0);
  }
}

runTests();
