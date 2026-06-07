<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/i18n'

const { t, locale } = useI18n()

function setLocale(value: SupportedLocale): void {
  locale.value = value
}
</script>

<template>
  <main class="home">
    <h1 class="home__title">{{ t('site.title') }}</h1>
    <p class="home__tagline">{{ t('site.tagline') }}</p>
    <p class="home__coming-soon">{{ t('coming_soon') }}</p>

    <nav class="home__lang" aria-label="Language selector">
      <button
        v-for="code in SUPPORTED_LOCALES"
        :key="code"
        type="button"
        class="home__lang-btn"
        :class="{ 'home__lang-btn--active': locale === code }"
        :aria-pressed="locale === code"
        @click="setLocale(code)"
      >
        {{ t(`lang.${code}`) }}
      </button>
    </nav>
  </main>
</template>

<style scoped>
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  background-color: var(--color-black);
  color: var(--color-gold);
}

.home__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 12vw, 7rem);
  color: var(--color-gold);
  letter-spacing: 0.08em;
  margin: 0;
}

.home__tagline {
  font-family: var(--font-body);
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: var(--color-gold-light);
  margin: 0;
}

.home__coming-soon {
  font-family: var(--font-body);
  font-style: italic;
  opacity: 0.8;
  margin: 0;
}

.home__lang {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.home__lang-btn {
  font-family: var(--font-body);
  background: transparent;
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  padding: 0.4rem 0.9rem;
  cursor: pointer;
  border-radius: 2px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.home__lang-btn--active,
.home__lang-btn:hover {
  background-color: var(--color-gold);
  color: var(--color-black);
}
</style>
