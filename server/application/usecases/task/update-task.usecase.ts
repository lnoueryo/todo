import { Task } from '~/server/domain/entities/task'
import { UpdateTaskRequest } from '~/server/interfaces/dto/task/request/update-task-request.dto'
import { TaskService } from '~/server/domain/services/task.service'
import { User } from '~/server/domain/entities/user'
import { UsecaseResult } from '../../shared/usecase-result'

export class UpdateTaskUsecase {
  constructor(private taskService: TaskService) {}
  public async execute(updateTaskRequest: UpdateTaskRequest, user: User): Promise<
    UsecaseResult<Task[], 'forbidden' | 'internal'>
  > {
    try {
      const areTasksCurrentUsers = this.taskService.areTasksCurrentUsers(updateTaskRequest.getIds(), user)
      if (!areTasksCurrentUsers) {
        console.error(`user: ${user}\nrequest: ${updateTaskRequest.tasks}`)
        return {
          error: {
            type: 'forbidden',
            message: `Tasks are not current user's`
          }
        }
      }
      await this.taskService.updateBatch(updateTaskRequest.tasks)
      const tasks = await this.taskService.getTasksByUserId(user.id)
      return {
        success: tasks
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
