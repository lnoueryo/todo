import Task from '~/server/domain/entities/task'

type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

type User = {
  id: string
  email: string
}

export default class CreateTaskInputDTO {
  task: CreateTaskInput
  user: User

  constructor(task: CreateTaskInput & { id?: string }, user: User) {
    const { id, ...rest } = task
    this.task = rest
    this.user = user
    this.validate()
  }

  validate() {
    for (const key in this.task) {
      const value = this.task[key as keyof CreateTaskInput]
      if (value === null || value === undefined) {
        throw new Error(`${key} is required`)
      }
    }
  }
}
