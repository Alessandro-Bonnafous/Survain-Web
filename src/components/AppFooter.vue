<template>
  <footer class="app-footer">
    <p class="app-footer__rights">{{ t('footer.rights') }}</p>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.app-footer {
  margin-top: auto;
  padding: 1.5rem;
  text-align: center;
  background: var(--color-black);
  border-top: 1px solid var(--color-gold);
}

.app-footer__rights {
  margin: 0;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-gold);
  opacity: 0.8;
}
</style>
