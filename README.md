<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1QY5maTiODrpeKcZYpSCQigT9ezUSpX9C

## ⚠️ Правила разработки и деплоя (Критически важно)

1. **Способ деплоя:** Допускается деплой ТОЛЬКО через FTP с помощью команды `npm run deploy`.
2. **Рабочий цикл AI:** 
   - Сначала ИИ должен внести ВСЕ запланированные правки в код.
   - Сборка (`npm run build`) и деплой (`npm run deploy`) выполняются только после завершения всех работ.
   - Сайт всегда должен оставаться работоспособным (Zero Downtime Policy).
3. **Конфигурация сервера:** Не удаляйте файл `public/.htaccess`, он критически важен для работы роутинга на Reg.ru.

## Запуск локально

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
