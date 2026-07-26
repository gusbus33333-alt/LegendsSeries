import QRCode from 'qrcode'

export async function generateQRDataURL(data: string): Promise<string> {
  return QRCode.toDataURL(data, {
    width: 300,
    margin: 2,
    color: { dark: '#0a0a0b', light: '#ffffff' },
  })
}
