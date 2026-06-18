<template>
  <section class="hero">
    <div class="hero__bg" />
    <div class="hero__scrim" />
    <div class="hero__campfire" />
    <div ref="embersRef" class="hero__embers" aria-hidden="true" />

    <div class="hero__inner">
      <div class="hero__content">
        <img class="wordmark" src="/images/survain-wordmark.png" :alt="t('site.title')" />
        <p class="hero__tagline">
          {{ t('hero.tagline_pre') }}
          <span class="hl">{{ t('hero.tagline_hl') }}</span>
        </p>
        <p class="hero__lede">{{ t('hero.lede') }}</p>
        <div class="hero__ctas">
          <Btn variant="primary">{{ t('hero.cta_primary') }}</Btn>
          <Btn variant="ghost">{{ t('hero.cta_ghost') }}</Btn>
        </div>
      </div>
    </div>

    <a class="hero__scroll" href="#univers" :aria-label="t('hero.scroll')">
      <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.4">
        <circle cx="13" cy="13" r="11" opacity=".5" />
        <path d="M9 11 L13 15 L17 11" />
      </svg>
    </a>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Btn from '@/components/ui/Btn.vue'
import { useEmbers } from '@/composables/useEmbers'

const { t } = useI18n()
const embersRef = ref<HTMLElement | null>(null)
useEmbers(embersRef)
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -3;
  background-image: url('/images/hero-bg.png');
  background-size: cover;
  background-position: right center;
  transform: scale(1.02);
  animation: bg-drift 28s ease-in-out infinite alternate;
}
@keyframes bg-drift {
  to {
    transform: scale(1.04) translateX(-0.8%);
  }
}

.hero__scrim {
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background:
    linear-gradient(
      90deg,
      rgba(5, 6, 8, 0.94) 0%,
      rgba(5, 6, 8, 0.72) 32%,
      rgba(5, 6, 8, 0.18) 56%,
      rgba(5, 6, 8, 0) 72%
    ),
    linear-gradient(
      180deg,
      rgba(5, 6, 8, 0.55) 0%,
      transparent 16%,
      transparent 52%,
      rgba(5, 6, 8, 0.92) 100%
    );
}

.hero__campfire {
  position: absolute;
  right: 11%;
  bottom: 9%;
  width: 300px;
  height: 300px;
  z-index: -1;
  transform: translate(50%, 50%);
  pointer-events: none;
  background: radial-gradient(
    circle,
    rgba(255, 150, 40, 0.3),
    rgba(217, 101, 30, 0.12) 38%,
    transparent 66%
  );
  mix-blend-mode: screen;
  animation: fire-flicker 2.6s ease-in-out infinite;
}
@keyframes fire-flicker {
  0%,
  100% {
    opacity: 0.85;
    transform: translate(50%, 50%) scale(1);
  }
  35% {
    opacity: 1;
    transform: translate(50%, 50%) scale(1.08);
  }
  60% {
    opacity: 0.7;
    transform: translate(50%, 50%) scale(0.96);
  }
  80% {
    opacity: 0.95;
    transform: translate(50%, 50%) scale(1.04);
  }
}
@media (max-width: 1024px) {
  .hero__campfire {
    display: none;
  }
}

.hero__embers {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.hero__inner {
  position: relative;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.hero__content {
  max-width: 640px;
  opacity: 0;
  animation: rise 1.1s var(--ease-theatrical) 0.3s forwards;
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.wordmark {
  display: block;
  width: clamp(300px, 46vw, 620px);
  height: auto;
  filter: drop-shadow(0 6px 26px rgba(0, 0, 0, 0.85));
}

.hero__tagline {
  margin-top: 1.5rem;
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: clamp(0.8rem, 1.7vw, 1.05rem);
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--color-gold);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
}
.hero__tagline .hl {
  color: var(--color-gold-light);
}

.hero__lede {
  margin-top: 1.6rem;
  max-width: 38rem;
  font-size: 1.04rem;
  line-height: 1.75;
  color: var(--parchment);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.85);
}

.hero__ctas {
  margin-top: 2.3rem;
  display: flex;
  gap: 1.1rem;
  flex-wrap: wrap;
}

.hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 1.1rem;
  transform: translateX(-50%);
  z-index: 2;
  color: var(--color-gold);
  opacity: 0.7;
  animation: bob 2.6s ease-in-out infinite;
}
.hero__scroll svg {
  width: 26px;
  height: 26px;
}
@keyframes bob {
  50% {
    transform: translateX(-50%) translateY(5px);
    opacity: 1;
  }
}
@media (max-width: 1024px) {
  .hero__scroll {
    display: none;
  }
}
</style>

<style>
/* Non-scoped car le composable injecte les .ember dans le DOM */
.ember {
  position: absolute;
  bottom: -10px;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #f0a64a;
  box-shadow: 0 0 6px 1px rgba(240, 166, 74, 0.6);
  opacity: 0;
  animation: ember-rise var(--d, 11s) linear var(--delay, 0s) infinite;
}
@keyframes ember-rise {
  0% {
    opacity: 0;
    transform: translateY(0) translateX(0);
  }
  12% {
    opacity: 0.85;
  }
  85% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translateY(var(--rise, -70vh)) translateX(var(--dx, 30px));
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
