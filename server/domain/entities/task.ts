import type { User } from "./user"

export class Task {
  public id?: string
  public userId: string
  public content: string
  public active: boolean
  public order: number
  public createdAt: Date | undefined
  public updatedAt: Date | undefined
  constructor(params: {
    id?: string
    userId: string
    content: string
    active: boolean
    order: number
    createdAt?: Date
    updatedAt?: Date
  }) {
    this.id = params.id
    this.userId = params.userId
    this.content = params.content
    this.active = params.active
    this.order = params.order
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }
  isCurrentUserTask(user: User) {
    return this.userId === user.id
  }
}
