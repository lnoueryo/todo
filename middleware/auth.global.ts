import type { User } from 'firebase/auth'
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    return
  }
  const { $auth, $authRepository } = useNuxtApp()
  const user = await new Promise<User | null>(async (resolve, reject) => {
    await $auth.onAuthStateChanged(async (user) => resolve(user))
  })
  if (to.path === '/login' && !user) {
    return
  }
  if (!user) {
    return navigateTo('/login')
  }

  try {
    const idTokenResult = await user.getIdTokenResult()
    const expirationTime = idTokenResult.expirationTime
    const now = new Date().getTime()
    const expirationTimeInMillis = new Date(expirationTime).getTime()
    if (expirationTimeInMillis > now && to.path !== '/login') {
      return
    }
    const idToken = await user.getIdToken(true)
    await $authRepository.setCookie({ idToken })
    if (to.path === '/login') {
      return location.href = '/'
    }
  } catch (error) {
    return navigateTo('/login')
  }
})