/**
 * Meta Pixel + CAPI helper — Fresh Soy Tempeh
 *
 * ── Usage ──────────────────────────────────────────────
 *   trackLead(source)         → standard Lead event
 *   trackViewContent(source)  → standard ViewContent event
 *   trackInitiateCheckout(s)  → standard InitiateCheckout event
 * ───────────────────────────────────────────────────────
 *
 * EMQ note: kirim hashed email/phone via CAPI (server-side),
 *            bukan dari client-side karena alasan privacy.
 */

// ── Helpers ────────────────────────────────────────────

export const isMetaPixelReady = () =>
  typeof window !== 'undefined' && typeof window.fbq === 'function'

const makeEventId = (source) =>
  `${source}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

/**
 * Bikin UTM query string untuk WhatsApp links.
 * Contoh output:
 *   ?utm_source=meta&utm_medium=whatsapp&utm_campaign=freshsoytempeh&utm_content=whatsapp-order-button
 */
export const makeWhatsAppUrl = (phone, source, options = {}) => {
  const base = `https://wa.me/${phone}`
  const params = new URLSearchParams({
    utm_source: options.utmSource || 'meta',
    utm_medium: 'whatsapp',
    utm_campaign: options.utmCampaign || 'freshsoytempeh',
    utm_content: source,
  })
  // text optional (pre-filled message)
  if (options.text) params.set('text', options.text)
  return `${base}?${params.toString()}`
}

// ── CAPI Gateway URL ─────────────────────────────
// Worker sudah di-deploy ke Cloudflare.
// Jika DNS sudah resolve, URL: https://capi.freshsoytempeh.nz
// Fallback workers.dev: https://freshsoytempeh-capi.ridho90.workers.dev
const CAPI_GATEWAY_URL =
  'https://capi.freshsoytempeh.nz'

async function sendToCAPI(event_name, event_id, source, extras = {}) {
  try {
    // Ambil fbp dan fbc dari cookie jika ada
    const getCookie = (name) => {
      const match = document.cookie.match(
        new RegExp(`(^| )${name}=([^;]+)`)
      )
      return match ? match[2] : undefined
    }

    const payload = {
      event_name,
      event_id,
      source,
      event_source_url: window.location.href,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
      currency: 'NZD',
      value: 12.0,
      ...extras,
    }

    const response = await fetch(CAPI_GATEWAY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await response.json()
    console.info('[MetaPixel] CAPI event sent:', { event_name, event_id, result })
    return result
  } catch (err) {
    // CAPI failure should not break user experience
    console.warn('[MetaPixel] CAPI send failed (non-critical):', err.message)
  }
}

// ── Event Trackers ──────────────────────────────────────

/**
 * Standard Lead event + CAPI.
 * Gunakan untuk semua WhatsApp click / order.
 */
export const trackLead = (source, { email, phone } = {}) => {
  const eventId = makeEventId(source)

  // 1. Send to Pixel (client-side)
  if (!isMetaPixelReady()) {
    console.warn('[MetaPixel] fbq not ready — Lead event skipped', {
      source,
      eventId,
    })
  } else {
    const payload = {
      channel: 'whatsapp',
      source,
      currency: 'NZD',
      value: 12.0,
    }

    window.fbq('track', 'Lead', payload, { eventID: eventId })

    console.info('[MetaPixel] Lead ← Pixel event sent', {
      source,
      eventId,
      payload,
    })
  }

  // 2. Send to CAPI (server-side) — bypass ad blockers
  sendToCAPI('Lead', eventId, source, { email, phone })
}

/**
 * ViewContent — panggil saat user lihat halaman produk / landing.
 */
export const trackViewContent = (source, content_name) => {
  const eventId = makeEventId(source)

  if (!isMetaPixelReady()) {
    console.warn('[MetaPixel] fbq not ready — ViewContent skipped')
    return
  }

  window.fbq('track', 'ViewContent', {
    content_name: content_name || 'Fresh Soy Tempeh',
    content_category: 'food',
    currency: 'NZD',
    value: 12.0,
    source,
  }, { eventID: eventId })

  // CAPI
  sendToCAPI('ViewContent', eventId, source)
}

/**
 * InitiateCheckout — panggil saat user klik order / mulai checkout via WhatsApp.
 */
export const trackInitiateCheckout = (source) => {
  const eventId = makeEventId(source)

  if (!isMetaPixelReady()) {
    console.warn('[MetaPixel] fbq not ready — InitiateCheckout skipped')
    return
  }

  window.fbq('track', 'InitiateCheckout', {
    channel: 'whatsapp',
    currency: 'NZD',
    value: 12.0,
    source,
  }, { eventID: eventId })

  // CAPI
  sendToCAPI('InitiateCheckout', eventId, source)
}
