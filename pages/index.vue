<template>
  <div class="pa-4">
    <Col class="d-flex justify-space-between">
      <h2 class="mb-4">ToDo</h2>
      <Button @click="onClickAddTask">Add</Button>
    </Col>
    <Tasks
      ref="tasksRef"
      :tasks="tasks"
      @change:tasks="tasks = $event"
      @blur:task="onBlurTask"
      @click:delete="onClickDeleteTask"
    />
  </div>
</template>

<script setup lang="ts">
import Col from '~/components/atoms/Col.vue'
import Button from '~/components/atoms/Button.vue'
import Tasks from '~/components/organisms/Tasks.vue'
import type { Task } from '~/repositories/task.repository'
const { $taskRepository, $loading, $toast, $auth } = useNuxtApp()
const router = useRouter()
const tasks = ref<Task[]>([])
try {
  $loading.show()
  const response = await $taskRepository.getTasks()
  tasks.value = response.tasks
} catch (error) {
  $toast.error('タスクの取得に失敗しました')
} finally {
  $loading.hide()
}
const tasksRef = ref<typeof Tasks | null>(null)
const isCreatingMode = ref(false)
const onClickAddTask = async () => {
  if (!$auth.currentUser?.uid) {
    return await router.push('/login')
  }
  isCreatingMode.value = true
  const newTask = {
    id: '',
    content: '',
    active: true,
    order: tasks.value.length + 1
  }
  await tasks.value.push(newTask)
  if (tasksRef.value) {
    tasksRef.value.focusTask()
  }
}
const onBlurTask = async (newTask: Task) => {
  try {
    if (isCreatingMode.value && newTask.content) {
      return await createTask(newTask)
    }
    if (isCreatingMode.value && !newTask.content) {
      return tasks.value = tasks.value.filter((task) => {
        return task.id !== newTask.id
      })
    }
    if (!isCreatingMode.value) {
      return await updateTasks(newTask)
    }
  } catch (error) {
    $toast.error('保存に失敗しました')
  } finally {
    isCreatingMode.value = false
  }

}
const createTask = async (newTask: Task) => {
  const res = await $taskRepository.createTask(newTask)
  tasks.value = res.tasks
}

const updateTasks = async (task: Task) => {
  const res = await $taskRepository.updateTasks([task])
  tasks.value = res.tasks
}

const deleteTask = async (task: Task) => {
  const res = await $taskRepository.deleteTask(task)
  tasks.value = res.tasks
}

const onClickDeleteTask = async (task: Task) => {
  await deleteTask(task)
}
</script>

<style scoped>

</style>