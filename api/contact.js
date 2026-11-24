/**
 * POST /api/contact — Vercel Serverless Function.
 *
 * Validates the proposal form server-side. If RESEND_API_KEY and
 * NOTIFY_EMAIL are set, it emails the lead via Resend and returns
 * { ok: true, reference }. If they are NOT set, it returns HTTP 503
 * with a clear error — the frontend shows that error and NEVER a
 * fake success. Do not change this to return success without delivery.
 */

const REQUIRED = ['name', 'email', 'company', 'service', 'details']

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}

  const errors = {}
  for (const field of REQUIRED) {
    if (!String(body[field] || '').trim()) errors[field] = `${field} is required.`
  }
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email).trim())) {
    errors.email = 'Please enter a valid business email.'
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Please check the form and try again.', errors })
  }

  const apiKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.NOTIFY_EMAIL
  const fromEmail = process.env.FROM_EMAIL || 'Linkora Reach <onboarding@resend.com>'

  // Email delivery is NOT configured — be honest about it.
  if (!apiKey || !notifyEmail) {
    return res.status(503).json({
      error: 'Proposal form is not connected yet — email delivery is not configured',
    })
  }

  const reference = `LR-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`

  const text = [
    `New proposal request — ${reference}`,
    ``,
    `Name: ${body.name}`,
    `Business email: ${body.email}`,
    `Company: ${body.company}`,
    `Website: ${body.website || '—'}`,
    `Required service: ${body.service}`,
    `Monthly budget: ${body.budget || '—'}`,
    `Target country: ${body.country || '—'}`,
    ``,
    `Project details:`,
    `${body.details}`,
  ].join('\n')

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [notifyEmail],
        reply_to: String(body.email).trim(),
        subject: `New proposal request (${reference}) — ${body.company}`,
        text,
      }),
    })
    if (!r.ok) {
      const detail = await r.text().catch(() => '')
      console.error('Resend error:', r.status, detail)
      return res.status(502).json({ error: 'Email delivery failed. Please try again or email us directly.' })
    }
    return res.status(200).json({ ok: true, reference })
  } catch (err) {
    console.error('Contact handler error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s)
  } catch {
    return {}
  }
}
