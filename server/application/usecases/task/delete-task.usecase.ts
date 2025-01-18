import { Task } from '~/server/domain/entities/task'
import type { User } from '~/server/domain/entities/user'
import { TaskService } from '~/server/domain/services/task.service'
import { DeleteTaskRequest } from '~/server/interfaces/dto/task/request/delete-task-request'
import { UsecaseResult } from '../../shared/usecase-result'

export class DeleteTaskUsecase {
  constructor(private taskService: TaskService) {}
  public async execute(deleteTaskRequest: DeleteTaskRequest, user: User): Promise<
    UsecaseResult<
      {
        tasks: Task[]
      },
      'forbidden'
    >
  > {
    const areTasksCurrentUsers = await this.taskService.areTasksCurrentUsers(deleteTaskRequest.ids, user)
    if (!areTasksCurrentUsers) {
      console.error(`user: ${user}`)
      return {
        error: {
          type: 'forbidden',
          message: `tasks are not current user's`
        }
      }
    }
    await this.taskService.deleteBatch(deleteTaskRequest.ids)
    const tasks = await this.taskService.getTasksByUserId(user.id)
    return {
      success: {
        tasks
      }
    }
  }
}
