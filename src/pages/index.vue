<template>
  <section class="home">
    <h1 class="home__title">{{ t('home.presentation.title') }}</h1>

    <div class="home__lore">
      <p v-for="(paragraph, index) in paragraphs" :key="index" class="home__paragraph">
        {{ paragraph }}
      </p>
    </div>

    <div class="home__cta">
      <a class="home__btn" :href="EXTERNAL_LINKS.trailer" target="_blank" rel="noopener">
        {{ t('home.cta.trailer') }}
      </a>
      <a class="home__btn" :href="EXTERNAL_LINKS.discord" target="_blank" rel="noopener">
        {{ t('home.cta.discord') }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { EXTERNAL_LINKS } from '@/config/links'

const { t, tm, rt } = useI18n()

// `tm` renvoie le tableau de messages brut ; `rt` le rend en chaîne.
const paragraphs = computed(() =>
  (tm('home.presentation.paragraphs') as unknown[]).map((p) => rt(p as string)),
)
</script>

<style scoped>
.home {
  max-width: 820px;
  margin: 0 auto;
}

.home__title {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gold);
  text-align: center;
}

.home__lore {
  margin-top: 1.5rem;
}

.home__paragraph {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.6;
  color: var(--color-gold-light);
  margin: 0 0 1.25rem;
}

.home__cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.home__btn {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  padding: 0.6rem 1.4rem;
  border-radius: 2px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.home__btn:hover {
  background-color: var(--color-gold);
  color: var(--color-black);
}
</style>
