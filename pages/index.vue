<template>
  <div class="pa-4 flex-container">
    <div>
      <Col class="d-flex justify-space-between fix-top">
        <h2 class="mb-4">Tasks</h2>
        <Button icon="mdi-plus" @click="onClickAddTask" />
      </Col>
      <Tasks
        ref="tasksRef"
        class="tasks"
        :tasks="todoTasks"
        @change:tasks="tasks = $event"
        @blur:task="onBlurTask"
        @click:delete="onClickOpenDeleteDialog"
        @drag:task="onDragTask"
      />
      <div class="button-container">
        <DoneTasks
          :tasks="tasks"
          @blur:task="onBlurTask"
          @click:delete="onClickOpenDeleteDialog"
        />
      </div>
    </div>
    <BasicDialog v-model="isOpen" persistent headerColor="error">
      <template #title>
        Delete Task
      </template>
      <template #text>
        Is it ok to delete task?
      </template>
      <template #actions>
        <Spacer />
        <Button
          elevation="0"
          color="gray"
          variant="flat"
          @click="onClickCancelDelete"
        >close</
          Button
        >
        <Button
          elevation="0"
          color="error"
          variant="flat"
          @click="onClickDeleteTask"
        >Yes</
          Button
        >
      </template>
    </BasicDialog>
  </div>
</template>

<script setup lang="ts">
import Spacer from '~/components/atoms/Spacer.vue'
import BasicDialog from '~/components/molecules/BasicDialog.vue'
import Col from '~/components/atoms/Col.vue'
import Button from '~/components/atoms/Button.vue'
import Tasks from '~/components/organisms/Tasks.vue'
import DoneTasks from '~/components/organisms/DoneTasks.vue'
import type { Task } from '~/repositories/task.repository'
const onDragTask = async (todoTasks: Task[]) => {
  const newTodoTasks = todoTasks.map((task, i) => {
    task.order = i + 1
    return task
  })
  const doneTasks = tasks.value.filter(task => !task.active)
  tasks.value = [ ...newTodoTasks, ...doneTasks ]
  await updateTasks(newTodoTasks)
}
const isOpen = ref(false)
const { $taskRepository, $loading, $toast, $auth } = useNuxtApp()
const router = useRouter()
const tasks = ref<Task[]>([])
try {
  $loading.show()
  const response = await $taskRepository.getTasks()
  tasks.value = response.tasks
} catch (error) {
  $toast.error('failed to fetch tasks')
} finally {
  $loading.hide()
}
const todoTasks = computed(() => tasks.value.filter(task => task.active))
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
    order: tasks.value[tasks.value.length - 1].order + 1
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
      tasks.value = tasks.value.map((task) => {
        if (task.id === newTask.id) {
          return newTask
        }
        return task
      })
      return await updateTasks([newTask])
    }
  } catch (error) {
    $toast.error('failed to update task')
  } finally {
    isCreatingMode.value = false
  }

}
const createTask = async (newTask: Task) => {
  const res = await $taskRepository.createTask(newTask)
  tasks.value = res.tasks
}

const updateTasks = async (updateTasks: Task[]) => {
  const res = await $taskRepository.updateTasks(updateTasks)
  tasks.value = res.tasks
}

const deleteTasksCache = ref<Task[]>([])

const onClickOpenDeleteDialog = (tasks: Task[]) => {
  isOpen.value = true
  deleteTasksCache.value = tasks
}

const onClickDeleteTask = async () => {
  const res = await $taskRepository.deleteTask(deleteTasksCache.value)
  tasks.value = res.tasks
  closeDeleteDialog()
}

const onClickCancelDelete = () => {
  closeDeleteDialog()
}

const closeDeleteDialog = () => {
  isOpen.value = false
  deleteTasksCache.value = []
}
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 144px);
}

.fix-top {
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid #ccc;
  z-index: 1;
}

.tasks {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 306px);
}

.button-container {
  padding-top: 16px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #ccc;
  position: sticky;
  bottom: 0;
  background-color: white;
}
</style>