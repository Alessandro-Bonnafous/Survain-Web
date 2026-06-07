<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <header class="app-header">
    <span class="app-header__brand">{{ t('site.title') }}</span>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
}

.app-header__brand {
  font-family: var(--font-display);
  font-size: 1.75rem;
  color: var(--color-gold);
  letter-spacing: 0.05em;
}
</style>
