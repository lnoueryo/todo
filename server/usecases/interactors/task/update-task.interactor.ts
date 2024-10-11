import { TaskRepository } from '~/server/domain/repositories/task/task.repository'
import { Task } from '~/server/domain/entities/task'
import { GetTaskOutputDTO } from '~/server/usecases/dto/task/output/get-task-output.dto'
import { UpdateTaskInputDTO } from '~/server/usecases/dto/task/input/update-task-input.dto'

export class UpdateTaskInteractor {
  constructor(private taskRepo: TaskRepository) {}
  public async execute(updateTaskInput: UpdateTaskInputDTO): Promise<GetTaskOutputDTO[]> {
    const updateTasks = updateTaskInput.tasks.map((task) => {
      const newTask = new Task(task)
      return this.taskRepo.updateTask(newTask)
    })
    await Promise.all(updateTasks)
    const tasks = await this.taskRepo.getTasksByUserId(updateTaskInput.user.id)
    return GetTaskOutputDTO.fromEntities(tasks)
  }
}
