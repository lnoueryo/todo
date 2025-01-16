import { ValidationError } from '~/server/application/shared/validation-error'
import type { User } from '~/server/types/user'

export class DeleteTaskRequest {
  ids: string[]
  user: User

  constructor(tasks: { id: string }[], user: User) {
    const errMessage = this.validate(tasks)
    if (errMessage) {
      throw new ValidationError(errMessage)
    }
    this.ids = tasks.map(task => task.id)
    this.user = user
  }
  private validate(tasks: any): string | null {
    if (!Array.isArray(tasks)) {
      return 'Task array is only allowed'
    }
    const allTasksHaveIds = tasks.every((task) => task.id)
    if (!allTasksHaveIds) {
      return 'Tasks do not have ids'
    }
    return null
  }
}
