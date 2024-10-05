import Fetch from './fetch'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.apiOrigin as string
  const api = new Fetch(baseURL)
  return {
    provide: {
      api,
    },
  }
})