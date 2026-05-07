import { FaWhatsapp } from 'react-icons/fa'
import { trackWhatsAppClick } from '../lib/metaPixel'

function StickyWhatsAppCTA() {
  const handleClick = () => {
    trackWhatsAppClick('sticky-whatsapp-cta')
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#1fa955] bg-[#25D366] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] lg:hidden">
      <a
        href="https://wa.me/64274069207"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#1C8F46]"
      >
        <FaWhatsapp className="text-base" aria-hidden="true" />
        <span>Order via WhatsApp</span>
      </a>
    </div>
  )
}

export default StickyWhatsAppCTA
