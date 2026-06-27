/**
 * Generates minimal PWA icons as solid-color PNG files using pure Node.js.
 * No external dependencies required.
 */
import { writeFileSync, mkdirSync } from 'fs'
import { deflateSync } from 'zlib'

function uint32BE(n) {
  const buf = Buffer.alloc(4)
  buf.writeUInt32BE(n >>> 0, 0)
  return buf
}

function crc32(buf) {
  const table = new Int32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1)
    table[i] = c
  }
  let crc = -1
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  return (~crc) >>> 0
}

function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const lenBuf = uint32BE(data.length)
  const crcInput = Buffer.concat([typeBuf, data])
  const crcBuf = uint32BE(crc32(crcInput))
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf])
}

function createSolidPNG(width, height, r, g, b) {
  const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8  // bit depth
  ihdr[9] = 2  // RGB
  // compression, filter, interlace = 0

  // Image data: filter byte (None=0) + RGB per pixel, one per row
  const row = Buffer.alloc(1 + width * 3)
  row[0] = 0
  for (let x = 0; x < width; x++) {
    row[1 + x * 3] = r
    row[2 + x * 3] = g
    row[3 + x * 3] = b
  }
  const rawData = Buffer.concat(Array.from({ length: height }, () => row))
  const compressed = deflateSync(rawData, { level: 9 })

  return Buffer.concat([
    PNG_SIG,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
}

mkdirSync('public/icons', { recursive: true })

// Background: #1a1a2e (dark navy)
const [r, g, b] = [0x1a, 0x1a, 0x2e]

writeFileSync('public/icons/icon-192.png', createSolidPNG(192, 192, r, g, b))
writeFileSync('public/icons/icon-512.png', createSolidPNG(512, 512, r, g, b))

console.log('✓ Generated public/icons/icon-192.png (192×192)')
console.log('✓ Generated public/icons/icon-512.png (512×512)')
