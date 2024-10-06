import TaskRepository from '~/repositories/task.repository'

export default defineNuxtPlugin((nuxtApp) => {
  const { $api } = useNuxtApp()
  const taskRepository = new TaskRepository($api)
  nuxtApp.provide('taskRepository', taskRepository)
})