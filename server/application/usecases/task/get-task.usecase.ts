import { Task } from '~/server/domain/entities/task'
import { UsecaseResult } from '../../shared/usecase-result'
import { ITaskRepository } from '~/server/domain/repositories/task.repository'

export class GetTaskUsecase {
  constructor(private TaskRepo: ITaskRepository) {}
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
      const tasks = await this.TaskRepo.getByUserId(params.id)
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
