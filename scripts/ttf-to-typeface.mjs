#!/usr/bin/env node
/**
 * Bakes a Google Font TTF into the `typeface.json` format that three.js'
 * FontLoader / drei's <Text3D> consumes, and writes it to public/fonts/.
 *
 * Why this exists: three@0.187 no longer ships any typeface.json files
 * (node_modules/three/examples only contains `jsm`), and the upstream
 * Big Shoulders Display is a *variable* font whose default instance is Thin.
 * So we instance it to a static weight with fontTools first, then convert.
 *
 * Usage:
 *   node scripts/ttf-to-typeface.mjs                 # Big Shoulders Display @ 800
 *   node scripts/ttf-to-typeface.mjs --font=anton    # static fallback face
 *
 * Requires: python3 with fontTools (only when the source is a variable font).
 */

import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'public', 'fonts')
const RAW = 'https://raw.githubusercontent.com/google/fonts/main'

const FACES = {
  'big-shoulders': {
    url: `${RAW}/ofl/bigshouldersdisplay/BigShouldersDisplay%5Bwght%5D.ttf`,
    axes: { wght: 800 },
    out: 'big-shoulders-800.typeface.json',
    weight: '800',
  },
  anton: {
    url: `${RAW}/ofl/anton/Anton-Regular.ttf`,
    axes: null,
    out: 'anton.typeface.json',
    weight: 'normal',
  },
}

// Everything the site renders in 3D, plus '?' which FontLoader uses as its
// fallback glyph for anything missing. Keeping this tight keeps the JSON small.
const CHARSET =
  ' ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  'abcdefghijklmnopqrstuvwxyz' +
  "0123456789.,:;!?&'\"()[]/\\@#%+-_=*"

const arg = process.argv.slice(2).find((a) => a.startsWith('--font='))
const faceKey = arg ? arg.split('=')[1] : 'big-shoulders'
const face = FACES[faceKey]
if (!face) {
  console.error(`Unknown --font=${faceKey}. Options: ${Object.keys(FACES).join(', ')}`)
  process.exit(1)
}

const work = join(tmpdir(), 'portfolio-typeface')
mkdirSync(work, { recursive: true })
mkdirSync(OUT_DIR, { recursive: true })

const srcTtf = join(work, `${faceKey}-src.ttf`)

if (!existsSync(srcTtf)) {
  console.log(`· downloading ${face.url}`)
  const res = await fetch(face.url)
  if (!res.ok) throw new Error(`download failed: ${res.status} ${res.statusText}`)
  writeFileSync(srcTtf, Buffer.from(await res.arrayBuffer()))
}
console.log(`· source ttf: ${srcTtf} (${readFileSync(srcTtf).length} bytes)`)

// ---- instance the variable font to a static weight -------------------------
let ttf = srcTtf
if (face.axes) {
  const locargs = Object.entries(face.axes).map(([k, v]) => `${k}=${v}`)
  ttf = join(work, `${faceKey}-static.ttf`)
  console.log(`· instancing with fontTools: ${locargs.join(' ')}`)
  try {
    execFileSync('python3', ['-m', 'fontTools.varLib.instancer', srcTtf, ...locargs, '-o', ttf], {
      stdio: ['ignore', 'pipe', 'pipe'],
    })
  } catch (err) {
    console.error('\nfontTools instancing failed. Install it with:\n  python3 -m pip install fonttools\n')
    console.error(String(err.stderr || err.message))
    console.error(`Alternatively run:  node scripts/ttf-to-typeface.mjs --font=anton\n`)
    process.exit(1)
  }
}

// ---- convert to typeface.json ---------------------------------------------
const font = opentype.parse(
  readFileSync(ttf).buffer.slice(
    readFileSync(ttf).byteOffset,
    readFileSync(ttf).byteOffset + readFileSync(ttf).byteLength,
  ),
)

const upm = font.unitsPerEm
const r = (n) => Math.round(n)

/**
 * three's FontLoader reads each glyph's `o` string as space-separated tokens.
 * Critically, curves list the END POINT FIRST and the control point(s) after:
 *   m  x y                      moveTo
 *   l  x y                      lineTo
 *   q  endX endY  cX cY         quadraticCurveTo(cX, cY, endX, endY)
 *   b  endX endY  c1X c1Y c2X c2Y   bezierCurveTo(c1, c2, end)
 * Coordinates are raw font units, y-up, baseline at 0 - which is exactly what
 * opentype's `glyph.path.commands` already gives us (getPath() would scale and
 * flip the y axis, so we deliberately do not use it).
 */
function outlineOf(cmds) {
  const out = []
  for (const c of cmds) {
    switch (c.type) {
      case 'M':
        out.push('m', r(c.x), r(c.y))
        break
      case 'L':
        out.push('l', r(c.x), r(c.y))
        break
      case 'Q':
        out.push('q', r(c.x), r(c.y), r(c.x1), r(c.y1))
        break
      case 'C':
        out.push('b', r(c.x), r(c.y), r(c.x1), r(c.y1), r(c.x2), r(c.y2))
        break
      case 'Z':
        // No 'z' action exists in FontLoader; subpaths are delimited by 'm'.
        break
    }
  }
  return out.join(' ')
}

const glyphs = {}
const missing = []
let xMinAll = Infinity
let xMaxAll = -Infinity
let yMinAll = Infinity
let yMaxAll = -Infinity

for (const ch of CHARSET) {
  const glyph = font.charToGlyph(ch)
  if (!glyph || glyph.index === 0) {
    missing.push(ch)
    continue
  }

  const cmds = glyph.path.commands
  let xMin = Infinity
  let xMax = -Infinity

  for (const c of cmds) {
    for (const [px, py] of [
      [c.x, c.y],
      [c.x1, c.y1],
      [c.x2, c.y2],
    ]) {
      if (typeof px !== 'number') continue
      if (px < xMin) xMin = px
      if (px > xMax) xMax = px
      if (px < xMinAll) xMinAll = px
      if (px > xMaxAll) xMaxAll = px
      if (typeof py !== 'number') continue
      if (py < yMinAll) yMinAll = py
      if (py > yMaxAll) yMaxAll = py
    }
  }

  const entry = {
    x_min: Number.isFinite(xMin) ? r(xMin) : 0,
    x_max: Number.isFinite(xMax) ? r(xMax) : 0,
    ha: r(glyph.advanceWidth),
  }
  const o = outlineOf(cmds)
  if (o) entry.o = o

  glyphs[ch] = entry
}

const head = font.tables.head || {}
const hhea = font.tables.hhea || {}
const post = font.tables.post || {}

const data = {
  glyphs,
  familyName: font.names.fontFamily?.en || faceKey,
  ascender: r(hhea.ascender ?? upm * 0.8),
  descender: r(hhea.descender ?? -upm * 0.2),
  underlinePosition: r(post.underlinePosition ?? -100),
  underlineThickness: r(post.underlineThickness ?? 50),
  boundingBox: {
    xMin: r(head.xMin ?? xMinAll),
    xMax: r(head.xMax ?? xMaxAll),
    yMin: r(head.yMin ?? yMinAll),
    yMax: r(head.yMax ?? yMaxAll),
  },
  resolution: upm,
  original_font_information: {
    fontFamily: font.names.fontFamily?.en,
    fontSubfamily: font.names.fontSubfamily?.en,
    licence: font.names.license?.en,
  },
  cssFontWeight: face.weight,
  cssFontStyle: 'normal',
}

const outPath = join(OUT_DIR, face.out)
writeFileSync(outPath, JSON.stringify(data))

console.log(`· unitsPerEm ${upm}  ascender ${data.ascender}  descender ${data.descender}`)
console.log(`· bbox ${JSON.stringify(data.boundingBox)}`)
console.log(`· glyphs written: ${Object.keys(glyphs).length} / ${CHARSET.length}`)
if (missing.length) console.log(`· missing (skipped): ${JSON.stringify(missing.join(''))}`)
console.log(`\n✓ ${outPath.replace(ROOT + '/', '')}  (${(readFileSync(outPath).length / 1024).toFixed(1)} kB)`)
