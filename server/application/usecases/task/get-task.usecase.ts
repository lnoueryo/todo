import { TaskService } from '~/server/domain/services/task.service';
import { Task } from '~/server/domain/entities/task';

export class GetTaskUsecase {
  constructor(private TaskService: TaskService) {}
  public async execute(params: {
    id: string,
    email: string
  }): Promise<Task[]> {
    return await this.TaskService.getTasksByUserId(params.id)
  }
}
