import { TaskRepository } from '~/server/repositories/task/task.repository'
import { TaskData } from '~/server/types/task'

export class GetTaskUseCase {
  constructor(private taskRepo: TaskRepository) {}
  public async do(params: {
    id: string,
    email: string
  }): Promise<TaskData[]> {
    const tasks = await this.taskRepo.getTasksByUserId(params.id)
    return tasks
  }
}