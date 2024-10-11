import { TaskRepository } from '~/server/domain/repositories/task/task.repository'
import { Task } from '~/server/domain/entities/task'
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
    if (task.userId !== deleteTaskInput.user.id) {
      throw createError({
        statusCode: 400
      })
    }
    await this.taskRepo.deleteTask(deleteTaskInput.id)
    const tasks = await this.taskRepo.getTasksByUserId(deleteTaskInput.user.id)
    return GetTaskOutputDTO.fromEntities(tasks)
  }
}
