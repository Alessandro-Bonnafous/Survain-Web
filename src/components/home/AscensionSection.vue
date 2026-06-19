<template>
  <section id="ascension" class="asc" aria-labelledby="asc-label">
    <div class="asc__inner">
      <p id="asc-label" class="asc__eyebrow">
        <span class="asc__rule" aria-hidden="true" />
        {{ t('home.ascension.eyebrow') }}
        <span class="asc__rule" aria-hidden="true" />
      </p>

      <h2 class="asc__title">{{ t('home.ascension.title') }}</h2>
      <p class="asc__lead">{{ t('home.ascension.lead') }}</p>

      <ol class="asc__steps">
        <li
          v-for="step in steps"
          :key="step.key"
          :class="['asc__step', step.war && 'asc__step--war']"
        >
          <span class="asc__rune" aria-hidden="true">{{ step.rune }}</span>
          <h3 class="asc__step-name">{{ t(`home.ascension.steps.${step.key}.name`) }}</h3>
          <span class="asc__step-tag">{{ t(`home.ascension.steps.${step.key}.tag`) }}</span>
          <p class="asc__step-text">{{ t(`home.ascension.steps.${step.key}.text`) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Quatre paliers de progression ; rune décorative et marqueur de guerre (PvP)
// rattachés à la clé i18n.
const steps = [
  { key: 'land', rune: 'ᚲ' },
  { key: 'province', rune: 'ᛒ' },
  { key: 'region', rune: 'ᛋ' },
  { key: 'kingdom', rune: 'ᛏ', war: true },
] as const
</script>

<style scoped>
.asc {
  position: relative;
  background: var(--color-black);
  padding: clamp(5rem, 12vh, 9rem) 0;
  scroll-margin-top: 84px;
  border-top: 1px solid rgba(202, 164, 90, 0.1);
  border-bottom: 1px solid rgba(202, 164, 90, 0.1);
}

.asc__inner {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.asc__eyebrow {
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
.asc__rule {
  height: 1px;
  width: clamp(1.5rem, 9vw, 5rem);
  background: linear-gradient(90deg, transparent, rgba(202, 164, 90, 0.6));
}
.asc__eyebrow .asc__rule:last-child {
  background: linear-gradient(90deg, rgba(202, 164, 90, 0.6), transparent);
}

.asc__title {
  margin: 0 auto 1.3rem;
  text-align: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.4rem);
  line-height: 1.1;
  color: var(--color-gold-light);
}
.asc__lead {
  max-width: 60ch;
  margin: 0 auto;
  text-align: center;
  font-family: var(--font-body);
  font-size: 1.08rem;
  line-height: 1.8;
  color: var(--parchment);
}

.asc__steps {
  margin: 4.5rem 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  position: relative;
}
/* Frise dorée reliant les paliers. */
.asc__steps::before {
  content: '';
  position: absolute;
  top: 27px;
  left: 12.5%;
  right: 12.5%;
  height: 1px;
  background: linear-gradient(
    90deg,
    var(--color-gold-dark),
    var(--color-gold),
    var(--color-gold-dark)
  );
  opacity: 0.6;
}

.asc__step {
  text-align: center;
  padding: 0 1.2rem;
  position: relative;
}
.asc__rune {
  width: 56px;
  height: 56px;
  margin: 0 auto 1.4rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--color-black);
  border: 1px solid var(--color-gold);
  color: var(--color-gold-light);
  font-family: var(--font-display);
  font-size: 1.25rem;
  box-shadow:
    0 0 0 6px var(--color-black),
    0 0 22px rgba(202, 164, 90, 0.18);
}
.asc__step-name {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 2.1rem;
  line-height: 1.1;
  color: var(--color-gold-light);
  margin: 0 0 0.4rem;
}
.asc__step-tag {
  display: block;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.62rem;
  color: var(--ash);
  margin-bottom: 0.8rem;
}
.asc__step-text {
  margin: 0;
  font-family: var(--font-body);
  font-size: 0.94rem;
  line-height: 1.7;
  color: var(--parchment);
  opacity: 0.85;
}

.asc__step--war .asc__rune {
  border-color: var(--color-red);
  color: #e0a0a0;
  box-shadow:
    0 0 0 6px var(--color-black),
    0 0 22px rgba(192, 24, 24, 0.25);
}

@media (max-width: 880px) {
  .asc__steps {
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
  }
  /* Frise verticale à gauche en pile. */
  .asc__steps::before {
    top: 27px;
    bottom: 27px;
    left: 27px;
    right: auto;
    width: 1px;
    height: auto;
    background: linear-gradient(
      180deg,
      var(--color-gold-dark),
      var(--color-gold),
      var(--color-gold-dark)
    );
  }
  .asc__step {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 0.4rem 1.2rem;
    text-align: left;
    align-items: center;
  }
  .asc__rune {
    margin: 0;
    grid-row: 1 / span 3;
  }
}
</style>
