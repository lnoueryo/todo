import type { ITask } from '~/server/domain/entities/task'
import type { User } from '~/server/types/user'

type UpdateTaskRequest = Omit<ITask, 'userId' | 'createdAt' | 'updatedAt'>
type UpdateTaskProcessedData = UpdateTaskRequest & { updatedAt: Date }

export class UpdateTaskInputDTO {
  tasks: UpdateTaskProcessedData[]
  taskIds: string[]
  user: User

  constructor(tasks: UpdateTaskProcessedData[], user: User) {
    this.tasks = tasks
    this.taskIds = tasks.map((task) => task.id)
    this.user = user
    this.validate()
  }

  validate() {
    for (const task of this.tasks) {
      if (!task.order) {
        throw new Error('Task order is required');
      }
    }
  }

  public static fromRequest(task: UpdateTaskRequest): UpdateTaskProcessedData {
    return {
      id: task.id,
      content: task.content,
      active: task.active,
      order: task.order,
      updatedAt: new Date(),
    };
  }

  public static fromRequestArray(tasks: UpdateTaskRequest[], user: User): UpdateTaskInputDTO {
    return new UpdateTaskInputDTO(
      tasks.map(task => UpdateTaskInputDTO.fromRequest(task)),
      user
    );
  }
}