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
        check
        @change:task="onChangeTask"
        @blur:task="onBlurTask"
      />
    </Col>
  </VueDraggable>
</template>

<script setup lang="ts">
import Task from '~/components/molecules/Task.vue'
import Col from '~/components/atoms/Col.vue'
import type { Task as TaskType } from '~/repositories/task.repository'
import { VueDraggable } from 'vue-draggable-plus'
import { useTaskStore } from '~/store/task'

const { $toast } = useNuxtApp()
const taskStore = useTaskStore()
const internalTasks = computed({
  get() {
    return taskStore.todoTasks
  },
  set(v) {
    onDragTask(v)
  }
})

const onDragTask = async (todoTasks: TaskType[]) => {
  const newTodoTasks = todoTasks.map((task, i) => {
    task.order = i + 1
    return task
  })
  const tasksCache = reactive([ ...taskStore.tasks ])
  try {
    taskStore.tasks = [ ...newTodoTasks, ...taskStore.doneTasks ]
    await taskStore.updateTasks(newTodoTasks)
  } catch (error) {
    $toast.error('failed to update task')
    taskStore.tasks = tasksCache
  }
}
const onBlurTask = async (newTask: TaskType) => {
  try {
    // 作成
    if (taskStore.isCreatingMode && newTask.content) {
      return await taskStore.createTask(newTask)
    }
    // 空の場合新規タスクを削除
    if (taskStore.isCreatingMode && !newTask.content) {
      return taskStore.tasks = taskStore.tasks.filter((task) => {
        return task.id !== newTask.id
      })
    }
    // 更新
    if (!taskStore.isCreatingMode) {
      taskStore.tasks = taskStore.tasks.map((task) => {
        if (task.id === newTask.id) {
          return newTask
        }
        return task
      })
      return await taskStore.updateTasks([newTask])
    }
  } catch (error) {
    $toast.error('failed to update task')
  } finally {
    taskStore.isCreatingMode = false
  }
}
const onChangeTask = (newTask: TaskType) => {
  const newTasks = taskStore.tasks.map(task => {
    if (task.id === newTask.id) return newTask
    return task
  })
  taskStore.tasks = newTasks
}
const openDeleteTaskDialog = (task: TaskType) => {
  taskStore.openDeleteTaskDialog([task])
}
const todoTasksMenu = computed(() => {
  return [
    { title: 'Delete', handler: openDeleteTaskDialog }
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