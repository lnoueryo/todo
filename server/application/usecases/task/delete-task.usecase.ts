import { ITaskRepository } from './../../../domain/repositories/task.repository';
import { Task } from '~/server/domain/entities/task'
import type { User } from '~/server/domain/entities/user'
import { UsecaseResult } from '../../shared/usecase-result'

export class DeleteTaskUsecase {
  constructor(private taskRepo: ITaskRepository) {}
  public async execute(params: string[], user: User): Promise<
    UsecaseResult<
      {
        tasks: Task[]
      },
      'forbidden'
    >
  > {
    const targetTasks = await this.taskRepo.getByIds(params)
    for (const task of targetTasks) {
      if (!task.isTaskOwnedByUser(user)) {
        console.error(`user: ${user}\nrequest: ${params}`)
        return {
          error: {
            type: 'forbidden',
            message: `Tasks are not current user's`
          }
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
