import { Task } from '~/server/domain/entities/task'
import type { User } from '~/server/types/user'

type CreateTaskInput = Omit<Task, 'createdAt' | 'updatedAt'>
type CreateTaskRequest = Omit<Task, 'userId' | 'createdAt' | 'updatedAt'>

export class CreateTaskInputDTO {
  task: CreateTaskInput
  user: User

  constructor(task: CreateTaskRequest, user: User) {
    this.task = {
      ...task,
      userId: user.id
    }
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
