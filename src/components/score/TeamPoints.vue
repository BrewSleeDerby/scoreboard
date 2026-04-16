<script setup lang="ts">
  import { computed } from 'vue';
  import type { Team } from '../../types/team';

  const props = defineProps<{
    score: number,
    team: Team
  }>();

    const normalizedColor = computed(() => props.team.Color.trim().toLowerCase());
    const isWhiteTeam = computed(() => normalizedColor.value === 'white');
</script>

<template>
    <div class="score-shell" :class="{ 'white-container': !isWhiteTeam }">
        <div class="color">
            <div class="background">
                <span class="text">{{ props.score }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    div.score-shell {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2vh;
        width: 35vw;
        height: 40vh;
        padding: 5px 5px 5px 5px;
    }

    div.white-container {
        background-color: white;
    }

    div.color {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2vh;
        background-color: v-bind('props.team.Color');
        border: 2px solid black;
        width: 100%;
        height: 100%;
        padding: 10px 10px 10px 10px;
    }

    div.background {
        border: 2px solid black;
        border-radius: 2vh;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .text {
        align-self: center;
        color: black;
        font-size: 18vw;
        font-weight: bold;
        line-height: 13vh;
        height: 15vh;
    }
</style>