import type { ApiClient } from '~/plugins/api/api-client'
export default class TaskRepository {
  constructor(private api: ApiClient) {}
  async getTasks() {
    return await this.api.get('/api/tasks')
  }
}