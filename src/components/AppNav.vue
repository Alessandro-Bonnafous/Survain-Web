<template>
  <nav class="app-nav" aria-label="Menu principal">
    <ul class="app-nav__list">
      <li v-for="link in links" :key="link.to">
        <RouterLink class="app-nav__link" :to="link.to">{{ t(`nav.${link.key}`) }}</RouterLink>
      </li>
      <li>
        <a class="app-nav__link" :href="TRAILER_URL" target="_blank" rel="noopener">
          {{ t('nav.trailer') }}
        </a>
      </li>
    </ul>
    <LocaleSwitcher class="app-nav__locale" />
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LocaleSwitcher from './LocaleSwitcher.vue'

const { t } = useI18n()

/** Lien externe vers le trailer YouTube (repris du site legacy). */
const TRAILER_URL = 'https://www.youtube.com/watch?v=496Khyp_ExY'

const links = [
  { to: '/', key: 'home' },
  { to: '/gameplay', key: 'gameplay' },
  { to: '/community', key: 'community' },
  { to: '/tools', key: 'tools' },
] as const
</script>

<style scoped>
.app-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-black);
  border-bottom: 1px solid var(--color-gold);
}

.app-nav__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-nav__link {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-gold);
  text-decoration: none;
  padding: 0.25rem 0;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease;
}

.app-nav__link:hover {
  color: var(--color-gold-light);
}

/* `router-link-exact-active` (et non `-active`) : sinon le lien Accueil ("/")
   resterait surligné sur toutes les routes. */
.app-nav__link.router-link-exact-active {
  color: var(--color-gold-light);
  border-bottom-color: var(--color-gold);
}
</style>
