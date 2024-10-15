import type { ApiClient } from './api-client'
import type { User } from 'firebase/auth'

export default class Fetch implements ApiClient {
  private client: typeof $fetch
  constructor(baseURL: string) {
    this.client = $fetch.create({ baseURL })
  }
  async request(url: string, config?: Record<string, any>) {
    try {
      return await this.client(url, config)
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        const { $auth, $authRepository } = useNuxtApp()
        const user = await new Promise<User | null>(async (resolve, reject) => {
          await $auth.onAuthStateChanged(async (user) => resolve(user))
        })
        if (!user) {
          return navigateTo('/login')
        }
        try {
          const idToken = await user.getIdToken(true)
          await $authRepository.setCookie({ idToken })
          return await this.client(url, config)
        } catch (error) {
          return navigateTo('/login')
        }
      }
      throw error
    }
  }
  get(url: string, config?: Record<string, any>) {
    return this.request(url, { method: 'GET', ...config })
  }
  post(url: string, data: any, config?: Record<string, any>) {
    return this.request(url, { method: 'POST', body: data, ...config })
  }
  patch(url: string, data: any, config?: Record<string, any>) {
    return this.request(url, { method: 'PATCH', body: data, ...config })
  }
  delete(url: string, data: any, config?: Record<string, any>) {
    return this.request(url, { method: 'DELETE', body: data, ...config })
  }
}
