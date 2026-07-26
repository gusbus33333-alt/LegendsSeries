import { LoungeEvent, buildTimeline } from './lounge-events'
import { readFileSync } from 'fs'
import { join } from 'path'

let logoBase64: string | null = null
function getLogoBase64(): string {
  if (!logoBase64) {
    const buf = readFileSync(join(process.cwd(), 'Legends Series LOGO.webp'))
    logoBase64 = buf.toString('base64')
  }
  return logoBase64
}

interface BookingEmailData {
  customerName: string
  customerEmail: string
  event: LoungeEvent
  guests: number
  bookingRef: string
  qrDataURL: string
  totalPaid: string
}

const directions = {
  address: 'Access Self Storage, 30 Rugby Road, Twickenham, TW1 1DG',
  w3w: 'really.placed.likely',
  landmark: 'Directly opposite Gate F of Twickenham Stadium, behind the blue vertical iron railings.',
  byTrain: 'Twickenham station is a 10-minute walk. Trains run from London Waterloo every 15 minutes on matchday. If you arrive at the Twickenham Stadium statue, turn right onto Rugby Road. Continue a short distance and you will find us behind the blue railings, opposite Gate F.',
  byCar: 'Please note that all surrounding roads close 2 hours before kick-off, so we recommend arriving early or planning your journey accordingly. Limited parking available nearby.',
  onArrival: 'Look for the Legends Lounge marquee behind the blue vertical iron railings within the Access Self Storage facility, opposite Gate F. Show your QR code at the entrance.',
}

function buildEventIntro(event: LoungeEvent, guests: number): string {
  const guestBit = guests > 1
    ? ` for you and your ${guests - 1 === 1 ? 'guest' : `${guests - 1} guests`}`
    : ''

  if (event.isFinals) {
    return `Thank you for booking the Legends Lounge${guestBit} for the <strong style="color:#ffffff;">${event.match}</strong> on ${event.date}. We are going to have an incredible day — the best speakers, fantastic entertainment, a hog roast with all the bits, a hot butcher's pie when you come back in and unlimited drinks all day. Veggie options available for both pre and post-match.`
  }

  return `Thank you for booking the Legends Lounge${guestBit} for <strong style="color:#ffffff;">${event.match}</strong> on ${event.date}. We are going to have a cracking day — the best speakers, some fabulous entertainment (pre &amp; post-match), a hog roast with all the trimmings, a hot butcher's pie when you come back in and unlimited drinks for the full session. No probs, there are veggie options for both pre and post-match.`
}

function buildEventDetails(event: LoungeEvent): string {
  if (event.isFinals) {
    return `<p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0 0 20px;">
      Your ticket is <strong style="color:#ffffff;">interchangeable across all three Finals days</strong> — if your team's schedule changes or you fancy a different day, just turn up on whichever day suits you. Same wristband, same experience.
    </p>`
  }

  const koText = event.ko === 'TBC'
    ? 'Kick-off time is still TBC — we\'ll update you as soon as it\'s confirmed.'
    : `Kick-off is at ${event.ko}.`

  return `<p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0 0 20px;">
    The marquee opens at ${event.openTime} so come early and make the most of it. ${koText} We reopen the all-inclusive bar the moment the final whistle goes.
  </p>`
}

export function buildConfirmationEmail(data: BookingEmailData): string {
  const { customerName, event, guests, bookingRef, qrDataURL, totalPaid } = data
  const timeline = buildTimeline(event)
  const guestLabel = guests === 1 ? '1 guest' : `${guests} guests`

  const timelineRows = timeline
    .map(
      (entry) => `
      <tr>
        <td style="padding:8px 12px;font-weight:bold;color:#b8953f;white-space:nowrap;vertical-align:top;font-size:14px;">${entry.time}</td>
        <td style="padding:8px 12px;vertical-align:top;">
          <strong style="color:#ffffff;font-size:14px;">${entry.label}</strong><br/>
          <span style="color:#999999;font-size:13px;">${entry.description}</span>
        </td>
      </tr>`
    )
    .join('')

  const firstName = customerName.split(' ')[0] || customerName

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0e8;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0a0a0b;padding:30px 40px;text-align:center;">
              <img src="data:image/webp;base64,${getLogoBase64()}" width="200" alt="Legends Series" style="display:block;margin:0 auto 15px;"/>
              <p style="margin:5px 0 0;color:#ffffff40;font-size:10px;letter-spacing:4px;text-transform:uppercase;">Legends Lounge</p>
              <h2 style="margin:8px 0 0;color:#b8953f;font-size:20px;letter-spacing:4px;text-transform:uppercase;font-weight:bold;">Booking Confirmation</h2>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="background-color:#0a0a0b;padding:0 40px 30px;">

              <!-- Greeting -->
              <p style="color:#ffffff;font-size:16px;margin:0 0 20px;">
                Dear ${firstName},
              </p>

              <p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0 0 20px;">
                ${buildEventIntro(event, guests)}
              </p>

              ${buildEventDetails(event)}

              <p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0 0 30px;">
                Please check and share our socials on <strong style="color:#ffffff;">Facebook</strong> and <strong style="color:#ffffff;">Instagram</strong> — we'll be posting speaker announcements and event updates in the build-up.
              </p>

              <!-- QR Code -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;">
                <tr>
                  <td align="center" style="background-color:#141414;border:1px solid #b8953f33;padding:25px;">
                    <p style="color:#b8953f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 15px;">Your Entry QR Code</p>
                    <img src="${qrDataURL}" width="200" height="200" alt="QR Code" style="display:block;margin:0 auto;"/>
                    <p style="color:#ffffff;font-size:18px;font-weight:bold;margin:15px 0 5px;letter-spacing:1px;">${bookingRef}</p>
                    <p style="color:#999999;font-size:12px;margin:0;">Show this at the entrance · ${guestLabel}</p>
                    <p style="color:#999999;font-size:11px;margin:8px 0 0;">This QR code is single-use and will be marked as used on entry.</p>
                  </td>
                </tr>
              </table>

              <!-- Booking summary -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;background-color:#141414;border:1px solid #b8953f33;">
                <tr>
                  <td style="padding:20px 25px;">
                    <p style="color:#b8953f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 15px;">Booking Details</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Event</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;font-weight:bold;">${event.match}</td>
                      </tr>
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Date</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${event.date}</td>
                      </tr>
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Kick-off</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${event.ko === 'TBC' ? 'TBC — we\'ll update you' : event.ko}</td>
                      </tr>
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Marquee Opens</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${event.openTime}</td>
                      </tr>
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Guests</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${guestLabel}</td>
                      </tr>
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Total Paid</td>
                        <td style="color:#b8953f;font-size:13px;padding:6px 0;text-align:right;font-weight:bold;">${totalPaid}</td>
                      </tr>
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Booking Ref</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;font-weight:bold;">${bookingRef}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${event.isFinals && event.games ? `
              <!-- Finals games -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;background-color:#141414;border:1px solid #b8953f33;">
                <tr>
                  <td style="padding:20px 25px;">
                    <p style="color:#b8953f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 15px;">Games on This Day</p>
                    ${event.games.map((g) => `<p style="color:#ffffff;font-size:14px;margin:8px 0;">${g}</p>`).join('')}
                    <p style="color:#999999;font-size:12px;margin:10px 0 0;">Your ticket is interchangeable across all three Finals days.</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Timeline -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;background-color:#141414;border:1px solid #b8953f33;">
                <tr>
                  <td style="padding:20px 25px;">
                    <p style="color:#b8953f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 15px;">Your Day — Matchday Timeline</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${timelineRows}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Important info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;background-color:#1a1a1d;border-left:3px solid #b8953f;padding:0;">
                <tr>
                  <td style="padding:15px 20px;">
                    <p style="color:#b8953f;font-size:12px;font-weight:bold;margin:0 0 10px;">Important Information</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="color:#cccccc;font-size:13px;line-height:1.6;padding:4px 0;">• Roads close around the stadium <strong style="color:#ffffff;">2 hours prior to kick-off</strong>, so please plan accordingly.</td></tr>
                      <tr><td style="color:#cccccc;font-size:13px;line-height:1.6;padding:4px 0;">• This booking is for the Legends Lounge hospitality experience — <strong style="color:#ffffff;">a match ticket is not required</strong>. The marquee stays open during the game and shows every match on giant screens. If you don't have a match ticket, you're welcome to stay and watch from the Lounge. During the match, drinks are charged at £6 each.</td></tr>
                      <tr><td style="color:#cccccc;font-size:13px;line-height:1.6;padding:4px 0;">• If you invited guests and have not submitted their names yet, please reply to this email to let us know — it helps our staff on the day.</td></tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Directions -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;background-color:#141414;border:1px solid #b8953f33;">
                <tr>
                  <td style="padding:20px 25px;">
                    <p style="color:#b8953f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 15px;">Getting There</p>
                    <p style="color:#ffffff;font-size:14px;font-weight:bold;margin:0 0 5px;">${directions.address}</p>
                    <p style="color:#999999;font-size:12px;margin:0 0 5px;">What3Words: ${directions.w3w}</p>
                    <p style="color:#cccccc;font-size:13px;line-height:1.5;margin:0 0 15px;">${directions.landmark}</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#b8953f;font-size:12px;font-weight:bold;padding:8px 0 4px;">By Train</td>
                      </tr>
                      <tr>
                        <td style="color:#cccccc;font-size:13px;line-height:1.5;padding:0 0 12px;">${directions.byTrain}</td>
                      </tr>
                      <tr>
                        <td style="color:#b8953f;font-size:12px;font-weight:bold;padding:8px 0 4px;">By Car</td>
                      </tr>
                      <tr>
                        <td style="color:#cccccc;font-size:13px;line-height:1.5;padding:0 0 12px;">${directions.byCar}</td>
                      </tr>
                      <tr>
                        <td style="color:#b8953f;font-size:12px;font-weight:bold;padding:8px 0 4px;">On Arrival</td>
                      </tr>
                      <tr>
                        <td style="color:#cccccc;font-size:13px;line-height:1.5;padding:0;">${directions.onArrival}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Cancellation -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;background-color:#141414;border:1px solid #b8953f33;">
                <tr>
                  <td style="padding:20px 25px;">
                    <p style="color:#b8953f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 15px;">Cancellation Policy</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="color:#cccccc;font-size:13px;padding:4px 0;">Within 48 hours of booking → full refund</td></tr>
                      <tr><td style="color:#cccccc;font-size:13px;padding:4px 0;">After 48 hours, 30+ days before event → 100% credit to another event</td></tr>
                      <tr><td style="color:#cccccc;font-size:13px;padding:4px 0;">Less than 30 days before event → no refund or credit</td></tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Sign off -->
              <p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0 0 20px;">
                We appreciate your business and look forward to a fantastic day at Twickenham.
              </p>
              <p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0 0 5px;">
                See you there,
              </p>
              <p style="color:#ffffff;font-size:15px;font-weight:bold;margin:0 0 30px;">
                The Legends Series Team
              </p>

              <!-- Contact -->
              <p style="color:#999999;font-size:13px;line-height:1.6;text-align:center;margin:0 0 10px;">
                Questions? Reply to this email or contact us:
              </p>
              <p style="color:#ffffff;font-size:14px;text-align:center;margin:0 0 5px;">
                <a href="mailto:info@legends-series.com" style="color:#b8953f;text-decoration:none;">info@legends-series.com</a>
              </p>
              <p style="color:#ffffff;font-size:14px;text-align:center;margin:0 0 20px;">
                <a href="tel:+447595217647" style="color:#b8953f;text-decoration:none;">+44 (0) 7595 217647</a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#050505;padding:25px 40px;text-align:center;">
              <p style="color:#ffffff40;font-size:11px;margin:0 0 5px;">
                &copy; 2026 Legends Series Ltd. All rights reserved.
              </p>
              <p style="color:#ffffff30;font-size:10px;margin:0 0 5px;">
                Company Number: 16641401 &nbsp;|&nbsp; VAT Number: 507 4963 74
              </p>
              <p style="color:#ffffff30;font-size:10px;margin:0;">
                Play &amp; Party Alongside Your Heroes
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
