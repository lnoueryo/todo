import { ApiClient } from '~/plugins/api/api-client'
import type { Auth } from 'firebase/auth'
import TaskRepository from '~/repositories/task.repository'

declare module '#app' {
  interface NuxtApp {
    $loading: {
      visible: boolean
      show: () => void
      hide: () => void
    }
    $toast: {
      visible: boolean
      text: string
      color: string
      success: (message: string) => void
      error: (message: string) => void
    }
    $api: ApiClient
    $auth: Auth
    $taskRepository: TaskRepository
    $authRepository: AuthRepository
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $loading: {
      visible: boolean
      show: () => void
      hide: () => void
    }
    $toast: {
      visible: boolean
      text: string
      color: string
      success: (message: string) => void
      error: (message: string) => void
    }
    $api: ApiClient
    $auth: Auth
    $taskRepository: TaskRepository
    $authRepository: AuthRepository
  }
}