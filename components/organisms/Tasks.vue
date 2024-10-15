<template>
  <VueDraggable
    v-model="internalTasks"
    :delay="80"
    ref="el"
  >
    <Col class="d-flex align-center" v-for="(task, i) in internalTasks" :key="i">
      <Task
        ref="taskRef"
        v-bind="task"
        :items="todoTasksMenu"
        :check="props.check"
        :readonly="props.readonly"
        @change:task="onChangeTask"
        @blur:task="emits('blur:task', $event)"
        @click:delete="emits('click:delete', [task])"
      />
    </Col>
  </VueDraggable>
</template>

<script setup lang="ts">
import Task from '~/components/molecules/Task.vue'
import Col from '~/components/atoms/Col.vue'
import type { Task as TaskType } from '~/repositories/task.repository'
import { VueDraggable } from 'vue-draggable-plus'
const props = defineProps({
  tasks: {
    type: Array as () => TaskType[],
    default: []
  },
  check: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  draggable: {
    type: String,
    default: ''
  },
  items: {
    type: Array as () => { title: string, handler: (task: TaskType) => void}[] || undefined,
    default: undefined
  }
})
const emits = defineEmits([
  'change:tasks',
  'blur:task',
  'click:delete',
  'drag:task',
])

const internalTasks = computed({
  get() {
    return props.tasks
  },
  set(v) {
    emits('drag:task', v)
  }
})

const onChangeTask = (newTask: TaskType) => {
  const newTasks = props.tasks.map(task => {
    if (task.id === newTask.id) return newTask
    return task
  })
  emits('change:tasks', newTasks)
}
const deleteTask = (task: TaskType) => {
  emits('click:delete', [task])
}
const todoTasksMenu = computed(() => {
  if (props.items) {
    return props.items
  }
  return [
    { title: 'Delete', handler: deleteTask }
  ]
})
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