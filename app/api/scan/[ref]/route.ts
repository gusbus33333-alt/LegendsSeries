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

  // Check if already scanned
  const { data: existingScan } = await supabase
    .from('scans')
    .select('*')
    .eq('guest_ref', ref)
    .single()

  if (existingScan) {
    const time = new Date(existingScan.scanned_at).toLocaleTimeString('en-GB', {
      hour: '2-digit', minute: '2-digit',
    })
    return htmlResponse(
      'Already Scanned',
      `This ticket was already scanned at ${time}.<br><br><strong>${existingScan.customer_name}</strong><br>Guest ${existingScan.guest_number} of ${existingScan.total_guests} · ${existingScan.event_name}`,
      'warning'
    )
  }

  // Find the booking that contains this guest ref
  const { data: booking } = await supabase
    .from('bookings')
    .select('*')
    .contains('guest_refs', [ref])
    .single()

  if (!booking) {
    return htmlResponse('Invalid Ticket', `Booking reference <strong>${ref}</strong> not found.`, 'error')
  }

  const guestIndex = (booking.guest_refs as string[]).indexOf(ref)
  const guestNumber = guestIndex + 1

  // Record the scan
  const { error: insertError } = await supabase.from('scans').insert({
    guest_ref: ref,
    event_name: booking.event_name,
    customer_name: booking.customer_name,
    guest_number: guestNumber,
    total_guests: booking.guests,
  })

  if (insertError) {
    return htmlResponse('Scan Error', 'Could not record scan. Try again.', 'error')
  }

  return htmlResponse(
    'Entry Approved',
    `<strong>${booking.customer_name}</strong><br>Guest ${guestNumber} of ${booking.guests} · ${booking.event_name}`,
    'success'
  )
}

function htmlResponse(title: string, message: string, status: 'success' | 'warning' | 'error') {
  const colors = {
    success: { bg: '#0a2e0a', border: '#22c55e', text: '#22c55e', icon: '✓' },
    warning: { bg: '#2e2a0a', border: '#eab308', text: '#eab308', icon: '⚠' },
    error: { bg: '#2e0a0a', border: '#ef4444', text: '#ef4444', icon: '✗' },
  }
  const c = colors[status]

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title} — Legends Series</title></head>
<body style="margin:0;padding:40px 20px;background:#0a0a0b;font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;box-sizing:border-box;">
<div style="max-width:400px;width:100%;background:${c.bg};border:2px solid ${c.border};border-radius:16px;padding:40px 30px;text-align:center;">
<div style="font-size:60px;margin:0 0 10px;">${c.icon}</div>
<h1 style="color:${c.text};font-size:26px;margin:0 0 20px;letter-spacing:1px;font-weight:700;">${title}</h1>
<p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0;">${message}</p>
<p style="color:#ffffff30;font-size:11px;margin:24px 0 0;">${new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })} · Legends Series</p>
</div></body></html>`

  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
}
