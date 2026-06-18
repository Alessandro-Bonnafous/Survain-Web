// Rend transparent le faux fond « damier » (peint dans les pixels, pas une vraie
// transparence) du logo Discord. Le fond (damier + ombre portée) est ACHROMATIQUE
// (gris/blanc, R≈G≈B) ; le sujet (squircle Discord) est franchement BLEU. On
// flood-fille donc depuis les bords à travers les pixels achromatiques : le bleu
// stoppe le remplissage, et l'emblème blanc (enclos par le bleu) est préservé.
//
// Usage : node scripts/make-discord-transparent.mjs
import sharp from 'sharp'

const SRC = 'src/assets/images/discord-logo.png'
const OUT = 'src/assets/images/discord-logo-transparent.png'

// Tolérance d'achromaticité : un pixel est « fond » si max-min des canaux <= seuil.
const ACHROMATIC = 26

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info

const isBg = (idx) => {
  const r = data[idx]
  const g = data[idx + 1]
  const b = data[idx + 2]
  return Math.max(r, g, b) - Math.min(r, g, b) <= ACHROMATIC
}

const alpha = new Uint8Array(width * height).fill(255)
const visited = new Uint8Array(width * height)
const stack = []

const pushIfBg = (x, y) => {
  const p = y * width + x
  if (visited[p]) return
  if (isBg(p * channels)) {
    visited[p] = 1
    alpha[p] = 0
    stack.push(p)
  }
}
for (let x = 0; x < width; x++) {
  pushIfBg(x, 0)
  pushIfBg(x, height - 1)
}
for (let y = 0; y < height; y++) {
  pushIfBg(0, y)
  pushIfBg(width - 1, y)
}
while (stack.length) {
  const p = stack.pop()
  const x = p % width
  const y = (p - x) / width
  if (x > 0) pushIfBg(x - 1, y)
  if (x < width - 1) pushIfBg(x + 1, y)
  if (y > 0) pushIfBg(x, y - 1)
  if (y < height - 1) pushIfBg(x, y + 1)
}

const removed = alpha.reduce((n, a) => n + (a === 0 ? 1 : 0), 0)
console.log(
  `Pixels rendus transparents : ${removed} / ${width * height} (${((removed / (width * height)) * 100).toFixed(1)}%)`,
)

// Feather de l'alpha (sharp renvoie le flou 1 canal en gris 3 canaux → on lit le
// canal réel).
const { data: fa, info: faInfo } = await sharp(Buffer.from(alpha), {
  raw: { width, height, channels: 1 },
})
  .blur(0.8)
  .raw()
  .toBuffer({ resolveWithObject: true })
const faCh = faInfo.channels

const out = Buffer.alloc(width * height * 4)
for (let p = 0; p < width * height; p++) {
  out[p * 4] = data[p * channels]
  out[p * 4 + 1] = data[p * channels + 1]
  out[p * 4 + 2] = data[p * channels + 2]
  out[p * 4 + 3] = fa[p * faCh]
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(OUT)
console.log(`Écrit : ${OUT}`)
