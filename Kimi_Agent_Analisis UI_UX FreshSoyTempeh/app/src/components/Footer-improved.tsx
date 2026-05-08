import { useCallback } from 'react'
import { Leaf, MapPin, Phone, Mail, ExternalLink } from 'lucide-react'
import WhatsAppOrderButton from './WhatsAppOrderButton-improved'

const EXPLORE_LINKS = [
  { href: '#how-to-enjoy', label: 'How to Enjoy' },
  { href: '#nutrition', label: 'Nutrition' },
  { href: '#quality', label: 'Quality Guide' },
  { href: '#stockists', label: 'Stockists' },
] as const

const PRODUCT_NOTES = [
  'Keep frozen until ready to use.',
  'Consume within 5 days of opening.',
  'Tempeh must be cooked before consumption.',
  'Do not eat raw.',
  'Black spots can be normal culture growth.',
] as const

function Footer() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <footer className="mt-12 border-t border-[#D8EBD0] bg-[#4F7C48] pb-32 pt-12 text-[#EEF7EA] lg:pb-12">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-3 lg:gap-8 lg:px-8">
        {/* Brand Column */}
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              scrollToTop()
            }}
            className="group inline-flex items-center gap-2 text-sm font-extrabold tracking-wide text-white transition-colors hover:text-[#EEF7EA]"
          >
            <svg className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#ffffff" fillOpacity="0.15" />
              <path d="M7 12c0-1 .5-2.5 2.5-2.5S12 11 12 12s-.5 2.5-2.5 2.5S7 13 7 12z" fill="#7FAD5A" />
              <path d="M12 12c0-1 .5-2.5 2.5-2.5S17 11 17 12s-.5 2.5-2.5 2.5S12 13 12 12z" fill="#65A957" opacity="0.7" />
              <circle cx="18" cy="6" r="2.5" fill="#E89035" />
            </svg>
            FRESH SOY TEMPEH
          </a>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Fresh Soy Tempeh is a plant based protein made in New Zealand from 100% Non-GMO soybeans,
            with no preservatives or artificial additives. Perfect for BBQ, steaming, stir-frying,
            soups, or any of your favourite dishes.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Leaf className="h-4 w-4 text-[#7FAD5A]" aria-hidden="true" />
            <span className="text-xs text-white/60">100% Plant Based</span>
          </div>
        </div>

        {/* Explore Column */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                  <ExternalLink className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Notes & Contact Column */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">Product Notes</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {PRODUCT_NOTES.map((note, index) => (
              <li key={index} className="flex items-start gap-2 text-white/70">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#7FAD5A]" />
                {note}
              </li>
            ))}
          </ul>

          {/* Contact Info */}
          <div className="mt-6 space-y-2 rounded-xl bg-white/10 p-4">
            <p className="flex items-center gap-2 text-sm text-white/80">
              <Mail className="h-3.5 w-3.5 text-[#7FAD5A]" aria-hidden="true" />
              freshsoytempeh.nz
            </p>
            <p className="flex items-center gap-2 text-sm text-white/80">
              <Phone className="h-3.5 w-3.5 text-[#7FAD5A]" aria-hidden="true" />
              WhatsApp: +64 27 406 9207
            </p>
            <p className="flex items-center gap-2 text-sm text-white/80">
              <MapPin className="h-3.5 w-3.5 text-[#7FAD5A]" aria-hidden="true" />
              Made in New Zealand
            </p>
          </div>

          <div className="mt-4">
            <WhatsAppOrderButton label="Chat to Order" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Fresh Soy Tempeh. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white"
            aria-label="Back to top"
          >
            Back to top
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
