/**
 * ─────────────────────────────────────────────────────────
 *  Meta CAPI Gateway — Cloudflare Worker
 * ─────────────────────────────────────────────────────────
 *
 *  Deploy this Worker, then call it FROM YOUR BROWSER
 *  via `fetch()` whenever a conversion event happens.
 *
 *  This Worker:
 *    1. Receives the event payload from the client
 *    2. Forwards it to Meta Conversions API (server→server)
 *    3. Bypasses ad blockers & iOS ATT limitations
 *    4. Adds hashed customer data (email/phone) for EMQ
 *
 * ── Deploy ──────────────────────────────────────────────
 *   npx wrangler deploy worker/CAPI_Gateway.js --name freshsoytempeh-capi
 *
 * ── Environment Variables ───────────────────────────────
 *   PIXEL_ID     = 2368715833611861
 *   ACCESS_TOKEN = (dapat dari Meta Events Manager → Settings)
 *   GRAPH_API    = https://graph.facebook.com/v21.0
 *
 * ── Client-side call ────────────────────────────────────
 *   fetch('https://freshsoytempeh-capi.your-account.workers.dev', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *       event_name: 'Lead',
 *       source: 'whatsapp-order-button',
 *       event_id: 'unique-id',
 *       email: 'customer@email.com',    // plain text — Worker will hash it
 *       phone: '+64274069207',           // plain text — Worker will hash it
 *     })
 *   })
 * ─────────────────────────────────────────────────────────
 */

// ── Configuration ───────────────────────────────────────
const PIXEL_ID = '2368715833611861'
const GRAPH_API = 'https://graph.facebook.com/v21.0'
// Fallback token — dapat di-override via env (ACCESS_TOKEN)
// Untuk security lebih baik set via Cloudflare Dashboard → Workers → freshsoytempeh-capi → Settings → Variables
const FALLBACK_TOKEN =
  'EAAnfHEjrmZBkBRQso8imiEck0shNYpA8B766G3sZCl4rJl6Xi8WLALEyX4Q3PQIjupd1sOHX6rxuFSLcXnfXFTwe3AMV8UsCO919euRrwPTbxANka0KgGgTnwErdx37H7iUe4R2IB9BwwduhjufBGG8xr6Mw0MGjZBTy0k5ZCw3aLEiPTxiZCP2leVLtdOgZDZD'

// ── SHA-256 Hashing ─────────────────────────────────────
async function sha256(text) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

// ── Normalisasi phone number ────────────────────────────
function normalizePhone(phone) {
  // Hapus semua non-digit
  let cleaned = phone.replace(/\D/g, '')
  // Jika mulai dengan 0, ganti dengan 62 (Indonesia) atau 64 (NZ)
  if (cleaned.startsWith('0')) {
    cleaned = '64' + cleaned.slice(1) // NZ code
  }
  // Jika tidak mulai dengan 64 atau 62, tambah 64
  if (!cleaned.startsWith('64') && !cleaned.startsWith('62')) {
    cleaned = '64' + cleaned
  }
  return cleaned
}

// ── Main Handler ────────────────────────────────────────
export default {
  async fetch(request, env) {
    // ── ACCESS_TOKEN ──────────────────────────────────
    // Prioritas: env.ACCESS_TOKEN (secret) → FALLBACK_TOKEN (hardcoded)
    // Set env variable via Cloudflare Dashboard → Workers → freshsoytempeh-capi → Settings → Variables
    const ACCESS_TOKEN = env.ACCESS_TOKEN || FALLBACK_TOKEN

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    // ── GET — Test page ──────────────────────────────────
    if (request.method === 'GET') {
      return new Response(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fresh Soy Tempeh — CAPI Gateway Test</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      text-align: center;
    }
    h1 { font-size: 24px; color: #1a1a2e; margin-bottom: 8px; }
    p { color: #666; margin-bottom: 24px; line-height: 1.6; }
    .url { background: #f0f0f5; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 13px; color: #555; word-break: break-all; margin-bottom: 24px; }
    button {
      background: #25D366;
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
    }
    button:hover { background: #1ebe5d; transform: translateY(-1px); }
    button:active { transform: translateY(0); }
    button:disabled { background: #ccc; cursor: not-allowed; transform: none; }
    .result {
      margin-top: 20px;
      padding: 16px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 13px;
      text-align: left;
      white-space: pre-wrap;
      word-break: break-word;
      display: none;
    }
    .result.success { background: #e8f5e9; color: #2e7d32; display: block; }
    .result.error { background: #fbe9e7; color: #c62828; display: block; }
    .badge {
      display: inline-block;
      background: #e8f5e9;
      color: #2e7d32;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .status { margin-top: 20px; font-size: 13px; color: #888; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">✅ CAPI Gateway — Live</div>
    <h1>Fresh Soy Tempeh</h1>
    <p>Klik tombol di bawah untuk mengirim test event <strong>Lead</strong> ke Meta Conversions API</p>
    <div class="url">POST → capi.freshsoytempeh.nz</div>
    <button id="sendBtn" onclick="sendTestEvent()">🚀 Kirim Test Event ke Meta</button>
    <div id="result" class="result"></div>
    <div id="status" class="status"></div>
  </div>
  <script>
    async function sendTestEvent() {
      const btn = document.getElementById('sendBtn')
      const result = document.getElementById('result')
      const status = document.getElementById('status')
      btn.disabled = true
      btn.textContent = '⏳ Mengirim...'
      result.className = 'result'
      result.textContent = ''
      status.textContent = ''

      try {
        const res = await fetch(window.location.href, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_name: 'Lead',
            event_id: 'browser-test-' + Date.now(),
            source: 'test-page'
          })
        })
        const data = await res.json()
        result.className = 'result success'
        result.textContent = JSON.stringify(data, null, 2)
        if (data.success) {
          status.textContent = '✅ Event berhasil diterima oleh Meta! Cek di Events Manager.'
          status.style.color = '#2e7d32'
        }
      } catch (err) {
        result.className = 'result error'
        result.textContent = 'Error: ' + err.message
      }
      btn.disabled = false
      btn.textContent = '🚀 Kirim Test Event ke Meta'
    }
  </script>
</body>
</html>`,
        { headers: { 'Content-Type': 'text/html', ...corsHeaders } }
      )
    }

    try {
      const body = await request.json()
      const { event_name, event_id, email, phone, source } = body

      if (!event_name || !event_id) {
        return new Response(
          JSON.stringify({ error: 'event_name and event_id required' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        )
      }

      // ── Build CAPI payload ────────────────────────────
      const userData = {}

      // Hash email if provided (biggest EMQ boost: +4.0 points)
      if (email) {
        userData.em = await sha256(email.trim().toLowerCase())
      }

      // Hash phone if provided (+3.0 EMQ points)
      if (phone) {
        const normalized = normalizePhone(phone)
        userData.ph = await sha256(normalized)
      }

      // Client IP and User Agent (Meta uses these for matching)
      userData.client_ip_address = request.headers.get('CF-Connecting-IP') || ''
      userData.client_user_agent = request.headers.get('User-Agent') || ''

      // fbp and fbc — passed from the client if available
      if (body.fbp) userData.fbp = body.fbp
      if (body.fbc) userData.fbc = body.fbc

      // ── Send to Meta CAPI ─────────────────────────────
      const capiPayload = {
        data: [
          {
            event_name,
            event_time: Math.floor(Date.now() / 1000),
            event_id,
            event_source_url: body.event_source_url || 'https://freshsoytempeh.co.nz',
            action_source: 'website',
            user_data: userData,
            custom_data: {
              source,
              channel: 'whatsapp',
              currency: body.currency || 'NZD',
              value: body.value || 12.0,
            },
          },
        ],
      }

      console.log('[CAPI] Sending event:', JSON.stringify(capiPayload, null, 2))

      const url = `${GRAPH_API}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capiPayload),
      })

      const result = await response.json()

      console.log('[CAPI] Meta response:', JSON.stringify(result))

      return new Response(JSON.stringify({ success: true, meta: result }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    } catch (error) {
      console.error('[CAPI] Error:', error.message)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }
  },
}
