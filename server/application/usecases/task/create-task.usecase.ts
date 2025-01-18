import { Task } from '~/server/domain/entities/task'
import { CreateTaskRequest } from '~/server/interfaces/dto/task/request/create-task-request.dto'
import { TaskService } from '~/server/domain/services/task.service'
import { User } from '~/server/domain/entities/user'
import { UsecaseResult } from '../../shared/usecase-result'

export class CreateTaskUsecase {
  constructor(private taskService: TaskService) {}
  public async execute(createTaskInput: CreateTaskRequest, user: User): Promise<
    UsecaseResult<
      {
        tasks: Task[]
      },
      'internal'
    >
  > {
    try {
      await this.taskService.createTask(createTaskInput, user)
      const tasks = await this.taskService.getTasksByUserId(user.id)
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
