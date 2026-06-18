<!--
  La home porte le hero v7 plein écran avec sa propre nav fixe transparente.
  Elle sort donc du layout `default` (AppHeader/AppNav/AppFooter) via le layout
  `blank`. Les autres pages (community, gameplay, tools) restent sur `default`.
-->
<route>
{
  meta: {
    layout: 'blank'
  }
}
</route>

<template>
  <AppNav />
  <main>
    <HeroSection />
  </main>
</template>

<script setup lang="ts">
import AppNav from '@/components/layout/AppNav.vue'
import HeroSection from '@/components/home/HeroSection.vue'
</script>
