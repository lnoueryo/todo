import { Task } from '~/server/domain/entities/task'
import type { User } from '~/server/domain/entities/user'
import { UsecaseResult } from '../../shared/usecase-result'
import { ITransactionManager } from '~/server/domain/repositories/transaction-manager.repository'

export class DeleteTaskUsecase {
  constructor(private transactionManager: ITransactionManager) {}
  public async execute(params: string[], user: User): Promise<
    UsecaseResult<
      {
        tasks: Task[]
      },
      'forbidden' | 'internal'
    >
  > {
    try {
      return await this.transactionManager.execute(async(repositories) => {
        const { taskRepository } = repositories
        const targetTasks = await taskRepository.getByIds(params)
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
          return taskRepository.deleteTask(id)
        })
        await Promise.all(deleteTasks)
        const tasks = await taskRepository.getByUserId(user.id)
        return {
          success: {
            tasks
          }
        }
      })
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
