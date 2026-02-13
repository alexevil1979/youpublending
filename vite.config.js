import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Don't expose source code in production
    target: 'es2020', // Modern browsers — smaller output
    cssMinify: 'lightningcss', // Faster CSS minification
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching & parallel loading
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer': ['framer-motion'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'helmet': ['@dr.pogodin/react-helmet'],
        },
      },
    },
  },
  server: {
    proxy: {
      // Проксируем /api/* на Express-сервер (server.js на порту 3001)
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  // Vitest config
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js',
  },
})
