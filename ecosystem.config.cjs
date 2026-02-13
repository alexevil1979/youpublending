// PM2 конфигурация для VPS
// Установка PM2: npm install -g pm2
// Запуск: pm2 start ecosystem.config.cjs
// Мониторинг: pm2 monit
// Логи: pm2 logs youpub-api
module.exports = {
  apps: [
    {
      name: 'youpub-api',
      script: 'server.js',
      cwd: '/ssd/www/youpublanding',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        // ВНИМАНИЕ: NODE_TLS_REJECT_UNAUTHORIZED='0' отключает проверку TLS-сертификатов
        // для ВСЕХ соединений на сервере — это опасно в production.
        //
        // Для GigaChat API (сертификаты РФ ЦА):
        // Правильное решение — установить корневой сертификат Минцифры РФ:
        //   1) Скачать: https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt
        //   2) Добавить через NODE_EXTRA_CA_CERTS (ниже)
        //
        // Если сертификат установлен — раскомментируйте строку ниже и удалите NODE_TLS_REJECT_UNAUTHORIZED:
        // NODE_EXTRA_CA_CERTS: '/ssd/www/youpublanding/certs/russian_trusted_root_ca.pem',
        NODE_TLS_REJECT_UNAUTHORIZED: '0', // TODO: заменить на NODE_EXTRA_CA_CERTS
      },
      // .env файл загружается через dotenv внутри server.js
      error_file: '/ssd/www/youpublanding/logs/error.log',
      out_file: '/ssd/www/youpublanding/logs/output.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
    },
  ],
}
