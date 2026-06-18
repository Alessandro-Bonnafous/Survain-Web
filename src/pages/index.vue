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
  <main>
    <HeroSection />
    <UniversSection />
    <CommunauteSection />
  </main>
</template>

<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import UniversSection from '@/components/home/UniversSection.vue'
import CommunauteSection from '@/components/home/CommunauteSection.vue'
</script>
