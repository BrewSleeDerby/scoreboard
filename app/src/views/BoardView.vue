<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'; 

  let channel = null;
  let seconds = ref(0);
  
  onMounted(() => {
    channel = new BroadcastChannel('game');
    channel.onmessage = (e) => {
      seconds.value = e.data;
    };
  });
  
  onUnmounted(() => {
    channel.close();
  });
</script>

<template>
  <div>
    <h1>Board</h1>
    <h2>{{ seconds }}</h2>
  </div>
</template>

<style>
</style>
