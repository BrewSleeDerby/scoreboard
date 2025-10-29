<script setup lang="ts">
  import { onMounted, onUnmounted, Ref, ref } from 'vue'; 
  import { Game } from '../types/game';
  import { Team } from '../types/team';
  import { Position, Skater } from '../types/skater';
  import { GameStatus, JamClock, JamPoints, PeriodClock, TeamInfo, TeamOfficialReviews, TeamPoints, TeamTimemouts } from '../components/score';

  let channel: BroadcastChannel;
  let seconds: Ref<number> = ref(0);
  const game: Ref<Game | null> = ref(null);
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
    <TeamInfo :team="teamA" />
    <TeamInfo :team="teamB" />
  </div>
  <div>
    <TeamPoints :team="teamA" :score=333 />
    <JamPoints :points=11 />
    <JamPoints :points=22 />
    <TeamPoints :team="teamB" :score="555" />
  </div>
  <div>
    <TeamTimemouts />
    <TeamOfficialReviews />
    <TeamOfficialReviews />
    <TeamTimemouts />
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
