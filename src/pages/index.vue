<!--
  La home porte le hero v7 plein écran. Avec /gameplay, elle utilise le layout
  `blank` (AppNav fixe transparente + AppFooter), seul layout du site.
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
    <LeJeuSection />
    <AscensionSection />
    <CommunauteSection />
  </main>
</template>

<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import UniversSection from '@/components/home/UniversSection.vue'
import LeJeuSection from '@/components/home/LeJeuSection.vue'
import AscensionSection from '@/components/home/AscensionSection.vue'
import CommunauteSection from '@/components/home/CommunauteSection.vue'
</script>
