import { Task } from '~/server/domain/entities/task'
import { CreateTaskRequest } from '~/server/interfaces/dto/task/request/create-task-request.dto'
import { TaskService } from '~/server/domain/services/task.service'

export class CreateTaskUsecase {
  constructor(private taskService: TaskService) {}
  public async execute(createTaskInput: CreateTaskRequest): Promise<Task[]> {
    await this.taskService.createTask(createTaskInput)
    return await this.taskService.getTasksByUserId(createTaskInput.user.id)
  }
}
