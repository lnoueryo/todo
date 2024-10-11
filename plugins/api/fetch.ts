import type { ApiClient } from './api-client'

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
        console.log('Unauthorized, redirecting to login...')
        const router = useRouter()
        return await router.push('/login')
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
