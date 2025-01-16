import { Task } from '~/server/domain/entities/task'
import { TaskService } from '~/server/domain/services/task.service'
import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { DeleteTaskRequest } from '~/server/interfaces/dto/task/request/delete-task-request'

export class DeleteTaskUsecase {
  constructor(private taskService: TaskService) {}
  public async execute(deleteTaskRequest: DeleteTaskRequest): Promise<Task[]> {
    const areTasksCurrentUsers = await this.taskService.areTasksCurrentUsers(deleteTaskRequest.ids, deleteTaskRequest.user)
    if (!areTasksCurrentUsers) {
      console.warn("tasks are not current user's")
      throw new Error()
    }
    await this.taskService.deleteBatch(deleteTaskRequest.ids)
    return await this.taskService.getTasksByUserId(deleteTaskRequest.user.id)
  }
}
