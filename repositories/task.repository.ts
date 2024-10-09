import type { ApiClient } from '~/plugins/api/api-client'

export type Task = {
  id: number
  content: string
  active: boolean
  order: number
}

export default class TaskRepository {
  constructor(private api: ApiClient) {}
  async getTasks(): Promise<{ tasks: Task[] }> {
    return await this.api.get('/api/tasks')
  }
}