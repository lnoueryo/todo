import TaskRepository from '~/repositories/task.repository'
import AuthRepository from '~/repositories/auth.repository'

export default defineNuxtPlugin((nuxtApp) => {
  const { $api, $auth } = useNuxtApp()
  const taskRepository = new TaskRepository($api)
  const authRepository = new AuthRepository($api, $auth)
  nuxtApp.provide('taskRepository', taskRepository)
  nuxtApp.provide('authRepository', authRepository)
})
