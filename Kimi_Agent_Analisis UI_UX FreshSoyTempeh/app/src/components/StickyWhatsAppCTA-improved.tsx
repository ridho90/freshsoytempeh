import { useState, useCallback } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { X } from 'lucide-react'
import { trackWhatsAppClick } from '../lib/metaPixel-improved'

function StickyWhatsAppCTA() {
  const [dismissed, setDismissed] = useState(false)

  const handleClick = () => {
    trackWhatsAppClick('sticky-whatsapp-cta')
  }

  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDismissed(true)
    // Simpan preference di session (akan muncul lagi saat refresh)
    try {
      sessionStorage.setItem('whatsapp-cta-dismissed', 'true')
    } catch {
      // ignore
    }
  }, [])

  // Check session storage on mount
  useState(() => {
    try {
      if (sessionStorage.getItem('whatsapp-cta-dismissed') === 'true') {
        setDismissed(true)
      }
    } catch {
      // ignore
    }
  })

  if (dismissed) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#1fa955] bg-[#25D366] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.15)] animate-fade-in lg:hidden">
      <div className="mx-auto flex w-full max-w-md items-center gap-2">
        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
          aria-label="Dismiss WhatsApp bar"
        >
          <X className="h-4 w-4" />
        </button>

        {/* CTA Button */}
        <a
          href="https://wa.me/64274069207"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#1C8F46] shadow-sm transition-all duration-200 hover:bg-gray-50 active:scale-[0.98]"
        >
          <FaWhatsapp
            className="text-base text-[#25D366] transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
          />
          <span>Order via WhatsApp</span>
        </a>
      </div>
    </div>
  )
}

export default StickyWhatsAppCTA
