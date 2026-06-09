<template>
  <section class="home">
    <p class="home__intro">{{ t('home.intro') }}</p>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.home {
  text-align: center;
}

.home__intro {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: var(--color-gold-light);
  line-height: 1.5;
}
</style>
