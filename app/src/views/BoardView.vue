<script setup lang="ts">
  import { onMounted, onUnmounted, Ref, ref } from 'vue'; 
  import { Game } from '../types/game';
  import { Position, Skater } from '../types/skater';

  let channel: BroadcastChannel;
  let seconds: Ref<number> = ref(0);
  const game: Ref<Game | null> = ref(null);

  function getSkaters(skaters: Skater[]): Skater[] {
    return sortSkaters(getSkatersByPosition(skaters, Position.Jammer)).concat(getSkatersByPosition(skaters, Position.Blocker));
  }

  function getSkatersByPosition(skaters: Skater[], position: Position): Skater[] {
    return skaters.filter((skater) => skater.Position === position);
  }

  function sortSkaters(skaters: Skater[]): Skater[] {
    return skaters.sort((a, b) => parseInt(a.Number) - parseInt(b.Number));
  }
  
  onMounted(() => {
    channel = new BroadcastChannel('game');
    channel.onmessage = (e) => {
      game.value = e.data;
    };
  });
  
  onUnmounted(() => {
    channel.close();
  });
</script>

<template>
  <div>
    <h1>Board</h1>
    <p v-if="game">
      Status: {{ game.Status }}
    </p>
    <p v-if="game">
      Away Jammer:
      <select name="awayjammer" id="awayjammer">
        <option v-for="skater in getSkaters(game.AwaySkaters)" :key="skater.Number">{{ skater.Number }} | {{ skater.Name }}</option>
      </select>
    </p>
  </div>
</template>

<style>
</style>
