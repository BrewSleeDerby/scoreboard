<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import gameScript from '../scripts/game-engine.ts';
  
  let worker: Worker;
  let channel: BroadcastChannel;

  const para = ref('parallelogram');
  const flash = ref('flash');

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
    <!--<button @click="worker.postMessage('start')">Start</button>
    <button @click="worker.postMessage('stop')">Stop</button>-->
  </div>

    <!--<div :class="para"></div>
    <div :class="[para, flash]"></div>-->
</template>

<style>

.parallelogram {
      width: 50px;
      height: 10px;
      transform: skew(-20deg);
      background: red;
      display: inline-block;
      border: 1px white solid;
    }

    .flash {
      animation: flash 2s infinite linear;
    }
    @keyframes flash {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      
    }
  
</style>