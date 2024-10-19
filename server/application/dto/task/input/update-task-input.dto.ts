import { ValidationError } from '~/server/application/shared/validation-error'
import type { ITask } from '~/server/domain/entities/task'
import type { User } from '~/server/types/user'

type UpdateTaskRequest = Omit<ITask, 'userId' | 'createdAt' | 'updatedAt'>
type UpdateTaskProcessedData = UpdateTaskRequest & { updatedAt: Date }

export class UpdateTaskInputDTO {
  tasks: UpdateTaskProcessedData[]
  taskIds: string[]
  user: User

  constructor(tasks: UpdateTaskProcessedData[], user: User) {
    const errMessage = this.validate(tasks)
    if (errMessage) {
      throw new ValidationError('Task order is required')
    }
    this.tasks = tasks
    this.taskIds = tasks.map((task) => task.id)
    this.user = user
  }

  validate(tasks: any[]) {
    for (const task of tasks) {
      if (!task.order) {
        return 'Task order is required'
      }
    }
    return null
  }

  public static fromRequest(task: UpdateTaskRequest): UpdateTaskProcessedData {
    return {
      id: task.id,
      content: task.content,
      active: task.active,
      order: task.order,
      updatedAt: new Date(),
    }
  }

  public static fromRequestArray(tasks: UpdateTaskRequest[], user: User): UpdateTaskInputDTO {
    if (!Array.isArray(tasks)) {
      throw new ValidationError('Task array is only allowed')
    }
    return new UpdateTaskInputDTO(
      tasks.map(task => UpdateTaskInputDTO.fromRequest(task)),
      user
    )
  }
}