import type { ApiClient } from './api-client'

export default class Fetch implements ApiClient {
  private client: typeof $fetch
  constructor(baseURL: string) {
    this.client = $fetch.create({ baseURL })
  }
  get(url: string, config?: Record<string, any>) {
    return this.client(url, { method: 'GET', ...config })
  }
  post(url: string, data: any, config?: Record<string, any>) {
    return this.client(url, { method: 'POST', body: data, ...config })
  }
  patch(url: string, data: any, config?: Record<string, any>) {
    return this.client(url, { method: 'PATCH', body: data, ...config })
  }
  delete(url: string, config?: Record<string, any>) {
    return this.client(url, { method: 'DELETE', ...config })
  }
}
