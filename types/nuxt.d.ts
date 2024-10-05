// types/nuxt.d.ts
import { ApiClient } from '~/plugins/api/api-client'

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
  }
}