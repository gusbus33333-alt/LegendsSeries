import QRCode from 'qrcode'
import sharp from 'sharp'
import satori from 'satori'
import { readFileSync } from 'fs'
import { join } from 'path'

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
  /** Optional gold pills, e.g. ['CHARITY WINNER', 'MERCH INCLUDED']. */
  badges?: string[]
}

let interRegular: ArrayBuffer | null = null
let interBold: ArrayBuffer | null = null

function loadFonts() {
  if (interRegular) return
  const dir = join(process.cwd(), 'lib', 'fonts')
  const regBuf = readFileSync(join(dir, 'Inter-Regular.ttf'))
  const boldBuf = readFileSync(join(dir, 'Inter-Bold.ttf'))
  interRegular = regBuf.buffer.slice(regBuf.byteOffset, regBuf.byteOffset + regBuf.byteLength)
  interBold = boldBuf.buffer.slice(boldBuf.byteOffset, boldBuf.byteOffset + boldBuf.byteLength)
}

export async function generateTicketPNG(data: TicketData): Promise<Buffer> {
  loadFonts()

  const qrSize = 280
  const qrPng = await QRCode.toBuffer(data.scanUrl, {
    width: qrSize,
    margin: 2,
    color: { dark: '#0a0a0b', light: '#ffffff' },
    type: 'png',
  })
  const qrB64 = `data:image/png;base64,${qrPng.toString('base64')}`

  const badges = data.badges?.filter(Boolean) ?? []
  const width = 600
  // Badge row needs its own vertical space or the footer overlaps the venue text.
  const height = 820 + (badges.length ? 46 : 0)
  const gold = '#b8953f'

  const markup = {
    type: 'div' as const,
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0b',
        borderRadius: '16px',
        fontFamily: 'Inter',
        position: 'relative' as const,
      },
      children: [
        // Gold top bar
        { type: 'div', props: { style: { position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: gold } } },
        // Header
        { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '32px' }, children: [
          { type: 'div', props: { style: { color: gold, fontSize: '11px', fontWeight: 700, letterSpacing: '4px' }, children: 'LEGENDS SERIES' } },
          { type: 'div', props: { style: { color: '#999999', fontSize: '9px', letterSpacing: '3px', marginTop: '8px' }, children: 'LEGENDS LOUNGE · TWICKENHAM' } },
        ] } },
        // Divider
        { type: 'div', props: { style: { width: '520px', height: '1px', backgroundColor: '#b8953f33', marginTop: '14px' } } },
        // Guest label
        { type: 'div', props: { style: { color: gold, fontSize: '12px', fontWeight: 700, letterSpacing: '3px', marginTop: '16px' }, children: `GUEST ${data.guestNumber} OF ${data.totalGuests}` } },
        // Customer name
        { type: 'div', props: { style: { color: '#ffffff', fontSize: '18px', fontWeight: 700, marginTop: '10px' }, children: data.customerName } },
        // Event name
        { type: 'div', props: { style: { color: '#ffffff', fontSize: '22px', fontWeight: 700, marginTop: '14px' }, children: data.eventName } },
        // Details row
        { type: 'div', props: { style: { display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '18px', paddingLeft: '40px', paddingRight: '40px' }, children: [
          { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: [
            { type: 'div', props: { style: { color: '#999999', fontSize: '10px', letterSpacing: '2px' }, children: 'DATE' } },
            { type: 'div', props: { style: { color: '#ffffff', fontSize: '14px', fontWeight: 700, marginTop: '4px' }, children: data.eventDate } },
          ] } },
          { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: [
            { type: 'div', props: { style: { color: '#999999', fontSize: '10px', letterSpacing: '2px' }, children: 'KICK-OFF' } },
            { type: 'div', props: { style: { color: '#ffffff', fontSize: '14px', fontWeight: 700, marginTop: '4px' }, children: data.koTime } },
          ] } },
          { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: [
            { type: 'div', props: { style: { color: '#999999', fontSize: '10px', letterSpacing: '2px' }, children: 'DOORS OPEN' } },
            { type: 'div', props: { style: { color: '#ffffff', fontSize: '14px', fontWeight: 700, marginTop: '4px' }, children: data.openTime } },
          ] } },
        ] } },
        // Badges (charity winner, merch included, …)
        ...(badges.length
          ? [{ type: 'div', props: { style: { display: 'flex', justifyContent: 'center', marginTop: '16px' }, children: badges.map((b) => ({
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  color: gold,
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  border: `1px solid ${gold}`,
                  borderRadius: '999px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  paddingLeft: '14px',
                  paddingRight: '14px',
                  marginLeft: '5px',
                  marginRight: '5px',
                },
                children: b,
              },
            })) } }]
          : []),
        // Divider
        { type: 'div', props: { style: { width: '520px', height: '1px', backgroundColor: '#b8953f33', marginTop: '14px' } } },
        // QR code with white background
        { type: 'div', props: { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${qrSize + 30}px`, height: `${qrSize + 30}px`, backgroundColor: '#ffffff', borderRadius: '12px', marginTop: '14px' }, children: [
          { type: 'img', props: { src: qrB64, width: qrSize, height: qrSize } },
        ] } },
        // Booking ref
        { type: 'div', props: { style: { color: '#ffffff', fontSize: '18px', fontWeight: 700, letterSpacing: '1px', marginTop: '16px' }, children: data.bookingRef } },
        // Scan instruction
        { type: 'div', props: { style: { color: '#999999', fontSize: '12px', marginTop: '10px' }, children: 'Scan at entrance · Single use' } },
        // Divider
        { type: 'div', props: { style: { width: '520px', height: '1px', backgroundColor: '#b8953f33', marginTop: '16px' } } },
        // Venue
        { type: 'div', props: { style: { color: '#999999', fontSize: '11px', marginTop: '14px' }, children: 'Access Self Storage, 30 Rugby Road, Twickenham, TW1 1DG' } },
        { type: 'div', props: { style: { color: '#999999', fontSize: '11px', marginTop: '4px' }, children: 'Opposite Gates E & F · What3Words: really.placed.likely' } },
        // Footer
        { type: 'div', props: { style: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '35px', backgroundColor: '#050505', display: 'flex', justifyContent: 'center', alignItems: 'center' }, children: [
          { type: 'div', props: { style: { color: '#666666', fontSize: '9px' }, children: '© 2026 Legends Series Ltd · Play & Party Alongside Your Heroes' } },
        ] } },
      ],
    },
  }

  const svg = await satori(markup as any, {
    width,
    height,
    fonts: [
      { name: 'Inter', data: interRegular!, weight: 400, style: 'normal' as const },
      { name: 'Inter', data: interBold!, weight: 700, style: 'normal' as const },
    ],
  })

  return sharp(Buffer.from(svg)).png().toBuffer()
}
