import { useState, useEffect, useCallback, useRef } from 'react'
import WhatsAppOrderButton from './WhatsAppOrderButton-improved'

const NAV_LINKS = [
  { href: '#how-to-enjoy', label: 'How to Enjoy' },
  { href: '#nutrition', label: 'Nutrition' },
  { href: '#quality', label: 'Quality' },
  { href: '#stockists', label: 'Stockists' },
] as const

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const lastFocusRef = useRef<HTMLButtonElement | null>(null)

  // Track scroll untuk visual feedback
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
        lastFocusRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mobileOpen])

  // Focus trap & body scroll lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      const timer = setTimeout(() => {
        menuRef.current?.querySelector('a')?.focus()
      }, 100)
      return () => {
        clearTimeout(timer)
        document.body.style.overflow = ''
      }
    }
  }, [mobileOpen])

  const toggleMenu = useCallback(() => {
    if (!mobileOpen) {
      lastFocusRef.current = document.activeElement as HTMLButtonElement
    }
    setMobileOpen((prev) => !prev)
  }, [mobileOpen])

  const closeMenu = useCallback(() => {
    setMobileOpen(false)
    lastFocusRef.current?.focus()
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#D8EBD0]/80 bg-[#FFFDF8]/95 shadow-sm backdrop-blur-md'
            : 'border-b border-transparent bg-[#FFFDF8]/80 backdrop-blur'
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
          {/* Logo */}
          <a
            href="#"
            className="group text-sm font-extrabold tracking-wide text-[#4F7C48] transition-colors hover:text-[#65A957] focus-visible:rounded-md"
            aria-label="Fresh Soy Tempeh — Home"
          >
            <span className="inline-flex items-center gap-2">
              <svg className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#4F7C48" />
                <path d="M7 12c0-1 .5-2.5 2.5-2.5S12 11 12 12s-.5 2.5-2.5 2.5S7 13 7 12z" fill="#7FAD5A" />
                <path d="M12 12c0-1 .5-2.5 2.5-2.5S17 11 17 12s-.5 2.5-2.5 2.5S12 13 12 12z" fill="#65A957" opacity="0.7" />
                <circle cx="18" cy="6" r="2.5" fill="#E89035" />
              </svg>
              FRESH SOY TEMPEH
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 text-sm font-medium text-[#2F3432] md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 transition-colors duration-200 hover:text-[#65A957] focus-visible:rounded-md"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#65A957] transition-all duration-300 hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <WhatsAppOrderButton label="Chat to Order" className="text-xs" />
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={lastFocusRef}
            onClick={toggleMenu}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[#EEF7EA] focus-visible:ring-2 focus-visible:ring-[#65A957] focus-visible:ring-offset-2 md:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <div className="flex h-4 w-5 flex-col justify-between">
              <span
                className={`block h-0.5 rounded-full bg-[#2F3432] transition-all duration-300 ${
                  mobileOpen ? 'w-5 translate-y-[7px] rotate-45' : 'w-5'
                }`}
              />
              <span
                className={`block h-0.5 rounded-full bg-[#2F3432] transition-all duration-300 ${
                  mobileOpen ? 'w-0 opacity-0' : 'w-3.5'
                }`}
              />
              <span
                className={`block h-0.5 rounded-full bg-[#2F3432] transition-all duration-300 ${
                  mobileOpen ? 'w-5 -translate-y-[7px] -rotate-45' : 'w-4'
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#2F3432]/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-[#FFFDF8] shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-label="Navigation menu"
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between border-b border-[#D8EBD0] px-5 py-3">
            <span className="text-sm font-extrabold tracking-wide text-[#4F7C48]">
              FRESH SOY TEMPEH
            </span>
            <button
              onClick={closeMenu}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#EEF7EA] focus-visible:ring-2 focus-visible:ring-[#65A957]"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5 text-[#2F3432]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <div className="px-5 py-4">
            <ul className="space-y-1">
              {NAV_LINKS.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="animate-fade-in-up block rounded-xl px-4 py-3 text-base font-medium text-[#2F3432] transition-colors hover:bg-[#EEF7EA] hover:text-[#4F7C48] focus-visible:ring-2 focus-visible:ring-[#65A957]"
                    style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-[#D8EBD0] bg-[#EEF7EA]/50 px-5 py-4">
            <WhatsAppOrderButton label="Order via WhatsApp" className="w-full" />
            <p className="mt-3 text-center text-xs text-[#6B736E]">
              WhatsApp: +64 27 406 9207
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
