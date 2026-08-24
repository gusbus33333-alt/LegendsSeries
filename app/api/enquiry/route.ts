import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/email'

const TEAM_INBOX = 'info@legends-series.com'

/** Enquiry text is user-supplied, so it must never reach the email as raw HTML. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="color:#999999;font-size:13px;padding:6px 16px 6px 0;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="color:#ffffff;font-size:13px;padding:6px 0;">${escapeHtml(value)}</td>
    </tr>`
}

/**
 * Notifies the team when the contact form is submitted. The enquiry is already
 * stored by then — this route only sends the alert, so a mail failure can never
 * lose the enquiry itself.
 */
export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, enquiryType, eventSlug, guests, message } =
      await req.json()

    if (!email || !firstName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!resend) {
      console.warn('Resend not configured — enquiry saved but no notification sent')
      return NextResponse.json({ sent: false })
    }

    const name = `${firstName} ${lastName ?? ''}`.trim()

    await resend.emails.send({
      from: 'Legends Series <noreply@contact.legends-series.com>',
      // Replying in the inbox goes straight back to the customer.
      replyTo: email,
      to: TEAM_INBOX,
      subject: `New enquiry — ${name}${eventSlug ? ` · ${eventSlug}` : ''}`,
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#f5f0e8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#0a0a0b;">
    <tr>
      <td style="padding:24px 28px;">
        <p style="color:#b8953f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 18px;">
          New Website Enquiry
        </p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('Name', name)}
          ${row('Email', email)}
          ${phone ? row('Phone', phone) : ''}
          ${enquiryType ? row('Type', enquiryType) : ''}
          ${eventSlug ? row('Event', eventSlug) : ''}
          ${guests ? row('Guests', String(guests)) : ''}
        </table>
        ${message ? `
        <p style="color:#999999;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:20px 0 8px;">Message</p>
        <p style="color:#ffffff;font-size:14px;line-height:1.6;margin:0;">${escapeHtml(message).replace(/\n/g, '<br/>')}</p>` : ''}
        <p style="color:#666666;font-size:11px;margin:22px 0 0;border-top:1px solid #ffffff20;padding-top:14px;">
          Reply to this email to answer ${escapeHtml(firstName)} directly.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`,
    })

    return NextResponse.json({ sent: true })
  } catch (err) {
    console.error('Failed to send enquiry notification:', err)
    return NextResponse.json({ error: 'Failed to notify' }, { status: 500 })
  }
}
