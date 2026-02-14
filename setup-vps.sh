#!/bin/bash
# ============================================================
# Первичная настройка VPS для YouPub (Landing + CRM + Chat API)
# Домен: youpub.site
# Запустите ОДИН РАЗ на VPS: bash setup-vps.sh
# ============================================================

set -e

DOMAIN="youpub.site"
LANDING_PATH="/ssd/www/youpublanding"
CRM_PATH="/ssd/www/youpub"

echo "=========================================="
echo "  YouPub VPS Setup — $DOMAIN"
echo "=========================================="

# 1. Включаем необходимые модули Apache
echo ""
echo "1. Включение модулей Apache..."
sudo a2enmod proxy proxy_http rewrite headers ssl expires deflate
echo "   ✅ Модули Apache включены"

# 2. Установка PM2 (менеджер процессов для Node.js)
echo ""
echo "2. Установка PM2..."
if ! command -v pm2 &> /dev/null; then
  sudo npm install -g pm2
  echo "   ✅ PM2 установлен"
else
  echo "   ✅ PM2 уже установлен"
fi

# 3. Установка certbot (Let's Encrypt)
echo ""
echo "3. Установка certbot..."
if ! command -v certbot &> /dev/null; then
  sudo apt update
  sudo apt install -y certbot python3-certbot-apache
  echo "   ✅ Certbot установлен"
else
  echo "   ✅ Certbot уже установлен"
fi

# 4. Создание директорий
echo ""
echo "4. Создание директорий..."
mkdir -p $LANDING_PATH/dist
mkdir -p $LANDING_PATH/logs
mkdir -p $CRM_PATH
echo "   ✅ Директории созданы"

# 5. Создание .env файла (если нет)
echo ""
echo "5. Настройка .env..."
if [ ! -f $LANDING_PATH/.env ]; then
  cat > $LANDING_PATH/.env << 'ENVEOF'
# === Клиентские ===
VITE_ENABLE_CHAT=true

# === Серверные ===
# GigaChat API ключ (получите на https://developers.sber.ru)
GIGACHAT_API_KEY=ВСТАВЬТЕ_ВАШ_КЛЮЧ_СЮДА
GIGACHAT_SCOPE=GIGACHAT_API_PERS
PORT=3001
ENVEOF
  echo "   ⚠️  Отредактируйте .env: nano $LANDING_PATH/.env"
else
  echo "   ✅ .env уже существует"
fi

# 6. Копирование Apache конфига
echo ""
echo "6. Настройка Apache VirtualHost..."
APACHE_CONF="/etc/apache2/sites-available/$DOMAIN.conf"

if [ -f "$LANDING_PATH/apache/$DOMAIN.conf" ]; then
  sudo cp "$LANDING_PATH/apache/$DOMAIN.conf" "$APACHE_CONF"
  echo "   ✅ Конфиг скопирован из репозитория"
else
  # Генерируем конфиг на лету
  sudo tee "$APACHE_CONF" > /dev/null << APACHEEOF
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias www.$DOMAIN

    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>

<VirtualHost *:443>
    ServerName $DOMAIN
    ServerAlias www.$DOMAIN
    ServerAdmin admin@$DOMAIN

    # API → Express (PM2)
    ProxyPreserveHost On
    ProxyPass /api http://localhost:3001/api
    ProxyPassReverse /api http://localhost:3001/api

    # CRM маршруты
    Alias /login $CRM_PATH/login
    Alias /register $CRM_PATH/register
    Alias /dashboard $CRM_PATH/dashboard
    Alias /settings $CRM_PATH/settings
    Alias /crm-assets $CRM_PATH/assets

    <Directory $CRM_PATH>
        AllowOverride All
        Require all granted
    </Directory>

    # Лендинг — всё остальное
    DocumentRoot $LANDING_PATH/dist

    <Directory $LANDING_PATH/dist>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/$DOMAIN-error.log
    CustomLog \${APACHE_LOG_DIR}/$DOMAIN-access.log combined
</VirtualHost>
APACHEEOF
  echo "   ✅ Конфиг сгенерирован"
fi

# Отключаем старый сайт, включаем новый
sudo a2dissite youpub.1tlt.ru.conf 2>/dev/null || true
sudo a2ensite "$DOMAIN.conf"
echo "   ✅ Сайт $DOMAIN активирован"

# 7. Проверка конфига Apache
echo ""
echo "7. Проверка конфигурации Apache..."
sudo apache2ctl configtest
echo "   ✅ Конфигурация корректна"

# 8. Перезапуск Apache
echo ""
echo "8. Перезапуск Apache..."
sudo systemctl reload apache2
echo "   ✅ Apache перезапущен"

# 9. Получение SSL-сертификата
echo ""
echo "9. Получение SSL-сертификата Let's Encrypt..."
echo "   Убедитесь, что DNS A-запись $DOMAIN указывает на IP этого сервера!"
echo ""
read -p "   DNS настроен? Получить сертификат сейчас? (y/n): " GET_CERT

if [ "$GET_CERT" = "y" ] || [ "$GET_CERT" = "Y" ]; then
  sudo certbot --apache -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email admin@$DOMAIN --redirect
  echo "   ✅ SSL-сертификат получен и настроен"
  echo "   ✅ Автообновление через cron уже настроено certbot"
else
  echo "   ⏭️  Пропущено. Когда будете готовы, выполните:"
  echo "      sudo certbot --apache -d $DOMAIN -d www.$DOMAIN"
fi

# 10. Настройка автозапуска PM2
echo ""
echo "10. Настройка автозапуска PM2..."
pm2 startup systemd -u $(whoami) --hp $(echo $HOME) 2>/dev/null || true
echo "   ✅ PM2 startup настроен"

echo ""
echo "=========================================="
echo "  ✅ Настройка завершена!"
echo "=========================================="
echo ""
echo "Следующие шаги:"
echo ""
echo "  1. Отредактируйте .env (если ещё нет):"
echo "     nano $LANDING_PATH/.env"
echo ""
echo "  2. Задеплойте лендинг (push в main или ./deploy.sh)"
echo ""
echo "  3. Проверьте:"
echo "     curl https://$DOMAIN/"
echo "     curl https://$DOMAIN/api/health"
echo "     curl https://$DOMAIN/login"
echo ""
