<script setup lang="ts">
import type { Team } from '@/types/team';

  const props = defineProps<{
    team: Team
  }>();
</script>

<template>
    <div>{{ props.team.Name }}</div>
    <div v-if="!!!props.team.Logo">No Logo</div>
</template>

<style scoped>

</style>