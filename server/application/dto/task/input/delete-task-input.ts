import type { User } from '~/server/types/user'

export class DeleteTaskInputDTO {
  ids: string[]
  user: User

  constructor(tasks: { id: string }[], user: User) {
    this.ids = tasks.map(task => task.id)
    this.user = user
  }
}
