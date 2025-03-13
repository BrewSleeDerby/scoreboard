<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

function openBoard() {
  window.open('/about', '_blank');
}
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
