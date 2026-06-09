<template>
  <section class="community">
    <h1 class="community__title">{{ t('pages.community.title') }}</h1>

    <section class="community__block">
      <h2 class="community__heading">{{ t('pages.community.discord.title') }}</h2>
      <a class="community__discord" :href="EXTERNAL_LINKS.discord" target="_blank" rel="noopener">
        <img :src="discordLogo" alt="Discord" class="community__discord-logo" width="180" />
        <span class="community__discord-cta">{{ t('pages.community.discord.cta') }}</span>
      </a>
    </section>

    <section class="community__block">
      <h2 class="community__heading">{{ t('pages.community.music.title') }}</h2>
      <MusicPlayer :tracks="MUSIC_TRACKS" />
    </section>

    <section class="community__block">
      <h2 class="community__heading">{{ t('pages.community.soon.title') }}</h2>
      <ul class="community__soon">
        <li v-for="key in soonKeys" :key="key" class="community__soon-item">
          {{ t(`pages.community.soon.${key}`) }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { EXTERNAL_LINKS } from '@/config/links'
import { MUSIC_TRACKS } from '@/config/music'
import MusicPlayer from '@/components/community/MusicPlayer.vue'
import discordLogo from '@/assets/images/discord-logo.png'

const { t } = useI18n()

// Sections futures (structure prête, contenu à venir — cf. #4).
const soonKeys = ['news', 'forums', 'events', 'hallOfFame', 'support', 'partners'] as const
</script>

<style scoped>
.community__title {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gold);
}

.community__block {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-gold-dark);
}

.community__heading {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-gold);
}

.community__discord {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-gold);
}

.community__discord-logo {
  max-width: 180px;
  height: auto;
}

.community__discord-cta {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid var(--color-gold);
  padding: 0.6rem 1.4rem;
  border-radius: 2px;
}

.community__discord:hover .community__discord-cta {
  background-color: var(--color-gold);
  color: var(--color-black);
}

.community__soon {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.community__soon-item {
  font-family: var(--font-body);
  color: var(--color-gold-light);
  opacity: 0.7;
  border: 1px dashed var(--color-gold-dark);
  padding: 0.5rem 0.9rem;
  border-radius: 2px;
}
</style>
