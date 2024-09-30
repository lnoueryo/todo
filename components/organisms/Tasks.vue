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
import TextField from '~/components/atoms/TextField.vue'
import Col from '~/components/atoms/Col.vue'
import Checkbox from '~/components/atoms/Checkbox.vue'
import Task from '~/components/molecules/Task.vue'
const props = defineProps({
  tasks: {
    type: Array,
    default: []
  }
})
const emits = defineEmits(['change:tasks'])
const todoTasks = computed(() => props.tasks.filter(task => task.active))
const doneTasks = computed(() => props.tasks.filter(task => task.active))
const onChangeTask = (newTask) => {
  const tasks = props.tasks.map(task => {
    if (task.id === newTask.id) return newTask
    return task
  })
  emits('change:tasks', tasks)
}
</script>

<style scoped>

</style>