import { User } from '../../entities/user'
import { ITaskRepository } from '../../repositories/task.repository'

export class TaskOwnershipService  {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async areTasksOwnedByUser(
    taskIds: string[],
    user: User
  ) {
    const targetTasks = await this.taskRepository.getTasksByIds(taskIds)
    return targetTasks.every((task) => task.isCurrentUserTask(user))
  }
}
