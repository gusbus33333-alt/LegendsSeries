import { LoungeEvent, buildTimeline } from './lounge-events'
import { finalsMatchdays } from './follow-your-team'
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

/** The note is customer-supplied, so it must never reach the email as raw HTML. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

interface BookingEmailData {
  customerName: string
  customerEmail: string
  event: LoungeEvent
  guests: number
  bookingRef: string
  qrDataURL: string
  totalPaid: string
  /** Set for Follow Your Team bookings — the matchday is confirmed later. */
  followTeam?: string
  /** Free-text note from the booking form (club name, dietary needs, …). */
  customerNote?: string
  adults?: number
  under16?: number
  carParking?: number
  busParking?: number
  /** Signature upgrade rooms, each covering two guests. */
  signatureRooms?: number
  /** This matchday's share of any promotion, so the total is explicable. */
  discountAmount?: string | null
  promoCode?: string | null
  /** VAT breakdown. Together with the VAT number in the footer, this makes the
   *  confirmation usable as a VAT invoice by business customers. */
  netAmount?: string | null
  vatAmount?: string | null
}

const directions = {
  address: 'Access Self Storage, 30 Rugby Road, Twickenham, TW1 1DG',
  w3w: 'really.placed.likely',
  landmark: 'Directly opposite Gates E & F of Allianz Twickenham Stadium, behind the blue vertical iron railings.',
  byTrain: 'Twickenham Station is a good 10-minute walk away. Trains run from London Waterloo every 15 minutes on match day. The easiest way to get to the Legends Lounge is to get off the train at Richmond and take the courtesy bus, which drops you directly opposite the Legends Lounge entrance, opposite Gates E & F of Allianz Twickenham Stadium.',
  byCar: 'Please note that all surrounding roads close 2 hours before kick off and 2 hours after the final whistle. There is parking available for cars and buses on site, but your vehicle will need to be gone by 9am the next day.',
  onArrival: 'Look for the Legends Lounge marquee behind the blue vertical iron railings within the Access Self Storage facility, opposite Gates E & F. Show your QR code at the entrance.',
}

function buildEventIntro(event: LoungeEvent, guests: number, followTeam?: string): string {
  const guestBit = guests > 1
    ? ` for you and your ${guests - 1 === 1 ? 'guest' : `${guests - 1} guests`}`
    : ''

  if (followTeam) {
    return `Thank you for booking Follow Your Team${guestBit} — you're following <strong style="color:#ffffff;">${followTeam}</strong> through the Nations Cup Finals Weekend at Twickenham. Whichever day ${followTeam} play, you'll have full Legends Lounge hospitality: the best speakers, live music, a hog roast with all the trimmings, a hot butcher's pie after the game and unlimited drinks all day. Veggie options available for both pre and post-match.`
  }

  if (event.isFinals) {
    return `Thank you for booking the Legends Lounge${guestBit} for the <strong style="color:#ffffff;">${event.match}</strong> on ${event.date}. We are going to have an incredible day — the best speakers, fantastic entertainment, a hog roast with all the bits, a hot butcher's pie after the game and unlimited drinks all day. Veggie options available for both pre and post-match.`
  }

  return `Thank you for booking the Legends Lounge${guestBit} for <strong style="color:#ffffff;">${event.match}</strong> on ${event.date}. We are going to have a cracking day — the best speakers, some fabulous entertainment (pre &amp; post-match), a hog roast with all the trimmings, a hot butcher's pie after the game and unlimited drinks for the full session. No probs, there are veggie options for both pre and post-match.`
}

function buildEventDetails(event: LoungeEvent, followTeam?: string): string {
  if (followTeam) {
    return `<p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0 0 20px;">
      <strong style="color:#ffffff;">Your matchday is confirmed once the league stage finishes.</strong> ${followTeam}&rsquo;s final position decides which of the three Finals days they play — as soon as the fixtures are set, we&rsquo;ll email you the exact day and times. Nothing for you to do in the meantime; your booking is secure either way.
    </p>`
  }

  // Finals tickets used to be interchangeable across the three days. Follow
  // Your Team now covers people who want to track a specific side, so a
  // finals ticket is for the day it was booked. Times are in the details
  // table and the timeline below.
  if (event.isFinals) return ''

  const koText = event.ko === 'TBC'
    ? 'Kick-off time is still TBC — we\'ll update you as soon as it\'s confirmed.'
    : `Kick-off is at ${event.ko}.`

  return `<p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0 0 20px;">
    The marquee opens at ${event.openTime} so come early and make the most of it. ${koText} Last orders are at ${event.lastOrders} and the marquee closes at ${event.doorsClose}.
  </p>`
}

export function buildConfirmationEmail(data: BookingEmailData): string {
  const {
    customerName, event, guests, bookingRef, qrDataURL, totalPaid, followTeam, customerNote,
    adults, under16 = 0, carParking = 0, busParking = 0, signatureRooms = 0,
    discountAmount = null, promoCode = null, netAmount = null, vatAmount = null,
  } = data
  const adultCount = adults ?? guests
  // A Follow Your Team booking has no fixed schedule yet, so there is no
  // honest timeline to show — the matchday block replaces it below.
  const timeline = followTeam ? [] : buildTimeline(event)
  const guestLabel = guests === 1 ? '1 guest' : `${guests} guests`

  const timelineRows = timeline
    .map(
      (entry) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #ffffff10;">
          <p style="color:#b8953f;font-weight:bold;font-size:14px;margin:0 0 4px;">${entry.time}</p>
          <p style="color:#ffffff;font-size:14px;font-weight:bold;margin:0 0 4px;">${entry.label}</p>
          <p style="color:#999999;font-size:13px;line-height:1.5;margin:0;">${entry.description}</p>
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
                ${buildEventIntro(event, guests, followTeam)}
              </p>

              ${buildEventDetails(event, followTeam)}

              <p style="color:#cccccc;font-size:15px;line-height:1.6;margin:0 0 30px;">
                We'll be posting speaker announcements and event updates in the build-up to the Nations Championship. Please check and share our socials on <a href="https://www.facebook.com/BritishAndIrishLegends" style="color:#b8953f;font-weight:bold;text-decoration:none;">Facebook</a> and <a href="https://www.instagram.com/legends.series" style="color:#b8953f;font-weight:bold;text-decoration:none;">Instagram</a> for updates and a chance to win 2 tickets to the Legends Lounge during the 2027 Six Nations.
              </p>

              <!-- QR ticket note -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;">
                <tr>
                  <td align="center" style="background-color:#141414;border:1px solid #b8953f33;padding:25px;">
                    <p style="color:#b8953f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px;">Your Entry Passes</p>
                    <p style="color:#ffffff;font-size:15px;font-weight:bold;margin:0 0 8px;">${guests === 1 ? '1 QR ticket attached' : `${guests} QR tickets attached`}</p>
                    <p style="color:#999999;font-size:13px;line-height:1.5;margin:0;">Your QR ${guests === 1 ? 'pass is' : 'passes are'} attached to this email as ${guests === 1 ? 'an image' : 'images'}. Each one is unique and single-use — ${guests > 1 ? 'forward the relevant attachment to each guest so everyone can enter separately.' : 'show it at the entrance on the day.'}</p>
                    <p style="color:#ffffff;font-size:13px;margin:12px 0 0;">Booking Ref: <strong>${bookingRef}</strong></p>
                  </td>
                </tr>
              </table>

              ${customerNote ? `
              <!-- Customer's note back to them, so they can check we have it right -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;background-color:#141414;border:1px solid #b8953f33;">
                <tr>
                  <td style="padding:20px 25px;">
                    <p style="color:#b8953f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px;">Your Note to Us</p>
                    <p style="color:#ffffff;font-size:14px;line-height:1.6;margin:0;">${escapeHtml(customerNote).replace(/\n/g, '<br/>')}</p>
                    <p style="color:#999999;font-size:12px;line-height:1.5;margin:12px 0 0;">We&rsquo;ve passed this to the organisers. If anything looks wrong, just reply to this email.</p>
                  </td>
                </tr>
              </table>
              ` : ''}

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
                      ${followTeam ? `
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Team</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;font-weight:bold;">${followTeam}</td>
                      </tr>
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Your Matchday</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">Confirmed after the league stage</td>
                      </tr>
                      ` : `
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Marquee Opens</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${event.openTime}</td>
                      </tr>
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Kick-off</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${event.ko === 'TBC' ? 'TBC — we\'ll update you' : event.ko}</td>
                      </tr>
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Marquee Closes</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${event.doorsClose}</td>
                      </tr>
                      `}
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Guests</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${under16 > 0 ? `${adultCount} adult${adultCount === 1 ? '' : 's'}` : guestLabel}</td>
                      </tr>
                      ${under16 > 0 ? `
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Under 16s</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${under16} &middot; 15 and under</td>
                      </tr>` : ''}
                      ${carParking > 0 ? `
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Car parking</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${carParking} ${carParking === 1 ? 'space' : 'spaces'}</td>
                      </tr>` : ''}
                      ${busParking > 0 ? `
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Bus parking</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${busParking} ${busParking === 1 ? 'space' : 'spaces'}</td>
                      </tr>` : ''}
                      ${signatureRooms > 0 ? `
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Signature upgrade</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${signatureRooms} ${signatureRooms === 1 ? 'room' : 'rooms'} &middot; ${signatureRooms * 2} guests</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="color:#b8953f;font-size:12px;padding:4px 0 6px;line-height:1.5;">
                          Your hotel, private meet &amp; greet and gifts are included. We will be in touch with your room details.
                        </td>
                      </tr>` : ''}
                      ${carParking > 0 || busParking > 0 ? `
                      <tr>
                        <td colspan="2" style="color:#b8953f;font-size:12px;padding:4px 0 6px;line-height:1.5;">
                          Must be removed by 9am the morning after the game.
                        </td>
                      </tr>` : ''}
                      ${discountAmount ? `
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Discount${promoCode ? ` (${escapeHtml(promoCode)})` : ''}</td>
                        <td style="color:#b8953f;font-size:13px;padding:6px 0;text-align:right;">− ${discountAmount}</td>
                      </tr>` : ''}
                      ${netAmount && vatAmount ? `
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;border-top:1px solid #ffffff10;">Subtotal (ex VAT)</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;border-top:1px solid #ffffff10;">${netAmount}</td>
                      </tr>
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">VAT @ 20%</td>
                        <td style="color:#ffffff;font-size:13px;padding:6px 0;text-align:right;">${vatAmount}</td>
                      </tr>` : ''}
                      <tr>
                        <td style="color:#999999;font-size:13px;padding:6px 0;">Total Paid${netAmount ? ' (inc VAT)' : ''}</td>
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
                    <p style="color:#999999;font-size:12px;margin:10px 0 0;">Both matches are shown live on the giant screens in the Lounge.</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              ${followTeam ? `
              <!-- Which day will my team play -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;background-color:#141414;border:1px solid #b8953f33;">
                <tr>
                  <td style="padding:20px 25px;">
                    <p style="color:#b8953f;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 15px;">Which Day Will ${followTeam} Play?</p>
                    <p style="color:#999999;font-size:13px;line-height:1.5;margin:0 0 15px;">Each Finals day hosts two matches, decided by where the teams finish in the league:</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${finalsMatchdays.map((d) => `
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #ffffff10;">
                          <p style="color:#b8953f;font-weight:bold;font-size:14px;margin:0 0 3px;">${d.shortDay}</p>
                          <p style="color:#ffffff;font-size:13px;margin:0;">${d.positions}</p>
                        </td>
                      </tr>`).join('')}
                    </table>
                    <p style="color:#999999;font-size:12px;line-height:1.5;margin:15px 0 0;">We&rsquo;ll confirm your day and full timings by email as soon as the league stage finishes.</p>
                  </td>
                </tr>
              </table>
              ` : `
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
              `}

              <!-- Important info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;background-color:#1a1a1d;border-left:3px solid #b8953f;padding:0;">
                <tr>
                  <td style="padding:15px 20px;">
                    <p style="color:#b8953f;font-size:12px;font-weight:bold;margin:0 0 10px;">Important Information</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="color:#cccccc;font-size:13px;line-height:1.6;padding:4px 0;">• Roads close around the stadium <strong style="color:#ffffff;">2 hours prior to kick-off</strong>, so please plan accordingly.</td></tr>
                      <tr><td style="color:#cccccc;font-size:13px;line-height:1.6;padding:4px 0;">• This booking is for the Legends Lounge hospitality experience — <strong style="color:#ffffff;">a match ticket is not required</strong>. The marquee stays open during the game and shows every match on giant screens. If you don't have a match ticket, you're welcome to stay and watch from the Lounge. During the match, drinks are charged at £6 each.</td></tr>

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
