import { FaWhatsapp } from 'react-icons/fa'
import { trackWhatsAppClick } from '../lib/metaPixel-improved'

interface WhatsAppOrderButtonProps {
  label?: string
  className?: string
}

function WhatsAppOrderButton({ label = 'Order via WhatsApp', className = '' }: WhatsAppOrderButtonProps) {
  const handleClick = () => {
    trackWhatsAppClick('whatsapp-order-button')
  }

  return (
    <a
      href="https://wa.me/64274069207"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1fa955] hover:shadow-md active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 ${className}`}
      aria-label={`Chat on WhatsApp to ${label.toLowerCase()}`}
    >
      <FaWhatsapp
        className="text-base transition-transform duration-200 group-hover:scale-110"
        aria-hidden="true"
      />
      <span>{label}</span>
    </a>
  )
}

export default WhatsAppOrderButton
