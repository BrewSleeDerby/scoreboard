<script setup lang="ts">
  import { onMounted, onUnmounted, type Ref, ref } from 'vue'; 
  import { useGameStore } from '@/stores/game';
  import type { Team } from '@/types/team';
  import { Position, type Skater } from '@/types/skater';
  import { GameStatus, JamClock, JamPoints, PeriodClock, TeamInfo, TeamOfficialReviews, TeamPoints, TeamTimeouts } from '@/components/score';

  const gameStore = useGameStore();
  let channel: BroadcastChannel;
  
  let seconds: Ref<number> = ref(0);
  const teamA: Ref<Team> = ref({
    Name: 'Team A',
    Color: 'purple',
    Logo: 'team-a.png'
  });
  const teamB: Ref<Team> = ref({
    Name: 'Team B',
    Color: 'green',
    Logo: null
  });

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
    // Listen for game state updates from the control panel
    channel = new BroadcastChannel('game');
    channel.onmessage = (e) => {
      gameStore.syncState(e.data);
    };
  });
  
  onUnmounted(() => {
    channel.close();
  });
</script>

<template>
  <div>
    <TeamInfo :team="teamA" />
    <TeamInfo :team="teamB" />
  </div>
  <div>
    <TeamPoints :team="teamA" :score="gameStore.AwayScore" />
    <JamPoints :points="11" />
    <JamPoints :points="22" />
    <TeamPoints :team="teamB" :score="gameStore.HomeScore" />
  </div>
  <div>
    <TeamTimeouts />
    <TeamOfficialReviews />
    <TeamOfficialReviews />
    <TeamTimeouts />
  </div>
  <div>
    <PeriodClock />
    <GameStatus />
    <JamClock />
  </div>
</template>

<style scoped>
  div {
    display: flex;
    place-items: center;
    justify-content: space-around;
  }
</style>
