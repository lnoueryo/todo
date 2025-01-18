import { Task } from '~/server/domain/entities/task'
import { User } from '~/server/domain/entities/user'
import { UsecaseResult } from '../../shared/usecase-result'
import { ITaskRepository } from '~/server/domain/repositories/task.repository'

export class UpdateTaskUsecase {
  constructor(private taskRepo: ITaskRepository) {}
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
      'validation' | 'forbidden' | 'internal'
    >
  > {
    try {
      const taskIds = params.map((task) => task.id);
      const targetTasks = await this.taskRepo.getByIds(taskIds);
      if (targetTasks.length !== params.length) {
        console.error(`user: ${user}\nrequest: ${params}`)
        return {
          error: {
            type: 'validation',
            message: 'Some tasks not found',
          }
        }
      }

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

      const taskMap = new Map(targetTasks.map((task) => [task.id, task]))
      const updateTasks = params.map((update) => {
        const targetTask = taskMap.get(update.id)
        if (!targetTask) {
          throw new Error('update task can not be found')
        }
        const updateTask = targetTask.update(update)
        return this.taskRepo.updateTask(update.id, updateTask)
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
