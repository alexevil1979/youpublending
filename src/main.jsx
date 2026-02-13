import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from '@dr.pogodin/react-helmet'
import './index.css'
import './i18n/index.js'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
)
