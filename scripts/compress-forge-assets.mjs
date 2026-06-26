// Compresse les images du simulateur de forge : conversion WebP + redimensionnement.
// Les rendus d'origine font ~1400 px de large (~2 Mo pièce) alors qu'ils sont
// affichés à ≤ 620 px. On plafonne le grand côté à 1100 px (≈ 2× retina), qualité
// 80, en préservant la transparence. Les originaux (png/jpg) sont remplacés par
// leur équivalent .webp (les chemins sont centralisés dans src/config/forge.ts).
//
// Idempotent : ne traite que les png/jpg encore présents. Relançable après ajout
// d'un nouvel asset de forge.
//
// Usage : node scripts/compress-forge-assets.mjs
import sharp from 'sharp'
import { readdirSync, statSync, unlinkSync } from 'node:fs'
import { join, extname } from 'node:path'

const DIR = 'public/images/forge'
const MAX = 1100
const QUALITY = 80

let before = 0
let after = 0
const files = readdirSync(DIR).filter((f) => /\.(png|jpe?g)$/i.test(f))

for (const f of files) {
  const src = join(DIR, f)
  const base = f.slice(0, -extname(f).length)
  const dst = join(DIR, `${base}.webp`)
  const sizeBefore = statSync(src).size
  before += sizeBefore

  await sharp(src)
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY, alphaQuality: 90, effort: 5 })
    .toFile(dst)

  const sizeAfter = statSync(dst).size
  after += sizeAfter
  try {
    unlinkSync(src)
  } catch {
    // Verrou fichier ponctuel (Windows/antivirus) : l'original sera nettoyé après.
  }
  console.log(
    `${base}`.padEnd(24),
    `${(sizeBefore / 1024) | 0}KB → ${(sizeAfter / 1024) | 0}KB`,
    `(-${(100 - (sizeAfter / sizeBefore) * 100) | 0}%)`,
  )
}

console.log(
  `\nTOTAL  ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(2)}MB ` +
    `(-${(100 - (after / before) * 100) | 0}%)`,
)
