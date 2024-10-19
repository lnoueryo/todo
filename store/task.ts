import { defineStore } from 'pinia'
import type { Task } from '~/repositories/task.repository'
export const useTaskStore = defineStore(
  'task',
  () => {
    const tasks = ref<Task[]>([])
    const isCreatingMode = ref(false)
    const isDeleteTaskDialogOpen = ref(false)
    const deleteTasksCache = ref<Task[]>([])
    const { $taskRepository } = useNuxtApp()
    const todoTasks = computed(() => tasks.value.filter(task => task.active))
    const doneTasks = computed(() =>tasks.value.filter(task => !task.active))
    const addTask = async () => {
      isCreatingMode.value = true
      const newTask = {
        id: '',
        content: '',
        active: true,
        order: tasks.value[tasks.value.length - 1].order + 1
      }
      await tasks.value.push(newTask)
    }
    const getTasks = async () => {
      const response = await $taskRepository.getTasks()
      tasks.value = response.tasks
    }
    const createTask = async (newTask: Task) => {
      const res = await $taskRepository.createTask(newTask)
      tasks.value = res.tasks
    }

    const updateTasks = async (updateTasks: Task[]) => {
      const res = await $taskRepository.updateTasks(updateTasks)
      tasks.value = res.tasks
    }

    const deleteTasks = async (deleteTasks: Task[]) => {
      const res = await $taskRepository.deleteTasks(deleteTasks)
      tasks.value = res.tasks
    }

    const openDeleteTaskDialog = (tasks: Task[]) => {
      isDeleteTaskDialogOpen.value = true
      deleteTasksCache.value = tasks
    }

    const closeDeleteTaskDialog = () => {
      isDeleteTaskDialogOpen.value = false
      deleteTasksCache.value = []
    }
    return {
      tasks,
      isDeleteTaskDialogOpen,
      deleteTasksCache,
      todoTasks,
      doneTasks,
      isCreatingMode,
      addTask,
      getTasks,
      createTask,
      updateTasks,
      deleteTasks,
      openDeleteTaskDialog,
      closeDeleteTaskDialog,
    }
  },
)