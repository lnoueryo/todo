import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { Task } from '~/server/domain/entities/task'
import { GetTaskOutputDTO } from '~/server/application/dto/task/output/get-task-output.dto'
import { UpdateTaskInputDTO } from '~/server/application/dto/task/input/update-task-input.dto'

export class UpdateTaskInteractor {
  constructor(private taskRepo: TaskRepository) {}
  public async execute(updateTaskInput: UpdateTaskInputDTO): Promise<GetTaskOutputDTO[]> {
    const targetTasks = await this.taskRepo.getTasksByIds(updateTaskInput.taskIds)
    const areTasksCurrentUsers = targetTasks.every((task) => task.isCurrentUserTask(updateTaskInput.user))
    if (!areTasksCurrentUsers) {
      console.warn("tasks are not current user's")
      throw createError({
        status: 400
      })
    }
    const updateTasks = updateTaskInput.tasks.map((task) => {
      const newTask = new Task(task)
      return this.taskRepo.updateTask(newTask)
    })
    await Promise.all(updateTasks)
    const tasks = await this.taskRepo.getTasksByUserId(updateTaskInput.user.id)
    return GetTaskOutputDTO.fromEntities(tasks)
  }
}
