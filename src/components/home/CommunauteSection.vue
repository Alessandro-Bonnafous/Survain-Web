<template>
  <section id="communaute" class="comm" aria-labelledby="comm-label">
    <div class="comm__inner">
      <p id="comm-label" class="comm__eyebrow">
        <span class="comm__rule" aria-hidden="true" />
        {{ t('nav.communaute') }}
        <span class="comm__rule" aria-hidden="true" />
      </p>

      <div class="comm__grid">
        <!-- Discord -->
        <div class="comm__card comm__card--discord">
          <h3 class="comm__heading">{{ t('pages.community.discord.title') }}</h3>
          <a class="comm__discord" :href="EXTERNAL_LINKS.discord" target="_blank" rel="noopener">
            <img :src="discordLogo" alt="Discord" class="comm__discord-logo" width="160" />
            <span class="comm__discord-cta">{{ t('pages.community.discord.cta') }}</span>
          </a>
          <a
            class="comm__youtube"
            :href="EXTERNAL_LINKS.trailer"
            target="_blank"
            rel="noopener"
            aria-label="YouTube"
          >
            <svg
              class="comm__youtube-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.27 3.6L9.6 15.6z"
              />
            </svg>
            <span>{{ t('home.cta.trailer') }}</span>
          </a>
        </div>

        <!-- Musiques -->
        <div class="comm__card">
          <h3 class="comm__heading">{{ t('pages.community.music.title') }}</h3>
          <MusicPlayer :tracks="MUSIC_TRACKS" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { EXTERNAL_LINKS } from '@/config/links'
import { MUSIC_TRACKS } from '@/config/music'
import MusicPlayer from '@/components/community/MusicPlayer.vue'
import discordLogo from '@/assets/images/discord-logo-transparent.png'

const { t } = useI18n()
</script>

<style scoped>
.comm {
  position: relative;
  background: var(--ink);
  padding: clamp(5rem, 12vh, 9rem) 0;
  scroll-margin-top: 84px;
}
.comm::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(202, 164, 90, 0.35) 50%, transparent);
}

.comm__inner {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.comm__eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  margin: 0 0 3rem;
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: var(--tracking-caps);
  color: var(--color-gold);
}
.comm__rule {
  height: 1px;
  width: clamp(1.5rem, 9vw, 5rem);
  background: linear-gradient(90deg, transparent, rgba(202, 164, 90, 0.6));
}
.comm__eyebrow .comm__rule:last-child {
  background: linear-gradient(90deg, rgba(202, 164, 90, 0.6), transparent);
}

.comm__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: stretch;
}
.comm__card {
  border: 1px solid rgba(202, 164, 90, 0.2);
  background: rgba(202, 164, 90, 0.03);
  padding: 1.8rem;
}
.comm__card--discord {
  display: flex;
  flex-direction: column;
}

.comm__heading {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-gold);
  margin: 0 0 1.4rem;
}

.comm__discord {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  text-decoration: none;
  color: var(--parchment);
}
.comm__discord-logo {
  max-width: 160px;
  height: auto;
  filter: drop-shadow(0 4px 18px rgba(0, 0, 0, 0.5));
  transition: transform 0.3s var(--ease-theatrical);
}
.comm__discord:hover .comm__discord-logo {
  transform: translateY(-3px);
}
.comm__discord-cta {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-gold-light);
  border: 1px solid rgba(202, 164, 90, 0.5);
  padding: 0.7rem 1.5rem;
  clip-path: polygon(9px 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%, 0 9px);
  transition:
    background 0.3s,
    color 0.3s;
}
.comm__discord:hover .comm__discord-cta {
  background: rgba(202, 164, 90, 0.16);
  color: var(--color-gold-light);
}

.comm__youtube {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.4rem;
  align-self: center;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--parchment);
  text-decoration: none;
  opacity: 0.85;
  transition:
    color 0.3s,
    opacity 0.3s;
}
.comm__youtube:hover {
  color: var(--color-gold-light);
  opacity: 1;
}
.comm__youtube-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 760px) {
  .comm__grid {
    grid-template-columns: 1fr;
  }
}
</style>
