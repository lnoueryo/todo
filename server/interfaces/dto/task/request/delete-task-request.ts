import { ValidationError } from '~/server/application/shared/validation-error'

export class DeleteTaskRequest {
  ids: string[]

  constructor(tasks: { id: string }[]) {
    const errMessage = this.validate(tasks)
    if (errMessage) {
      throw new ValidationError(errMessage)
    }
    this.ids = tasks.map(task => task.id)
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
