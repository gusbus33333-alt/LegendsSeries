import QRCode from 'qrcode'
import sharp from 'sharp'

export async function generateQRDataURL(data: string): Promise<string> {
  return QRCode.toDataURL(data, {
    width: 300,
    margin: 2,
    color: { dark: '#0a0a0b', light: '#ffffff' },
  })
}

export async function generateQRBuffer(data: string): Promise<Buffer> {
  return QRCode.toBuffer(data, {
    width: 300,
    margin: 2,
    color: { dark: '#0a0a0b', light: '#ffffff' },
    type: 'png',
  })
}

interface TicketData {
  scanUrl: string
  bookingRef: string
  eventName: string
  eventDate: string
  koTime: string
  openTime: string
  guestNumber: number
  totalGuests: number
  customerName: string
}

export async function generateTicketPNG(data: TicketData): Promise<Buffer> {
  const qrSize = 280
  const qrBuffer = await QRCode.toBuffer(data.scanUrl, {
    width: qrSize,
    margin: 2,
    color: { dark: '#0a0a0b', light: '#ffffff' },
    type: 'png',
  })

  const width = 600
  const height = 820
  const gold = '#b8953f'

  const escXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap');
    </style>
  </defs>
  <rect width="${width}" height="${height}" rx="16" fill="#0a0a0b"/>
  <rect x="0" y="0" width="${width}" height="4" fill="${gold}"/>

  <!-- Header -->
  <text x="${width / 2}" y="50" text-anchor="middle" fill="${gold}" font-family="Arial,Helvetica,sans-serif" font-size="11" letter-spacing="4" font-weight="700">LEGENDS SERIES</text>
  <text x="${width / 2}" y="72" text-anchor="middle" fill="#ffffff60" font-family="Arial,Helvetica,sans-serif" font-size="9" letter-spacing="3">LEGENDS LOUNGE · TWICKENHAM</text>

  <!-- Divider -->
  <line x1="40" y1="90" x2="${width - 40}" y2="90" stroke="${gold}33" stroke-width="1"/>

  <!-- Guest label -->
  <text x="${width / 2}" y="120" text-anchor="middle" fill="${gold}" font-family="Arial,Helvetica,sans-serif" font-size="12" letter-spacing="3" font-weight="700">GUEST ${data.guestNumber} OF ${data.totalGuests}</text>

  <!-- Customer name -->
  <text x="${width / 2}" y="148" text-anchor="middle" fill="#ffffff" font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="700">${escXml(data.customerName)}</text>

  <!-- Event name -->
  <text x="${width / 2}" y="185" text-anchor="middle" fill="#ffffff" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="700">${escXml(data.eventName)}</text>

  <!-- Event details row -->
  <text x="100" y="225" text-anchor="middle" fill="#999999" font-family="Arial,Helvetica,sans-serif" font-size="10" letter-spacing="2">DATE</text>
  <text x="100" y="245" text-anchor="middle" fill="#ffffff" font-family="Arial,Helvetica,sans-serif" font-size="14" font-weight="600">${escXml(data.eventDate)}</text>

  <text x="300" y="225" text-anchor="middle" fill="#999999" font-family="Arial,Helvetica,sans-serif" font-size="10" letter-spacing="2">KICK-OFF</text>
  <text x="300" y="245" text-anchor="middle" fill="#ffffff" font-family="Arial,Helvetica,sans-serif" font-size="14" font-weight="600">${data.koTime}</text>

  <text x="500" y="225" text-anchor="middle" fill="#999999" font-family="Arial,Helvetica,sans-serif" font-size="10" letter-spacing="2">DOORS OPEN</text>
  <text x="500" y="245" text-anchor="middle" fill="#ffffff" font-family="Arial,Helvetica,sans-serif" font-size="14" font-weight="600">${data.openTime}</text>

  <!-- Divider -->
  <line x1="40" y1="270" x2="${width - 40}" y2="270" stroke="${gold}33" stroke-width="1"/>

  <!-- QR code background -->
  <rect x="${(width - qrSize - 30) / 2}" y="285" width="${qrSize + 30}" height="${qrSize + 30}" rx="12" fill="#ffffff"/>

  <!-- Booking ref -->
  <text x="${width / 2}" y="${285 + qrSize + 60}" text-anchor="middle" fill="#ffffff" font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="700" letter-spacing="1">${data.bookingRef}</text>

  <!-- Scan instruction -->
  <text x="${width / 2}" y="${285 + qrSize + 88}" text-anchor="middle" fill="#999999" font-family="Arial,Helvetica,sans-serif" font-size="12">Scan at entrance · Single use</text>

  <!-- Divider -->
  <line x1="40" y1="${285 + qrSize + 108}" x2="${width - 40}" y2="${285 + qrSize + 108}" stroke="${gold}33" stroke-width="1"/>

  <!-- Venue -->
  <text x="${width / 2}" y="${285 + qrSize + 138}" text-anchor="middle" fill="#999999" font-family="Arial,Helvetica,sans-serif" font-size="11">Access Self Storage, 30 Rugby Road, Twickenham, TW1 1DG</text>
  <text x="${width / 2}" y="${285 + qrSize + 158}" text-anchor="middle" fill="#999999" font-family="Arial,Helvetica,sans-serif" font-size="11">Opposite Gate F · What3Words: really.placed.likely</text>

  <!-- Footer -->
  <rect x="0" y="${height - 35}" width="${width}" height="35" fill="#050505" rx="0"/>
  <text x="${width / 2}" y="${height - 13}" text-anchor="middle" fill="#ffffff30" font-family="Arial,Helvetica,sans-serif" font-size="9">© 2026 Legends Series Ltd · Play &amp; Party Alongside Your Heroes</text>
</svg>`

  const bgImage = await sharp(Buffer.from(svg)).png().toBuffer()

  return sharp(bgImage)
    .composite([{
      input: qrBuffer,
      left: Math.round((width - qrSize) / 2),
      top: 300,
    }])
    .png()
    .toBuffer()
}
