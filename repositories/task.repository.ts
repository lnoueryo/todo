import type { ApiClient } from '~/plugins/api/api-client'

export type Task = {
  id: string
  content: string
  active: boolean
  order: number
}

export default class TaskRepository {
  constructor(private api: ApiClient) {}
  async getTasks(): Promise<{ tasks: Task[] }> {
    return await this.api.get('/api/tasks')
  }
  async createTask(body: {
    content: string
    active: boolean
    order: number
  }): Promise<{ tasks: Task[] }> {
    return await this.api.post('/api/tasks', body)
  }
  async updateTasks(body: {
    content: string
    active: boolean
    order: number
  }[]): Promise<{ tasks: Task[] }> {
    return await this.api.patch('/api/tasks', body)
  }
}
