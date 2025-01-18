import { Task } from '~/server/domain/entities/task'
import { CreateTaskRequest } from '~/server/interfaces/dto/task/request/create-task-request.dto'
import { User } from '~/server/domain/entities/user'
import { UsecaseResult } from '../../shared/usecase-result'
import { ITaskRepository } from '~/server/domain/repositories/task.repository'

export class CreateTaskUsecase {
  constructor(private taskRepo: ITaskRepository) {}
  public async execute(createTaskInput: CreateTaskRequest, user: User): Promise<
    UsecaseResult<
      {
        tasks: Task[]
      },
      'internal'
    >
  > {
    try {
      const task = new Task(createTaskInput.task)
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
