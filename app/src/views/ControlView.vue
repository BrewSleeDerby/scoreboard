<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  
  let worker = null;
  let channel = null;
  const seconds = ref(0);

  function openBoard() {
    window.open('/board', '_blank');
  }

  onMounted(() => {
    channel = new BroadcastChannel('game');

    if (window.Worker) {
      worker = new Worker(new URL('../scripts/game.js', import.meta.url));
      worker.onmessage = (e) => {
        seconds.value = e.data;
        channel.postMessage(seconds.value);
      };
    }
  });

  onUnmounted(() => {
    worker.terminate();
    channel.close();
  });
</script>

<template>
 <div>
    <h1>Control</h1>
    <button @click="openBoard">Open Board</button>
    <button @click="worker.postMessage('start')">Start</button>
    <button @click="worker.postMessage('stop')">Stop</button>
  </div>
</template>
