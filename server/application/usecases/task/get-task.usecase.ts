import { TaskService } from '~/server/domain/services/task.service'
import { Task } from '~/server/domain/entities/task'
import { UsecaseResult } from '../../shared/usecase-result'

export class GetTaskUsecase {
  constructor(private TaskService: TaskService) {}
  public async execute(params: {
    id: string,
    email: string
  }): Promise<
    UsecaseResult<
      {
        tasks: Task[]
      },
      'internal'
    >
  > {
    try {
      const tasks = await this.TaskService.getTasksByUserId(params.id)
      return {
        success: {
          tasks,
        }
      }
    } catch (error) {
      console.error(error)
      return {
        error: {
          type: 'internal',
          message: 'Internal Server error',
        }
      }
    }
  }
}
