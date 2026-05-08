import { FaWhatsapp } from 'react-icons/fa'
import { trackLead, makeWhatsAppUrl } from '../lib/metaPixel'

const PHONE = '64274069207'

function WhatsAppOrderButton({ label = 'Order via WhatsApp', className = '' }) {
  const handleClick = (e) => {
    trackLead('whatsapp-order-button')
  }

  return (
    <a
      href={makeWhatsAppUrl(PHONE, 'whatsapp-order-button')}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 ${className}`}
    >
      <FaWhatsapp className="text-base" aria-hidden="true" />
      <span>{label}</span>
    </a>
  )
}

export default WhatsAppOrderButton
