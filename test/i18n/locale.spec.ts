import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { LOCALE_STORAGE_KEY, isSupportedLocale, persistLocale, readStoredLocale } from '@/i18n/locale'

describe('isSupportedLocale', () => {
  it('accepte les locales supportées', () => {
    expect(isSupportedLocale('fr')).toBe(true)
    expect(isSupportedLocale('en')).toBe(true)
  })

  it('rejette les valeurs non supportées ou invalides', () => {
    expect(isSupportedLocale('de')).toBe(false)
    expect(isSupportedLocale(null)).toBe(false)
    expect(isSupportedLocale(42)).toBe(false)
  })
})

describe('readStoredLocale', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renvoie null en l’absence de valeur stockée', () => {
    expect(readStoredLocale()).toBeNull()
  })

  it('renvoie la locale stockée si valide', () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    expect(readStoredLocale()).toBe('en')
  })

  it('renvoie null si la valeur stockée est invalide', () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'xx')
    expect(readStoredLocale()).toBeNull()
  })
})

describe('persistLocale', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('écrit la locale et synchronise l’attribut lang du document', () => {
    persistLocale('en')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })
})
