<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

function openBoard() {
  window.open('/about', '_blank');
}
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
