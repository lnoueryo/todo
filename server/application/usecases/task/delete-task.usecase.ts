import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { DeleteTaskInputDTO } from '~/server/application/dto/task/input/delete-task-input'
import { GetTaskOutputDTO } from '~/server/application/dto/task/output/get-task-output.dto'

export class DeleteTaskUsecase {
  constructor(private taskRepo: TaskRepository) {}
  public async execute(deleteTaskInput: DeleteTaskInputDTO): Promise<GetTaskOutputDTO[]> {
    const targetTasks = await this.taskRepo.getTasksByIds(deleteTaskInput.ids)
    const areTasksCurrentUsers = targetTasks.every((task) => task.isCurrentUserTask(deleteTaskInput.user))
    if (!areTasksCurrentUsers) {
      console.warn("tasks are not current user's")
      throw createError({
        status: 400
      })
    }
    const deleteTasks = deleteTaskInput.ids.map((id) => {
      return this.taskRepo.deleteTask(id)
    })
    await Promise.all(deleteTasks)
    const tasks = await this.taskRepo.getTasksByUserId(deleteTaskInput.user.id)
    return GetTaskOutputDTO.fromEntities(tasks)
  }
}
