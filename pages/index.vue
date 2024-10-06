<template>
  <div class="pa-4">
    <Tasks :tasks="tasks" @change:tasks="tasks = $event" />
  </div>
</template>

<script setup lang="ts">
import Tasks from '~/components/organisms/Tasks.vue'
const { $taskRepository, $loading, $toast } = useNuxtApp()
const tasks = ref([])
try {
  $loading.show()
  const response = await $taskRepository.getTasks()
  tasks.value = response.tasks
} catch (error) {
  $toast.error('タスクの取得に失敗しました')
} finally {
  $loading.hide()
}
</script>

<style scoped>

</style>