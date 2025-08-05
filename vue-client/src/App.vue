<template>
  <div id="app" class="bg-gray-900 text-white min-h-screen">
    <SiteNavigation />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import SiteNavigation from './components/SiteNavigation.vue'
</script>

<style>
#app {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>