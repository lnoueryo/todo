import type { User } from './user'

const UPDATABLE_FIELDS = [
  'content',
  'active',
  'order',
] as const

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
  static create(userId: string, taskData: {
    content: string
    active: boolean
    order: number
  }) {
    return new Task({
      ...taskData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
  public update(fields: Partial<Task>) {
    const updateData = UPDATABLE_FIELDS.reduce((acc, field) => {
      if (fields[field] !== undefined) {
        return {
          ...acc,
          [field]: fields[field]
        }
      }
      return acc
    }, {})
    return new Task({
      ...this,
      ...updateData,
      updatedAt: new Date(),
    })
  }
  isTaskOwnedByUser(user: User) {
    return this.userId === user.id
  }
}
