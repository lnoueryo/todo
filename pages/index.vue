<template>
  <div class="pa-4">
    <Tasks :tasks="tasks" @change:tasks="tasks = $event" />
  </div>
</template>

<script setup lang="ts">
import Tasks from '~/components/organisms/Tasks.vue'
const tasks = ref([
  { id: 1, content: 'hello', active: true, order: 1 },
  { id: 2, content: 'world', active: true, order: 2 },
  { id: 3, content: 'done', active: false, order: 3 },
])
</script>

<style scoped>

</style>