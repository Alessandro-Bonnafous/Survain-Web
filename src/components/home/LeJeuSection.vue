<template>
  <section id="jeu" class="jeu" aria-labelledby="jeu-label">
    <div class="jeu__inner">
      <p id="jeu-label" class="jeu__eyebrow">
        <span class="jeu__rule" aria-hidden="true" />
        {{ t('home.game.eyebrow') }}
        <span class="jeu__rule" aria-hidden="true" />
      </p>

      <h2 class="jeu__title">{{ t('home.game.title') }}</h2>
      <p class="jeu__lead">{{ t('home.game.lead') }}</p>

      <div class="jeu__pillars">
        <article v-for="pillar in pillars" :key="pillar.key" class="jeu__pillar">
          <div class="jeu__medal" aria-hidden="true">
            <svg class="jeu__icon" viewBox="0 0 58 58" fill="none">
              <template v-if="pillar.key === 'survival'">
                <path d="M16 46 L36 22" />
                <path
                  class="is-filled"
                  d="M30 14 C38 8 48 10 50 12 C50 20 46 28 38 30 C34 30 31 27 30 24 C29 20 28 17 30 14 Z"
                />
              </template>
              <template v-else-if="pillar.key === 'politics'">
                <path class="is-filled" d="M10 40 L10 22 L20 32 L29 16 L38 32 L48 22 L48 40 Z" />
                <path d="M10 44 L48 44" />
              </template>
              <template v-else>
                <path d="M29 50 L29 26" />
                <path
                  class="is-filled"
                  d="M29 26 C20 26 12 18 12 8 C20 8 26 12 29 18 C32 12 38 8 46 8 C46 18 38 26 29 26 Z"
                />
                <path d="M21 50 L37 50" />
              </template>
            </svg>
          </div>
          <h3 class="jeu__pillar-title">{{ t(`home.game.pillars.${pillar.key}.title`) }}</h3>
          <p class="jeu__pillar-text">{{ t(`home.game.pillars.${pillar.key}.text`) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Trois piliers du jeu ; le médaillon SVG est décoratif et lié à la clé.
const pillars = [{ key: 'survival' }, { key: 'politics' }, { key: 'gods' }] as const
</script>

<style scoped>
.jeu {
  position: relative;
  background: var(--ink);
  padding: clamp(5rem, 12vh, 9rem) 0;
  scroll-margin-top: 84px;
}
.jeu::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(202, 164, 90, 0.35) 50%, transparent);
}

.jeu__inner {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.jeu__eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  margin: 0 0 1.4rem;
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: var(--tracking-caps);
  color: var(--color-gold);
}
.jeu__rule {
  height: 1px;
  width: clamp(1.5rem, 9vw, 5rem);
  background: linear-gradient(90deg, transparent, rgba(202, 164, 90, 0.6));
}
.jeu__eyebrow .jeu__rule:last-child {
  background: linear-gradient(90deg, rgba(202, 164, 90, 0.6), transparent);
}

.jeu__title {
  margin: 0 auto 1.3rem;
  max-width: 18ch;
  text-align: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.15;
  color: var(--color-gold-light);
}
.jeu__lead {
  max-width: 60ch;
  margin: 0 auto;
  text-align: center;
  font-family: var(--font-body);
  font-size: 1.08rem;
  line-height: 1.8;
  color: var(--parchment);
}

.jeu__pillars {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem 2.5rem;
}

.jeu__pillar {
  text-align: center;
}
.jeu__medal {
  width: 124px;
  height: 124px;
  margin: 0 auto 1.6rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 35% 30%, #1c1409, var(--ink) 70%);
  border: 2px solid var(--color-gold);
  box-shadow:
    inset 0 0 0 5px var(--color-black),
    inset 0 0 0 6px rgba(202, 164, 90, 0.55),
    0 10px 34px rgba(0, 0, 0, 0.7);
  transition:
    transform 0.5s var(--ease-theatrical),
    box-shadow 0.5s;
}
.jeu__pillar:hover .jeu__medal {
  transform: translateY(-6px);
  box-shadow:
    inset 0 0 0 5px var(--color-black),
    inset 0 0 0 6px rgba(242, 213, 142, 0.8),
    0 16px 44px rgba(202, 164, 90, 0.18);
}
.jeu__icon {
  width: 54px;
  height: 54px;
  stroke: var(--color-gold);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.jeu__icon .is-filled {
  fill: var(--color-gold-dark);
}

.jeu__pillar-title {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-gold-light);
  margin: 0 0 0.8rem;
}
.jeu__pillar-text {
  max-width: 34ch;
  margin: 0 auto;
  font-family: var(--font-body);
  font-size: 0.98rem;
  line-height: 1.7;
  color: var(--ash);
}

@media (max-width: 880px) {
  .jeu__pillars {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
