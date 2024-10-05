import { ref } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const visible = ref(false)
  const show = () => {
    visible.value = true
  }

  const hide = () => {
    visible.value = false
  }

  nuxtApp.provide('loading', {
    show,
    hide,
    visible
  })
})