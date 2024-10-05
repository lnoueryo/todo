import { ref } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const visible = ref(false)
  const text = ref('')
  const color = ref('primary')
  const success = (message: string) => {
    visible.value = true
    text.value = message
    color.value = 'primary'
  }

  const error = (message: string) => {
    visible.value = true
    text.value = message
    color.value = 'error'
  }

  nuxtApp.provide('toast', {
    success,
    error,
    visible,
    text,
    color,
  })
})