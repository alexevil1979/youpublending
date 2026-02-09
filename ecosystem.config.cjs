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
        // Для GigaChat API (сертификаты РФ ЦА)
        NODE_TLS_REJECT_UNAUTHORIZED: '0',
      },
      // .env файл загружается через dotenv внутри server.js
      error_file: '/ssd/www/youpublanding/logs/error.log',
      out_file: '/ssd/www/youpublanding/logs/output.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
    },
  ],
}
