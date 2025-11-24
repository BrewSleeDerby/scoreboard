<script setup lang="ts">
  import type { Team } from '../../types/team';

  const props = defineProps<{
    score: number,
    team: Team
  }>();
</script>

<template>
    <div v-if="props.team.Color != 'white'" class="white-container">
        <div class="color">
            <div class="background">
                <span class="text">{{ props.score }}</span>
            </div>
        </div>
    </div>

    <div v-if="props.team.Color == 'white'" class="white">
            <div class="background">
                <span class="text">{{ props.score }}</span>
            </div>
        </div>
</template>

<style scoped>
    div.white-container {
        border-radius: 2vh;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35vw;
        height: 40vh;
        padding: 5px 5px 5px 5px;
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
    div.white {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2vh;
        background-color: v-bind('props.team.Color');
        border: 2px solid black;
        width: 35vw;
        height: 40vh;
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