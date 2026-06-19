<template>
  <AppNav />
  <router-view />
  <AppFooter />
</template>

<script setup lang="ts">
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>
