import QRCode from 'qrcode'
import sharp, { OverlayOptions } from 'sharp'

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

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function textImage(
  text: string,
  fontSize: number,
  color: string,
  opts?: { bold?: boolean; maxWidth?: number; spacing?: number }
): Promise<Buffer> {
  const weight = opts?.bold ? 'bold' : 'normal'
  const spacingAttr = opts?.spacing ? ` letter_spacing="${Math.round(opts.spacing * 1024)}"` : ''
  const pango = `<span font_weight="${weight}" foreground="${color}" font="${fontSize}"${spacingAttr}>${esc(text)}</span>`
  return sharp({
    text: {
      text: pango,
      font: 'sans',
      dpi: 72,
      rgba: true,
      width: opts?.maxWidth || 580,
      align: 'centre' as any,
    },
  }).png().toBuffer()
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

  const bgSvg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="16" fill="#0a0a0b"/>
  <rect x="0" y="0" width="${width}" height="4" fill="${gold}"/>
  <line x1="40" y1="90" x2="${width - 40}" y2="90" stroke="${gold}33" stroke-width="1"/>
  <line x1="40" y1="270" x2="${width - 40}" y2="270" stroke="${gold}33" stroke-width="1"/>
  <rect x="${(width - qrSize - 30) / 2}" y="285" width="${qrSize + 30}" height="${qrSize + 30}" rx="12" fill="#ffffff"/>
  <line x1="40" y1="${285 + qrSize + 108}" x2="${width - 40}" y2="${285 + qrSize + 108}" stroke="${gold}33" stroke-width="1"/>
  <rect x="0" y="${height - 35}" width="${width}" height="35" fill="#050505"/>
</svg>`

  const layers = await Promise.all([
    textImage('LEGENDS SERIES', 11, gold, { bold: true, spacing: 4 }),
    textImage('LEGENDS LOUNGE  ·  TWICKENHAM', 9, '#999999', { spacing: 3 }),
    textImage(`GUEST ${data.guestNumber} OF ${data.totalGuests}`, 12, gold, { bold: true, spacing: 3 }),
    textImage(data.customerName, 18, '#ffffff', { bold: true }),
    textImage(data.eventName, 22, '#ffffff', { bold: true }),
    textImage('DATE', 10, '#999999', { spacing: 2, maxWidth: 150 }),
    textImage(data.eventDate, 14, '#ffffff', { bold: true, maxWidth: 150 }),
    textImage('KICK-OFF', 10, '#999999', { spacing: 2, maxWidth: 150 }),
    textImage(data.koTime, 14, '#ffffff', { bold: true, maxWidth: 150 }),
    textImage('DOORS OPEN', 10, '#999999', { spacing: 2, maxWidth: 150 }),
    textImage(data.openTime, 14, '#ffffff', { bold: true, maxWidth: 150 }),
    textImage(data.bookingRef, 18, '#ffffff', { bold: true, spacing: 1 }),
    textImage('Scan at entrance  ·  Single use', 12, '#999999'),
    textImage('Access Self Storage, 30 Rugby Road, Twickenham, TW1 1DG', 11, '#999999'),
    textImage('Opposite Gate F  ·  What3Words: really.placed.likely', 11, '#999999'),
    textImage('© 2026 Legends Series Ltd  ·  Play & Party Alongside Your Heroes', 9, '#666666'),
  ])

  async function centerLeft(buf: Buffer, containerWidth: number) {
    const meta = await sharp(buf).metadata()
    return Math.round((containerWidth - (meta.width || 0)) / 2)
  }

  const centeredRows: { idx: number; top: number; containerWidth?: number }[] = [
    { idx: 0, top: 38 },
    { idx: 1, top: 60 },
    { idx: 2, top: 108 },
    { idx: 3, top: 133 },
    { idx: 4, top: 168 },
    { idx: 11, top: 285 + qrSize + 45 },
    { idx: 12, top: 285 + qrSize + 73 },
    { idx: 13, top: 285 + qrSize + 123 },
    { idx: 14, top: 285 + qrSize + 143 },
    { idx: 15, top: height - 27 },
  ]

  const composites: OverlayOptions[] = [
    { input: qrBuffer, left: Math.round((width - qrSize) / 2), top: 300 },
  ]

  for (const row of centeredRows) {
    composites.push({
      input: layers[row.idx],
      left: await centerLeft(layers[row.idx], row.containerWidth || width),
      top: row.top,
    })
  }

  const detailCols = [
    { labelIdx: 5, valueIdx: 6, cx: 100 },
    { labelIdx: 7, valueIdx: 8, cx: 300 },
    { labelIdx: 9, valueIdx: 10, cx: 500 },
  ]

  for (const col of detailCols) {
    const lm = await sharp(layers[col.labelIdx]).metadata()
    const vm = await sharp(layers[col.valueIdx]).metadata()
    composites.push({
      input: layers[col.labelIdx],
      left: Math.round(col.cx - (lm.width || 0) / 2),
      top: 215,
    })
    composites.push({
      input: layers[col.valueIdx],
      left: Math.round(col.cx - (vm.width || 0) / 2),
      top: 235,
    })
  }

  const bg = await sharp(Buffer.from(bgSvg)).png().toBuffer()
  return sharp(bg).composite(composites).png().toBuffer()
}
