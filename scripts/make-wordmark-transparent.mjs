// Rend transparent le fond noir de survain-wordmark-noir.png.
// Stratégie : flood-fill depuis les bords (les pixels « quasi noirs » connectés
// au bord deviennent transparents). On ne touche PAS aux pixels sombres
// intérieurs aux lettres (gravures), donc pas de trous. Léger feather de
// l'alpha pour adoucir les bords anti-aliasés.
//
// Usage : node scripts/make-wordmark-transparent.mjs
import sharp from 'sharp'

const SRC = 'public/images/survain-wordmark-noir.png'
const OUT = 'public/images/survain-wordmark-transparent.png'

// Seuil de « noir » : un pixel est considéré comme fond si son canal le plus
// clair est <= THRESHOLD. Élevé sans risque car le flood-fill ne supprime que
// la zone noire connectée aux bords (l'intérieur des lettres est isolé).
const THRESHOLD = 30

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info // channels = 4 (RGBA)

const isBg = (idx) => {
  const r = data[idx]
  const g = data[idx + 1]
  const b = data[idx + 2]
  return Math.max(r, g, b) <= THRESHOLD
}

// Masque alpha : 255 par défaut (opaque), 0 pour le fond flood-fillé.
const alpha = new Uint8Array(width * height).fill(255)
const visited = new Uint8Array(width * height)
const stack = []

// Amorce : tous les pixels de bordure qui sont « noirs ».
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

// BFS/DFS itératif sur les 4-voisins.
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

// Feather de l'alpha (flou 0.8px) pour adoucir les bords, puis recomposition
// avec les canaux RGB d'origine. NB : sharp renvoie le flou d'un buffer 1 canal
// en niveaux de gris 3 canaux — on lit donc le canal réel (faChannels).
const { data: featheredAlpha, info: faInfo } = await sharp(Buffer.from(alpha), {
  raw: { width, height, channels: 1 },
})
  .blur(0.8)
  .raw()
  .toBuffer({ resolveWithObject: true })
const faChannels = faInfo.channels

const out = Buffer.alloc(width * height * 4)
for (let p = 0; p < width * height; p++) {
  out[p * 4] = data[p * channels]
  out[p * 4 + 1] = data[p * channels + 1]
  out[p * 4 + 2] = data[p * channels + 2]
  out[p * 4 + 3] = featheredAlpha[p * faChannels]
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(OUT)

console.log(`Écrit : ${OUT}`)
