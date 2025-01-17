import { Task } from '~/server/domain/entities/task'
import { CreateTaskRequest } from '~/server/interfaces/dto/task/request/create-task-request.dto'
import { TaskService } from '~/server/domain/services/task.service'
import { User } from '~/server/domain/entities/user'

export class CreateTaskUsecase {
  constructor(private taskService: TaskService) {}
  public async execute(createTaskInput: CreateTaskRequest, user: User): Promise<Task[]> {
    await this.taskService.createTask(createTaskInput, user)
    return await this.taskService.getTasksByUserId(user.id)
  }
}
