import { TaskRepository } from '~/server/repositories/task/task.repository'
import { TaskData } from '~/server/types/task'

export class GetTaskUseCase {
  constructor(private taskRepo: TaskRepository) {}
  public async do(): Promise<TaskData[]> {
    const tasks = await this.taskRepo.getTasks()
    return tasks
  }
}