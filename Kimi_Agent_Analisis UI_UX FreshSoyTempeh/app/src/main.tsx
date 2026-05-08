import './index.css'
import { createRoot } from 'react-dom/client'
import { StrictMode, lazy, Suspense, Component, type ReactNode } from 'react'

/* ============================================
   ERROR BOUNDARY — Menangani Crash Gracefully
   ============================================ */

interface EBState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, EBState> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, error }
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', textAlign: 'center', background: '#FFFDF8', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div style={{ marginBottom: '1.5rem', width: '4rem', height: '4rem', borderRadius: '50%', background: '#EEF7EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4F7C48" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 700, color: '#2F3432' }}>Something went wrong</h1>
            <p style={{ margin: '0 0 1.5rem', maxWidth: '28rem', fontSize: '0.875rem', color: '#6B736E' }}>We apologize for the inconvenience. Please try refreshing the page or contact us if the problem persists.</p>
            <button onClick={() => window.location.reload()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '9999px', border: 'none', background: '#65A957', color: 'white', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Refresh Page
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}

/* ============================================
   APP WITH LAZY LOADING
   ============================================ */

import Navbar from './components/Navbar-improved'
import Hero from './components/Hero-improved'
import StickyWhatsAppCTA from './components/StickyWhatsAppCTA-improved'
import ScrollToTop from './components/ui/ScrollToTop'

const TrustStrip = lazy(() => import('./components/TrustStrip-improved'))
const ProductOrderSection = lazy(() => import('./components/ProductOrderSection-improved'))
const CookingVersatility = lazy(() => import('./components/CookingVersatility-improved'))
const NutritionTransparency = lazy(() => import('./components/NutritionTransparency-improved'))
const QualityGuide = lazy(() => import('./components/QualityGuide-improved'))
const Footer = lazy(() => import('./components/Footer-improved'))

import CTAButton from './components/CTAButton-improved'
import WhatsAppOrderButton from './components/WhatsAppOrderButton-improved'

function SectionSkeleton() {
  return (
    <section style={{ margin: '0 auto', width: '100%', maxWidth: '72rem', padding: '3rem 1rem' }}>
      <div style={{ borderRadius: '1.5rem', border: '1px solid #D8EBD0', background: 'white', padding: '2rem', boxShadow: '0 1px 2px rgba(47,52,50,0.06)' }}>
        <div className="skeleton" style={{ marginBottom: '1rem', height: '2rem', width: '60%' }} />
        <div className="skeleton" style={{ marginBottom: '0.5rem', height: '1rem', width: '100%' }} />
        <div className="skeleton" style={{ marginBottom: '1.5rem', height: '1rem', width: '80%' }} />
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: '8rem', borderRadius: '1rem' }} />)}
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div style={{ background: '#FFFDF8', color: '#2F3432' }}>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <Navbar />
      <main id="main-content" style={{ paddingBottom: '7rem' }}>
        <Hero />
        <Suspense fallback={<SectionSkeleton />}><TrustStrip /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><ProductOrderSection /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><CookingVersatility /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><NutritionTransparency /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><QualityGuide /></Suspense>
        <section id="stockists" style={{ margin: '0 auto', width: '100%', maxWidth: '72rem', padding: '3rem 1rem' }}>
          <div className="card-hover" style={{ borderRadius: '1.5rem', border: '1px solid #D8EBD0', background: 'white', padding: '2rem', boxShadow: '0 1px 2px rgba(47,52,50,0.06)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Find Fresh Soy Tempeh</h2>
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#6B736E' }}>
              Looking for Fresh Soy Tempeh near you? Find a local stockist or ask your favourite grocer to stock our New Zealand-made tempeh.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <CTAButton href="#stockists" variant="accent" ariaLabel="Coming soon - Stockist finder">View Stockists (Coming Soon)</CTAButton>
              <WhatsAppOrderButton label="Wholesale Enquiry" />
            </div>
          </div>
        </section>
      </main>
      <Suspense fallback={<div style={{ height: '10rem' }} />}><Footer /></Suspense>
      <StickyWhatsAppCTA />
      <ScrollToTop />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
