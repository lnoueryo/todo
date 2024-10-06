<template>
  <form @submit.prevent="">
    <h2 class="mb-4">ToDo</h2>
    <div class="d-flex align-center" v-for="task in todoTasks" :key="task.id">
      <Task
        v-bind="task"
        @change:task="onChangeTask"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import Task from '~/components/molecules/Task.vue'
type Task = {
  id: number
  content: string
  active: boolean
  order: number
}
const props = defineProps({
  tasks: {
    type: Array as () => Task[],
    default: []
  }
})
const emits = defineEmits(['change:tasks'])
const todoTasks = computed(() => props.tasks.filter(task => task.active))
const doneTasks = computed(() => props.tasks.filter(task => task.active))
const onChangeTask = (newTask: Task) => {
  const tasks = props.tasks.map(task => {
    if (task.id === newTask.id) return newTask
    return task
  })
  emits('change:tasks', tasks)
}
</script>

<style scoped>

</style>