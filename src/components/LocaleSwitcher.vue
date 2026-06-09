<template>
  <div class="locale-switcher" role="group" aria-label="Language selector">
    <button
      v-for="code in SUPPORTED_LOCALES"
      :key="code"
      type="button"
      class="locale-switcher__btn"
      :class="{ 'locale-switcher__btn--active': locale === code }"
      :aria-pressed="locale === code"
      @click="setLocale(code)"
    >
      {{ t(`lang.${code}`) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/i18n'

const { t, locale } = useI18n()

function setLocale(value: SupportedLocale): void {
  // La persistance (localStorage + attribut lang) est gérée par le watcher
  // installé dans restoreLocale() ; ici on se contente de changer la locale.
  locale.value = value
}
</script>

<style scoped>
.locale-switcher {
  display: flex;
  gap: 0.4rem;
}

.locale-switcher__btn {
  font-family: var(--font-body);
  background: transparent;
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  border-radius: 2px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.locale-switcher__btn--active,
.locale-switcher__btn:hover {
  background-color: var(--color-gold);
  color: var(--color-black);
}
</style>
