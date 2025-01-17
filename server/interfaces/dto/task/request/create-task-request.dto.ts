import { ValidationError } from '~/server/application/shared/validation-error'
import type { Task } from '~/server/domain/entities/task'

type CreateTaskData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

export class CreateTaskRequest {
  task: CreateTaskData

  constructor(task: CreateTaskData) {
    const errMessage = this.validate(task)
    if (errMessage) {
      throw new ValidationError(errMessage)
    }
    this.task = task
  }
  private validate(task: any): string | null {
    if (typeof task !== 'object') {
      return 'Task object is only allowed'
    }
    const requiredKeys: (keyof CreateTaskData)[] = ['content', 'active', 'order']
    for (const key of requiredKeys) {
      if (!(key in task)) {
        return `${key} is required`
      }
      const value = task[key]
      if (value === null || value === undefined) {
        return `${key} is required`
      }
    }
    return null
  }
}
