import { ValidationError } from '~/server/application/shared/validation-error'
import type { ITask } from '~/server/domain/entities/task'
import type { User } from '~/server/types/user'

type CreateTaskInput = Omit<ITask, 'createdAt' | 'updatedAt'>
type CreateTaskRequest = Omit<ITask, 'userId' | 'createdAt' | 'updatedAt'>

export class CreateTaskInputDTO {
  task: CreateTaskInput
  user: User

  constructor(task: CreateTaskRequest, user: User) {
    const errMessage = this.validate(task)
    if (errMessage) {
      throw new ValidationError(errMessage)
    }
    this.task = {
      ...task,
      userId: user.id
    }
    this.user = user
  }
  private validate(task: any): string | null {
    if (typeof task !== 'object') {
      return 'Task object is only allowed'
    }
    const requiredKeys: (keyof CreateTaskInput)[] = ['content', 'active', 'order']
    for (const key in requiredKeys) {
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
