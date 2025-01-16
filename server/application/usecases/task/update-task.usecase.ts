import { Task } from '~/server/domain/entities/task'
import { UpdateTaskRequest } from '~/server/interfaces/dto/task/request/update-task-request.dto'
import { TaskService } from '~/server/domain/services/task.service'

export class UpdateTaskUsecase {
  constructor(private taskService: TaskService) {}
  public async execute(updateTaskRequest: UpdateTaskRequest): Promise<Task[]> {
    const areTasksCurrentUsers = this.taskService.areTasksCurrentUsers(updateTaskRequest.taskIds, updateTaskRequest.user)
    if (!areTasksCurrentUsers) {
      console.warn("tasks are not current user's")
      throw new Error()
    }
    await this.taskService.updateBatch(updateTaskRequest.tasks)
    return await this.taskService.getTasksByUserId(updateTaskRequest.user.id)
  }
}
