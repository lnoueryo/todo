import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { GetTaskOutputDTO } from '~/server/application/dto/task/output/get-task-output.dto'

export class GetTaskUsecase {
  constructor(private taskRepo: TaskRepository) {}
  public async execute(params: {
    id: string,
    email: string
  }): Promise<GetTaskOutputDTO[]> {
    const tasks = await this.taskRepo.getTasksByUserId(params.id)
    return GetTaskOutputDTO.fromEntities(tasks)
  }
}
