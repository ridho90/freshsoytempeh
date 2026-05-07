export const isMetaPixelReady = () => typeof window !== 'undefined' && typeof window.fbq === 'function'

const makeEventId = (source) => `${source}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export const trackWhatsAppClick = (source) => {
  const eventId = makeEventId(source)

  if (!isMetaPixelReady()) {
    console.warn('[MetaPixel] fbq not ready. Event skipped.', { source, eventId })
    return
  }

  const payload = {
    channel: 'whatsapp',
    source,
    destination: 'https://wa.me/64274069207',
  }

  window.fbq('track', 'Lead', payload, { eventID: eventId })
  window.fbq('trackCustom', 'WhatsAppClick', payload, { eventID: eventId })

  console.info('[MetaPixel] WhatsApp events sent', {
    source,
    eventId,
    events: ['Lead', 'WhatsAppClick'],
  })
}
