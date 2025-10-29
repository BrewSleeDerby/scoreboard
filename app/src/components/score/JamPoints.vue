<script setup lang="ts">
  const props = defineProps<{
    points: number
  }>();
</script>

<template>
    <div>
        <span class="text">{{ props.points }}</span>
    </div>
</template>

<style scoped>
    div {
        border-radius: 1vh;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 12vh;
        height: 12vh;
    }

    .text {
        align-self: center;
        color: black;
        font-size: 8vh;
        font-weight: bold;
        line-height: 6vh;
        height: 7vh;
    }
</style>