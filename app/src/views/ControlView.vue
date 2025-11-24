<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';
  import { useGameStore } from '@/stores/game';
  
  const gameStore = useGameStore();
  let channel: BroadcastChannel;

  function openBoard(): void {
    window.open('/board', '_blank');
  }

  onMounted(() => {
    // Initialize broadcast channel to send updates to other windows
    channel = new BroadcastChannel('game');
  });

  onUnmounted(() => {
    channel.close();
  });
</script>

<template>
 <div>
    <h1>Control</h1>
    <button @click="openBoard">Open Board</button>
    <button @click="gameStore.resetScores()">Reset score</button>
    <button @click="gameStore.incrementAwayScore(1)">Increment Away Score</button>
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