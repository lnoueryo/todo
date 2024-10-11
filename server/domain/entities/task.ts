export class Task {
  public id: string
  public userId: string
  public content: string
  public active: boolean
  public order: number
  public createdAt: Date
  public updatedAt: Date
  constructor(params: {
    id: string
    userId?: string
    content: string
    active: boolean
    order: number
    createdAt?: Date
    updatedAt?: Date
  }) {
    this.id = params.id
    this.userId = params.userId ?? ''
    this.content = params.content
    this.active = params.active
    this.order = params.order
    this.createdAt = params.createdAt || new Date()
    this.updatedAt = params.updatedAt || new Date()
  }
}
