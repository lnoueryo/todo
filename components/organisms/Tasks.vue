<template>
  <TransitionGroup name="list" tag="div">
    <div class="d-flex align-center" v-for="(task, i) in todoTasks" :key="i">
      <Task
        ref="taskRef"
        v-bind="task"
        @change:task="onChangeTask"
        @blur:task="emits('blur:task', task)"
        @click:delete="emits('click:delete', task)"
      />
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import Task from '~/components/molecules/Task.vue'
import type { Task as TaskType } from '~/repositories/task.repository'
const props = defineProps({
  tasks: {
    type: Array as () => TaskType[],
    default: []
  }
})
const emits = defineEmits([
  'change:tasks',
  'blur:task',
  'click:delete',
])
const todoTasks = computed(() => props.tasks.filter(task => task.active))
const doneTasks = computed(() => props.tasks.filter(task => task.active))
const onChangeTask = (newTask: TaskType) => {
  const tasks = props.tasks.map(task => {
    if (task.id === newTask.id) return newTask
    return task
  })
  emits('change:tasks', tasks)
}
const taskRef = ref<typeof Task[] | null>([])
const focusTask = () => {
  if (!taskRef.value) {
    return
  }
  const lastTextField = taskRef.value[taskRef.value.length - 1]
  if (lastTextField) {
    lastTextField.focusTextField()
  }
}
defineExpose({
  focusTask
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>