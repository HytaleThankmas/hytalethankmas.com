import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const publicDir = resolve(root, 'public')

const PINE = '#1e3228'
const GOLD = '#ffc864'
const CREAM = '#f6f0e0'
const DEEP_PINE = '#08130e'

// Designer's HT Short Tree Icon, viewBox 0 0 47.22 66.59
const TREE_PATH =
  'M47.22,54.78c-4.58-5.83-8.32-14.61-10.93-22.69,2.28-.32,3.93-1.48,4.9-2.46C32.54,19.32,24.03,2.2,22.96,0c-.96,2.08-8.37,16.48-16.86,24.79.98,1.06,2.7,2.48,5.27,2.81-2.36,7.97-5.95,19.31-11.37,25.94,2.03,2.64,10.14,4.61,15.25,1.72l-1.65,9.13c.4.22,3.96,2.2,9.35,2.2s8.89-1.98,9.29-2.2l-1.45-9.13c4.56,3.09,13.79,1.98,16.42-.47ZM22.22,20.2h1.36s5.95,22.72,5.95,22.72h-13.12l5.82-22.72Z'

// Designer's HT Spark Icon, viewBox 0 0 39 39
const SPARK_PATH =
  'M19.5,0l1.22,4.52c2.89,10.75,3.01,10.87,13.76,13.76l4.52,1.22-4.52,1.22c-10.75,2.89-10.87,3.01-13.76,13.76l-1.22,4.52-1.22-4.52c-2.89-10.75-3.01-10.87-13.76-13.76l-4.52-1.22,4.52-1.22c10.75-2.89,10.87-3.01,13.76-13.76l1.22-4.52Z'

/** Master tile: pine rounded square + gold ring + white tree + gold spark.
 *  rounded=false produces a full-bleed square for apple-touch-icon. */
function tileSvg(rounded: boolean): string {
  const base = rounded
    ? `<rect width="512" height="512" rx="118" fill="${PINE}"/>`
    : `<rect width="512" height="512" fill="${PINE}"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#162b20"/>
      <stop offset="1" stop-color="${PINE}"/>
    </linearGradient>
  </defs>
  ${rounded
    ? `<rect width="512" height="512" rx="118" fill="url(#bg)"/>`
    : `<rect width="512" height="512" fill="url(#bg)"/>`}
  <circle cx="256" cy="256" r="186" fill="none" stroke="${GOLD}" stroke-width="16"/>
  <g transform="translate(256 250) scale(3.6) translate(-23.61 -33.3)">
    <path d="${TREE_PATH}" fill="${CREAM}"/>
  </g>
  <g transform="translate(356 150) scale(0.9) translate(-19.5 -19.5)">
    <path d="${SPARK_PATH}" fill="${GOLD}"/>
  </g>
</svg>`
}

const PNG_SIZES: Record<string, number> = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
  'favicon.png': 196,
}

async function render(svg: string, size: number): Promise<Buffer> {
  return sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()
}

// Pack a multi-resolution .ico from PNG-encoded images (all major browsers + Windows support PNG-in-ICO).
function buildIco(images: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(images.length, 4)

  const dirSize = 16 * images.length
  let offset = 6 + dirSize
  const entries: Buffer[] = []
  const bodies: Buffer[] = []
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16)
    const dim = size >= 256 ? 0 : size
    entry.writeUInt8(dim, 0) // width
    entry.writeUInt8(dim, 1) // height
    entry.writeUInt8(0, 2) // palette
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(data.length, 8) // image size
    entry.writeUInt32LE(offset, 12) // offset
    entries.push(entry)
    bodies.push(data)
    offset += data.length
  }
  return Buffer.concat([header, ...entries, ...bodies])
}

/** Open Graph card 1200×630 — badge left, logotype right. */
function ogSvg(logoMarkup: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="ogbg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0e1e16"/>
      <stop offset="1" stop-color="${DEEP_PINE}"/>
    </linearGradient>
    <radialGradient id="ogglow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${GOLD}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#ogbg)"/>
  <circle cx="330" cy="315" r="420" fill="url(#ogglow)"/>
  <rect x="56" y="50" width="260" height="3" fill="${GOLD}"/>
  <g transform="translate(90 70) scale(0.62)">
    ${logoMarkup}
  </g>
  <text x="440" y="270" font-family="Salsa, sans-serif" font-size="88" fill="${GOLD}">Hytale Thankmas</text>
  <text x="440" y="350" font-family="Salsa, sans-serif" font-size="40" fill="${CREAM}">December 12, 2026</text>
  <text x="440" y="410" font-family="Salsa, sans-serif" font-size="40" fill="${CREAM}">Raising money for the</text>
  <text x="440" y="462" font-family="Salsa, sans-serif" font-size="40" fill="${CREAM}">Make-A-Wish Foundation</text>
  <g transform="translate(1050 130) scale(0.9) translate(-19.5 -19.5)">
    <path d="${SPARK_PATH}" fill="${GOLD}"/>
  </g>
  <g transform="translate(1090 300) scale(0.6) translate(-19.5 -19.5)">
    <path d="${SPARK_PATH}" fill="${CREAM}"/>
  </g>
</svg>`
}

await mkdir(publicDir, { recursive: true })

// Favicon tile (rounded) at every requested size
const tile = tileSvg(true)
for (const [name, size] of Object.entries(PNG_SIZES)) {
  await writeFile(resolve(publicDir, name), await render(tile, size))
  console.log(`wrote ${name} (${size}px)`)
}

const icoSizes = [16, 32, 48]
const icoImages = await Promise.all(
  icoSizes.map(async (size) => ({ size, data: await render(tile, size) })),
)
await writeFile(resolve(publicDir, 'favicon.ico'), buildIco(icoImages))
console.log(`wrote favicon.ico (${icoSizes.join('/')}px)`)

// Apple touch icon: full-bleed square, no transparency (iOS applies its own rounding)
await writeFile(resolve(publicDir, 'apple-touch-icon.png'), await render(tileSvg(false), 180))
console.log('wrote apple-touch-icon.png (180px)')

// Raster logo (transparent badge) for legacy/misc use
const badge = await sharp(Buffer.from(readFileSync(resolve(root, 'public/logo.svg'))))
  .resize(1024, 1024)
  .png()
  .toBuffer()
await writeFile(resolve(publicDir, 'logo.png'), badge)
console.log('wrote logo.png (1024px)')

// Open Graph card
const logoMarkup = readFileSync(resolve(root, 'public/logo.svg'), 'utf8')
const logoStart = logoMarkup.indexOf('<svg')
const logoInner = logoMarkup
  .slice(logoMarkup.indexOf('>', logoStart) + 1, logoMarkup.lastIndexOf('</svg>'))
  .replace(/<sodipodi:namedview[\s\S]*?\/>/, '')
await writeFile(resolve(publicDir, 'og.png'), await sharp(Buffer.from(ogSvg(logoInner))).png().toBuffer())
console.log('wrote og.png (1200x630)')
