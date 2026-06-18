<template>
  <div ref="rootEl" class="lang">
    <button class="lang__toggle" :aria-expanded="open" aria-haspopup="listbox" @click="toggle">
      {{ localeLabels[locale] ?? locale }}
      <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M1 1.5 L6 6.5 L11 1.5" />
      </svg>
    </button>
    <ul v-if="open" class="lang__menu" role="listbox">
      <li
        v-for="code in availableLocales"
        :key="code"
        role="option"
        :aria-selected="code === locale"
      >
        <button class="lang__item" @click="pick(code)">
          {{ localeLabels[code] ?? code }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n()
const open = ref(false)
const rootEl = ref<HTMLElement | null>(null)

const localeLabels: Record<string, string> = {
  fr: 'FR',
  en: 'EN',
}

function toggle() {
  open.value = !open.value
}
function pick(code: string) {
  locale.value = code
  open.value = false
}
function onClickOutside(e: MouseEvent) {
  if (rootEl.value && !rootEl.value.contains(e.target as Node)) {
    open.value = false
  }
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.lang {
  position: relative;
}
.lang__toggle {
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: var(--parchment);
  background: none;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.2rem;
  transition: color 0.3s;
}
.lang__toggle:hover,
.lang__toggle[aria-expanded='true'] {
  color: var(--color-gold-light);
}
.lang__toggle svg {
  width: 9px;
  height: 9px;
}

.lang__menu {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  min-width: 64px;
  background: rgba(7, 8, 10, 0.96);
  border: 1px solid rgba(202, 164, 90, 0.25);
  backdrop-filter: blur(8px);
  list-style: none;
  padding: 0.3rem 0;
  margin: 0;
}
.lang__item {
  width: 100%;
  background: none;
  border: 0;
  color: var(--parchment);
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-align: left;
  transition:
    background 0.2s,
    color 0.2s;
}
.lang__item:hover {
  background: rgba(202, 164, 90, 0.12);
  color: var(--color-gold-light);
}
</style>
