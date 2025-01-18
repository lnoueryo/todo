import { Task } from '~/server/domain/entities/task'
import { User } from '~/server/domain/entities/user'
import { UsecaseResult } from '../../shared/usecase-result'
import { ITaskRepository } from '~/server/domain/repositories/task.repository'

export class CreateTaskUsecase {
  constructor(private taskRepo: ITaskRepository) {}
  public async execute(
    params: {
      userId: string
      content: string
      active: boolean
      order: number
    },
    user: User
  ): Promise<
    UsecaseResult<
      {
        tasks: Task[]
      },
      'internal'
    >
  > {
    try {
      const task = new Task(params)
      task.userId = user.id
      task.createdAt = new Date()
      task.updatedAt = new Date()
      await this.taskRepo.save(task)
      const tasks = await this.taskRepo.getByUserId(user.id)
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
          message: 'Internal Server Error'
        }
      }
    }
  }
}
