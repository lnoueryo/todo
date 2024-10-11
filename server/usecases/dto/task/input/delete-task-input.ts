import type { User } from '~/server/types/user'

export class DeleteTaskInputDTO {
  id: string
  user: User

  constructor(id: string, user: User) {
    this.id = id
    this.user = user
  }
}
