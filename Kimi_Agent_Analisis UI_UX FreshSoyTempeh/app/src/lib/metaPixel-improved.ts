/**
 * Meta Pixel Helper — Improved Version
 * - Debug mode hanya di development
 * - No console output di production
 * - Better error handling
 */

const isDev = import.meta.env?.DEV === true

const log = {
  warn: (...args: unknown[]) => { if (isDev) console.warn('[MetaPixel]', ...args) },
  info: (...args: unknown[]) => { if (isDev) console.info('[MetaPixel]', ...args) },
  error: (...args: unknown[]) => { if (isDev) console.error('[MetaPixel]', ...args) },
}

export const isMetaPixelReady = (): boolean =>
  typeof window !== 'undefined' && typeof window.fbq === 'function'

const makeEventId = (source: string): string =>
  `${source}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

interface PixelPayload {
  channel: string
  source: string
  destination: string
}

export const trackWhatsAppClick = (source: string): void => {
  try {
    const eventId = makeEventId(source)

    if (!isMetaPixelReady()) {
      log.warn('fbq not ready. Event skipped.', { source, eventId })
      return
    }

    const payload: PixelPayload = {
      channel: 'whatsapp',
      source,
      destination: 'https://wa.me/64274069207',
    }

    window.fbq('track', 'Lead', payload, { eventID: eventId })
    window.fbq('trackCustom', 'WhatsAppClick', payload, { eventID: eventId })

    log.info('WhatsApp events sent', {
      source,
      eventId,
      events: ['Lead', 'WhatsAppClick'],
    })
  } catch (err) {
    log.error('Failed to track WhatsApp click:', err)
  }
}

// Type augmentation untuk window.fbq
declare global {
  interface Window {
    fbq: (
      command: string,
      event: string,
      payload?: PixelPayload | Record<string, unknown>,
      options?: { eventID: string }
    ) => void
  }
}
