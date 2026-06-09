<template>
  <section class="page">
    <h1 class="page__title">{{ t('pages.tools.title') }}</h1>
    <p class="page__wip">{{ t('pages.tools.wip') }}</p>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.page__title {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gold);
}

.page__wip {
  font-family: var(--font-body);
  color: var(--color-gold-light);
  opacity: 0.85;
}
</style>
