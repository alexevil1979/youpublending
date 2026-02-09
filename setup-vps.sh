#!/bin/bash
# ============================================================
# Первичная настройка VPS для YouPub Landing + Chat API
# Запустите ОДИН РАЗ на VPS: bash setup-vps.sh
# ============================================================

set -e

echo "=========================================="
echo "  YouPub VPS Setup"
echo "=========================================="

# 1. Включаем необходимые модули Apache
echo "🔧 Включение модулей Apache (proxy, rewrite)..."
sudo a2enmod proxy proxy_http rewrite headers
echo "   ✅ Модули Apache включены"

# 2. Установка PM2 (менеджер процессов для Node.js)
echo "🔧 Установка PM2..."
if ! command -v pm2 &> /dev/null; then
  sudo npm install -g pm2
  echo "   ✅ PM2 установлен"
else
  echo "   ✅ PM2 уже установлен"
fi

# 3. Создание директорий
echo "📁 Создание директорий..."
mkdir -p /ssd/www/youpublanding/dist
mkdir -p /ssd/www/youpublanding/logs
echo "   ✅ Директории созданы"

# 4. Создание .env файла (если нет)
if [ ! -f /ssd/www/youpublanding/.env ]; then
  echo "📝 Создание .env файла..."
  cat > /ssd/www/youpublanding/.env << 'EOF'
# === Клиентские ===
VITE_ENABLE_CHAT=true

# === Серверные ===
# GigaChat API ключ (получите на https://developers.sber.ru)
GIGACHAT_API_KEY=ВСТАВЬТЕ_ВАШ_КЛЮЧ_СЮДА
GIGACHAT_SCOPE=GIGACHAT_API_PERS
PORT=3001
EOF
  echo "   ⚠️  Отредактируйте .env: nano /ssd/www/youpublanding/.env"
  echo "      Вставьте ваш GIGACHAT_API_KEY"
else
  echo "   ✅ .env уже существует"
fi

# 5. Пример конфигурации Apache VirtualHost
echo ""
echo "=========================================="
echo "  Конфигурация Apache VirtualHost"
echo "=========================================="
echo ""
echo "Добавьте эти строки в конфиг вашего VirtualHost"
echo "(обычно /etc/apache2/sites-available/youpub.1tlt.ru.conf):"
echo ""
cat << 'APACHECONF'
<VirtualHost *:443>
    ServerName youpub.1tlt.ru
    DocumentRoot /ssd/www/youpublanding/dist

    # Проксируем API на Express
    ProxyPreserveHost On
    ProxyPass /api http://localhost:3001/api
    ProxyPassReverse /api http://localhost:3001/api

    # Статика + SPA fallback
    <Directory /ssd/www/youpublanding/dist>
        AllowOverride All
        Require all granted
    </Directory>

    # ... ваши SSL-настройки (certbot) ...
</VirtualHost>
APACHECONF
echo ""

# 6. Перезапуск Apache
echo "🔄 Перезапуск Apache..."
sudo systemctl restart apache2
echo "   ✅ Apache перезапущен"

# 7. Настройка автозапуска PM2 при перезагрузке
echo "🔧 Настройка автозапуска PM2..."
pm2 startup systemd -u $(whoami) --hp $(echo $HOME) 2>/dev/null || true
echo "   ✅ PM2 startup настроен"

echo ""
echo "=========================================="
echo "  Готово! Следующие шаги:"
echo "=========================================="
echo ""
echo "1. Отредактируйте .env:"
echo "   nano /ssd/www/youpublanding/.env"
echo ""
echo "2. Обновите Apache VirtualHost конфиг:"
echo "   sudo nano /etc/apache2/sites-available/youpub.1tlt.ru.conf"
echo "   (добавьте ProxyPass строки из примера выше)"
echo "   sudo systemctl reload apache2"
echo ""
echo "3. Задеплойте проект (push в main или ./deploy.sh)"
echo ""
echo "4. Проверьте:"
echo "   curl https://youpub.1tlt.ru/api/chat -X POST -H 'Content-Type: application/json' -d '{\"messages\":[{\"role\":\"user\",\"content\":\"test\"}]}'"
echo ""
