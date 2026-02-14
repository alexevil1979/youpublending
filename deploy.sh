#!/bin/bash
# Деплой YouPub Landing + Chat API на VPS
# Использование: ./deploy.sh
#
# Перед первым запуском на VPS выполните setup-vps.sh

set -e

VPS_USER="${VPS_USER:-user}"
VPS_HOST="${VPS_HOST:-your-vps}"
VPS_PATH="/ssd/www/youpublanding"

echo "🔨 Сборка фронтенда..."
npm run build

echo "📦 Загрузка фронтенда на VPS..."
rsync -avz --delete dist/ "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/dist/"

echo "📦 Загрузка серверных файлов..."
rsync -avz \
  server.js \
  package.json \
  package-lock.json \
  ecosystem.config.cjs \
  "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/"

echo "📦 Загрузка Apache конфига..."
rsync -avz apache/ "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/apache/"

echo "🔧 Установка зависимостей и перезапуск сервера..."
ssh "${VPS_USER}@${VPS_HOST}" << 'ENDSSH'
  cd /ssd/www/youpublanding
  mkdir -p logs
  npm ci --omit=dev
  # Перезапуск PM2 (или первый запуск)
  if pm2 describe youpub-api > /dev/null 2>&1; then
    pm2 restart youpub-api
  else
    pm2 start ecosystem.config.cjs
    pm2 save
  fi
  echo "✅ Сервер перезапущен"
  pm2 status youpub-api
ENDSSH

echo ""
echo "✅ Деплой завершён!"
echo "   Сайт:  https://youpub.site"
echo "   CRM:   https://youpub.site/login"
echo "   API:   https://youpub.site/api/health"
