<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import gameScript from '../scripts/game-engine.ts';
  
  let worker: Worker;
  let channel: BroadcastChannel;

  function openBoard(): void {
    window.open('/board', '_blank');
  }

  onMounted(() => {
    channel = new BroadcastChannel('game');

    if (window.Worker) {
      worker = new Worker(gameScript);
      worker.onmessage = (e) => {
        channel.postMessage(e.data);
      };

      worker.postMessage('get_game')
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
