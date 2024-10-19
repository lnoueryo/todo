import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { Task } from '~/server/domain/entities/task'
import { CreateTaskInputDTO } from '~/server/application/dto/task/input/create-task-input.dto'
import { GetTaskOutputDTO } from '~/server/application/dto/task/output/get-task-output.dto'

export class CreateTaskUsecase {
  constructor(private taskRepo: TaskRepository) {}
  public async execute(createTaskInput: CreateTaskInputDTO): Promise<GetTaskOutputDTO[]> {
    const newTask = new Task(createTaskInput.task)
    await this.taskRepo.createTask(newTask)
    const tasks = await this.taskRepo.getTasksByUserId(createTaskInput.user.id)
    return GetTaskOutputDTO.fromEntities(tasks)
  }
}
