import { describe, expect, it } from 'vitest'
import { gameplayStructure } from '@/content/gameplay/structure'
import { gameplayImages } from '@/content/gameplay/images'
import frGameplay from '@/i18n/locales/fr/gameplay.json'
import enGameplay from '@/i18n/locales/en/gameplay.json'
import type { Block } from '@/content/gameplay/types'

/** Toutes les clés i18n référencées par un bloc (récursif pour les sélecteurs). */
function blockKeys(block: Block): string[] {
  switch (block.kind) {
    case 'paragraph':
      return [block.textKey]
    case 'list':
      return block.items.flatMap((i) => (i.strongKey ? [i.strongKey, i.textKey] : [i.textKey]))
    case 'table':
      return [
        ...block.headerKeys,
        ...block.rows.flatMap((row) =>
          row.flatMap((cell) => (typeof cell === 'string' ? [] : [cell.key])),
        ),
      ]
    case 'image':
      return [block.altKey]
    case 'selector':
      return [
        block.labelKey,
        ...block.options.flatMap((o) => [o.labelKey, ...o.blocks.flatMap(blockKeys)]),
      ]
  }
}

function allKeys(): string[] {
  return gameplayStructure.flatMap((cat) => [
    cat.titleKey,
    ...cat.chapters.flatMap((ch) => [ch.titleKey, ch.summaryKey, ...ch.blocks.flatMap(blockKeys)]),
  ])
}

/** Résout une clé `gameplay.a.b.c` dans un arbre de messages (namespace gameplay). */
function resolve(messages: Record<string, unknown>, key: string): unknown {
  return key
    .replace(/^gameplay\./, '')
    .split('.')
    .reduce<unknown>(
      (node, part) => (node as Record<string, unknown> | undefined)?.[part],
      messages,
    )
}

const fr = frGameplay as Record<string, unknown>
const en = enGameplay as Record<string, unknown>

describe('contenu Gameplay', () => {
  it('compte 4 catégories et au moins 15 chapitres', () => {
    expect(gameplayStructure).toHaveLength(4)
    expect(gameplayStructure.flatMap((c) => c.chapters).length).toBeGreaterThanOrEqual(15)
  })

  it('chaque clé référencée existe en FR et EN', () => {
    const missing: string[] = []
    for (const key of allKeys()) {
      if (typeof resolve(fr, key) !== 'string') missing.push(`fr:${key}`)
      if (typeof resolve(en, key) !== 'string') missing.push(`en:${key}`)
    }
    expect(missing).toEqual([])
  })

  it('toutes les images référencées existent dans le mapping d’assets', () => {
    const walk = (blocks: Block[]): string[] =>
      blocks.flatMap((b) =>
        b.kind === 'image'
          ? [b.imageId]
          : b.kind === 'selector'
            ? b.options.flatMap((o) => walk(o.blocks))
            : [],
      )
    const ids = gameplayStructure.flatMap((c) => c.chapters.flatMap((ch) => walk(ch.blocks)))
    for (const id of ids) expect(gameplayImages).toHaveProperty(id)
  })
})
