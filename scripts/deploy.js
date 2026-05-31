import { Client } from 'basic-ftp';
import process from 'process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.ftp if exists (secrets not committed to git)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFtpPath = path.resolve(__dirname, '..', '.env.ftp');
if (fs.existsSync(envFtpPath)) {
  const lines = fs.readFileSync(envFtpPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function deploy() {
    const client = new Client();
    client.ftp.verbose = false;
    client.ftp.timeout = 60000;

    try {
        const host = process.env.FTP_HOST;
        const user = process.env.FTP_USER;
        const password = process.env.FTP_PASSWORD;
        const secure = (process.env.FTP_SECURE || 'false').toLowerCase() === 'true';
        const secureRejectUnauthorized =
            (process.env.FTP_SECURE_REJECT_UNAUTHORIZED || 'true').toLowerCase() === 'true';
        const remoteDir = process.env.FTP_REMOTE_DIR || '/';
        const shouldClear = (process.env.FTP_CLEAR_REMOTE_DIR || 'false').toLowerCase() === 'true';

        if (!host || !user || !password) {
            console.error('');
            console.error('❌ Не указаны FTP-данные.');
            console.error('');
            console.error('   Создайте файл .env.ftp в корне проекта:');
            console.error('   ───────────────────────────────────────');
            console.error('   FTP_HOST=ftp.ваш-хостинг.ru');
            console.error('   FTP_USER=ваш-логин');
            console.error('   FTP_PASSWORD=ваш-пароль');
            console.error('   FTP_REMOTE_DIR=/public_html');
            console.error('   ───────────────────────────────────────');
            console.error('');
            console.error('   Или передайте через переменные окружения:');
            console.error('   FTP_HOST=... FTP_USER=... npm run deploy');
            console.error('');
            throw new Error('Missing FTP credentials');
        }

        console.log(`🔌 Подключаюсь к ${host}...`);
        await client.access({
            host,
            user,
            password,
            secure,
            ...(secure
                ? { secureOptions: { rejectUnauthorized: secureRejectUnauthorized } }
                : {})
        });

        console.log("✅ Подключено к FTP");

        await client.ensureDir(remoteDir);
        await client.cd(remoteDir);

        if (shouldClear) {
            console.log("⚠️ Очистка удалённой директории...");
            await client.clearWorkingDir();
        }

        console.log("📤 Загружаю dist/ на сервер...");
        const maxAttempts = Number(process.env.FTP_MAX_ATTEMPTS || 3);
        let lastErr;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                if (attempt > 1) {
                    console.log(`🔁 Повторная попытка (${attempt}/${maxAttempts})`);
                }
                await client.uploadFromDir("dist");
                lastErr = undefined;
                break;
            } catch (e) {
                lastErr = e;
                await new Promise((r) => setTimeout(r, 1500 * attempt));
            }
        }

        if (lastErr) throw lastErr;

        console.log("🚀 Деплой успешно завершён!");
    } catch (err) {
        console.error("❌ Деплой не удался:", err);
        process.exit(1);
    } finally {
        client.close();
    }
}

deploy();
