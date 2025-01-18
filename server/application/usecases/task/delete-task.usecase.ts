import { ITaskRepository } from './../../../domain/repositories/task.repository';
import { Task } from '~/server/domain/entities/task'
import type { User } from '~/server/domain/entities/user'
import { TaskOwnershipService } from '~/server/domain/services/task/task-ownership.service'
import { UsecaseResult } from '../../shared/usecase-result'

export class DeleteTaskUsecase {
  constructor(
    private taskOwnershipService: TaskOwnershipService,
    private taskRepo: ITaskRepository,
  ) {}
  public async execute(params: string[], user: User): Promise<
    UsecaseResult<
      {
        tasks: Task[]
      },
      'forbidden'
    >
  > {
    const areTasksCurrentUsers = await this.taskOwnershipService.areTasksOwnedByUser(params, user)
    if (!areTasksCurrentUsers) {
      console.error(`user: ${user}`)
      return {
        error: {
          type: 'forbidden',
          message: `tasks are not current user's`
        }
      }
    }
    const deleteTasks = params.map((id) => {
      return this.taskRepo.deleteTask(id)
    })
    await Promise.all(deleteTasks)
    const tasks = await this.taskRepo.getByUserId(user.id)
    return {
      success: {
        tasks
      }
    }
  }
}
