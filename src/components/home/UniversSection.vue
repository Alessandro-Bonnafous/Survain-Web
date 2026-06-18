<template>
  <section id="univers" class="univers" aria-labelledby="univers-label">
    <div class="univers__inner">
      <p id="univers-label" class="univers__eyebrow">
        <span class="univers__rule" aria-hidden="true" />
        {{ t('nav.univers') }}
        <span class="univers__rule" aria-hidden="true" />
      </p>

      <div class="univers__lore">
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="index"
          :class="['univers__p', index === 0 && 'univers__p--lead']"
        >
          {{ paragraph }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

// Le lore de présentation (retiré de la home au Sprint A) alimente la section
// Univers. `tm` renvoie le tableau brut, `rt` rend chaque entrée en chaîne.
const paragraphs = computed(() =>
  (tm('home.presentation.paragraphs') as unknown[]).map((p) => rt(p as string)),
)
</script>

<style scoped>
.univers {
  position: relative;
  background: var(--ink);
  padding: clamp(5rem, 12vh, 9rem) 0;
  scroll-margin-top: 84px; /* dégage la nav fixe quand on cible #univers */
}
/* Filet doré subtil séparant le hero de la section. */
.univers::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(202, 164, 90, 0.35) 50%, transparent);
}

.univers__inner {
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.univers__eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  margin: 0 0 2.8rem;
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: var(--tracking-caps);
  color: var(--color-gold);
}
.univers__rule {
  height: 1px;
  width: clamp(1.5rem, 9vw, 5rem);
  background: linear-gradient(90deg, transparent, rgba(202, 164, 90, 0.6));
}
.univers__eyebrow .univers__rule:last-child {
  background: linear-gradient(90deg, rgba(202, 164, 90, 0.6), transparent);
}

.univers__p {
  font-family: var(--font-body);
  font-size: 1.06rem;
  line-height: 1.85;
  color: var(--parchment);
  margin: 0 0 1.5rem;
  text-align: justify;
  hyphens: auto;
}
.univers__p:last-child {
  margin-bottom: 0;
}

/* Paragraphe d'accroche : plus clair, avec lettrine gravée. */
.univers__p--lead {
  font-size: 1.18rem;
  line-height: 1.8;
  color: var(--stone-light);
}
.univers__p--lead::first-letter {
  float: left;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 3.4em;
  line-height: 0.74;
  padding: 0.05em 0.14em 0 0;
  color: var(--color-gold);
}

@media (max-width: 680px) {
  .univers__p {
    text-align: left;
    hyphens: manual;
  }
}
</style>
