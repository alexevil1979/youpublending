#!/bin/bash
# Ручной деплой на VPS
# Использование: ./deploy.sh

set -e

echo "🔨 Сборка проекта..."
npm run build

echo "📦 Загрузка на VPS..."
# Замените user@host на ваши данные
rsync -avz --delete dist/ user@your-vps:/ssd/www/youpublanding/

echo "✅ Деплой завершён! Сайт: https://youpub.1tlt.ru"
