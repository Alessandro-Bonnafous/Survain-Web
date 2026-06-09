import { describe, expect, it } from 'vitest'
import { gameplayFr } from '@/content/gameplay/fr'
import { gameplayEn } from '@/content/gameplay/en'
import { gameplayImages } from '@/content/gameplay/images'
import { getGameplayContent } from '@/content/gameplay'
import type { Block, GameplayContent } from '@/content/gameplay/types'

/** Signature structurelle d'un bloc (indépendante du texte) pour la parité. */
function blockSignature(block: Block): string {
  switch (block.kind) {
    case 'paragraph':
      return 'paragraph'
    case 'list':
      return `list:${block.items.length}`
    case 'table':
      return `table:${block.headers.length}x${block.rows.length}`
    case 'image':
      return `image:${block.image.id}`
    case 'selector':
      return `selector:[${block.options.map((o) => o.blocks.map(blockSignature).join(',')).join('|')}]`
  }
}

function contentSignature(content: GameplayContent): string {
  return content
    .map(
      (cat) =>
        `${cat.id}{${cat.chapters
          .map((ch) => `${ch.id}(${ch.blocks.map(blockSignature).join(',')})`)
          .join(';')}}`,
    )
    .join('|')
}

function collectImageIds(content: GameplayContent): string[] {
  const ids: string[] = []
  const walk = (blocks: Block[]) => {
    for (const block of blocks) {
      if (block.kind === 'image') ids.push(block.image.id)
      if (block.kind === 'selector') block.options.forEach((o) => walk(o.blocks))
    }
  }
  content.forEach((cat) => cat.chapters.forEach((ch) => walk(ch.blocks)))
  return ids
}

describe('contenu Gameplay', () => {
  it('compte 4 catégories avec des chapitres', () => {
    expect(gameplayFr).toHaveLength(4)
    expect(gameplayFr.flatMap((c) => c.chapters).length).toBeGreaterThanOrEqual(15)
  })

  it('FR et EN sont structurellement identiques (parité)', () => {
    expect(contentSignature(gameplayEn)).toBe(contentSignature(gameplayFr))
  })

  it('toutes les images référencées existent dans le mapping d’assets', () => {
    for (const id of collectImageIds(gameplayFr)) {
      expect(gameplayImages).toHaveProperty(id)
    }
  })

  it('getGameplayContent renvoie la bonne locale et se replie sur le FR', () => {
    expect(getGameplayContent('en')).toBe(gameplayEn)
    expect(getGameplayContent('fr')).toBe(gameplayFr)
    expect(getGameplayContent('de')).toBe(gameplayFr)
  })
})
