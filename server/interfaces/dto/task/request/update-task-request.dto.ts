import { ValidationError } from '~/server/application/shared/validation-error'
import type { Task } from '~/server/domain/entities/task'

type UpdateTaskData = Required<Omit<Task, 'createdAt' | 'updatedAt'>>

export class UpdateTaskRequest {
  tasks: UpdateTaskData[]

  constructor(tasks: UpdateTaskData[]) {
    const errMessage = this.validate(tasks)
    if (errMessage) {
      throw new ValidationError('Task order is required')
    }
    this.tasks = tasks
  }

  validate(tasks: any[]) {
    for (const task of tasks) {
      if (!task.order) {
        return 'Task order is required'
      }
    }
    return null
  }

  getIds() {
    return this.tasks.map(task => task.id)
  }

}