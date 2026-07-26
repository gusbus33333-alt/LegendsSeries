import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params
  const supabase = getSupabase()

  if (!supabase) {
    return htmlResponse('System Error', 'Database not configured.', 'error')
  }

  const { data: booking, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_ref', ref)
    .single()

  if (error || !booking) {
    return htmlResponse('Invalid Ticket', `Booking reference ${ref} not found.`, 'error')
  }

  if (booking.scanned_at) {
    return htmlResponse(
      'Already Scanned',
      `This ticket was already scanned at ${new Date(booking.scanned_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}. Booking: ${ref} · ${booking.guests} guest${booking.guests > 1 ? 's' : ''} · ${booking.event_name}`,
      'warning'
    )
  }

  const { error: updateError } = await supabase
    .from('bookings')
    .update({ scanned_at: new Date().toISOString() })
    .eq('booking_ref', ref)

  if (updateError) {
    return htmlResponse('Scan Error', 'Could not mark ticket as scanned. Try again.', 'error')
  }

  return htmlResponse(
    'Entry Approved ✓',
    `${booking.customer_name} · ${booking.guests} guest${booking.guests > 1 ? 's' : ''} · ${booking.event_name}`,
    'success'
  )
}

function htmlResponse(title: string, message: string, status: 'success' | 'warning' | 'error') {
  const colors = {
    success: { bg: '#0a2e0a', border: '#22c55e', text: '#22c55e' },
    warning: { bg: '#2e2a0a', border: '#eab308', text: '#eab308' },
    error: { bg: '#2e0a0a', border: '#ef4444', text: '#ef4444' },
  }
  const c = colors[status]

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title} — Legends Series</title></head>
<body style="margin:0;padding:40px 20px;background:#0a0a0b;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;box-sizing:border-box;">
<div style="max-width:400px;width:100%;background:${c.bg};border:2px solid ${c.border};border-radius:12px;padding:40px 30px;text-align:center;">
<h1 style="color:${c.text};font-size:28px;margin:0 0 15px;letter-spacing:1px;">${title}</h1>
<p style="color:#cccccc;font-size:16px;line-height:1.5;margin:0;">${message}</p>
<p style="color:#ffffff40;font-size:12px;margin:20px 0 0;">${new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</p>
</div></body></html>`

  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
}
