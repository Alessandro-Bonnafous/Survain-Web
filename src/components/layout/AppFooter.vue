<template>
  <footer class="foot">
    <div class="foot__inner">
      <RouterLink to="/" class="foot__brand" :aria-label="t('site.title')">
        <img
          class="foot__logo"
          src="/images/survain-wordmark-transparent.png"
          :alt="t('site.title')"
        />
      </RouterLink>

      <nav class="foot__nav" :aria-label="t('nav.communaute')">
        <ul class="foot__links">
          <li>
            <RouterLink to="/#univers">{{ t('nav.univers') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/#jeu">{{ t('nav.jeu') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/#ascension">{{ t('nav.ascension') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/gameplay">{{ t('nav.gameplay') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/#communaute">{{ t('nav.communaute') }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="foot__social">
        <a :href="EXTERNAL_LINKS.discord" target="_blank" rel="noopener" aria-label="Discord">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05 0 .07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"
            />
          </svg>
        </a>
      </div>
    </div>

    <p class="foot__rights">{{ t('footer.rights') }}</p>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { EXTERNAL_LINKS } from '@/config/links'

const { t } = useI18n()
</script>

<style scoped>
.foot {
  position: relative;
  background: var(--color-black);
  padding: clamp(3rem, 7vh, 4.5rem) 0 2.2rem;
}
.foot::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(202, 164, 90, 0.35) 50%, transparent);
}

.foot__inner {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.foot__brand {
  display: flex;
  flex: none;
}
.foot__logo {
  height: 30px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
  display: block;
  opacity: 0.9;
}

.foot__links {
  display: flex;
  gap: 1.9rem;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  justify-content: center;
}
.foot__links a {
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: var(--parchment);
  text-decoration: none;
  transition: color 0.3s;
}
.foot__links a:hover {
  color: var(--color-gold-light);
}

.foot__social a {
  color: var(--parchment);
  opacity: 0.85;
  transition:
    color 0.3s,
    opacity 0.3s;
  display: grid;
  place-items: center;
}
.foot__social a:hover {
  color: var(--color-gold-light);
  opacity: 1;
}
.foot__social svg {
  width: 18px;
  height: 18px;
}

.foot__rights {
  margin: clamp(2rem, 5vh, 3rem) 0 0;
  text-align: center;
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 0.64rem;
  letter-spacing: var(--tracking-caps);
  color: var(--ash);
}

@media (max-width: 680px) {
  .foot__inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
