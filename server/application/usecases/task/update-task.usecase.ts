import { Task } from '~/server/domain/entities/task'
import { TaskOwnershipService } from '~/server/domain/services/task/task-ownership.service'
import { User } from '~/server/domain/entities/user'
import { UsecaseResult } from '../../shared/usecase-result'
import { ITaskRepository } from '~/server/domain/repositories/task.repository'

export class UpdateTaskUsecase {
  constructor(
    private taskOwnershipService: TaskOwnershipService,
    private taskRepo: ITaskRepository,
  ) {}
  public async execute(
    params: {
      id: string
      userId: string
      content: string
      active: boolean
      order: number
    }[],
    user: User
  ): Promise<
    UsecaseResult<
      {
        tasks: Task[],
      },
      'forbidden' | 'internal'
    >
  > {
    try {
      const areTasksCurrentUsers = this.taskOwnershipService.areTasksOwnedByUser(params.map(task => task.id), user)
      if (!areTasksCurrentUsers) {
        console.error(`user: ${user}\nrequest: ${params}`)
        return {
          error: {
            type: 'forbidden',
            message: `Tasks are not current user's`
          }
        }
      }
      const updateTasks = params.map((taskData) => {
        const task = new Task(taskData)
        task.updatedAt = new Date()
        return this.taskRepo.updateTask(taskData.id, task)
      })
      await Promise.all(updateTasks)
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
          message: 'An unexpected error occurred',
        }
      }
    }
  }
}
