import { TaskRepository } from '~/server/domain/repositories/task/task.repository'
import { DeleteTaskInputDTO } from '~/server/usecases/dto/task/input/delete-task-input'
import { GetTaskOutputDTO } from '~/server/usecases/dto/task/output/get-task-output.dto'

export class DeleteTaskInteractor {
  constructor(private taskRepo: TaskRepository) {}
  public async execute(deleteTaskInput: DeleteTaskInputDTO): Promise<GetTaskOutputDTO[]> {
    const task = await this.taskRepo.getTaskByUserId(deleteTaskInput.id)
    if (!task) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
      })
    }
    if (!task.isCurrentUserTask(deleteTaskInput.user)) {
      throw createError({
        statusCode: 400
      })
    }
    await this.taskRepo.deleteTask(deleteTaskInput.id)
    const tasks = await this.taskRepo.getTasksByUserId(deleteTaskInput.user.id)
    return GetTaskOutputDTO.fromEntities(tasks)
  }
}
