import { ValidationError } from '~/server/application/shared/validation-error'
import type { ITask } from '~/server/domain/entities/task'
import type { User } from '~/server/types/user'

type UpdateTaskProcessedData = Omit<ITask, 'createdAt' | 'updatedAt'> & { id: string, updatedAt: Date }

export class UpdateTaskRequest {
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

  public static fromRequest(task: Omit<ITask, 'createdAt' | 'updatedAt'> & { id: string}): UpdateTaskProcessedData {
    return {
      id: task.id,
      userId: task.userId,
      content: task.content,
      active: task.active,
      order: task.order,
      updatedAt: new Date(),
    }
  }

  public static fromRequestArray(tasks: (Omit<ITask, 'createdAt' | 'updatedAt'> & { id: string })[], user: User): UpdateTaskRequest {
    if (!Array.isArray(tasks)) {
      throw new ValidationError('Task array is only allowed')
    }
    return new UpdateTaskRequest(
      tasks.map(task => UpdateTaskRequest.fromRequest(task)),
      user
    )
  }
}