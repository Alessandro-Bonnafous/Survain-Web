<script setup lang="ts"></script>

<template>
  <div class="layout-default">
    <router-view />
  </div>
</template>

<style scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
