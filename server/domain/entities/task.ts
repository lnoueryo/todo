export default class Task {
  public id: string | undefined
  public userId: string
  public content: string
  public active: boolean
  public order: number
  public createdAt: Date = new Date()
  public updatedAt: Date = new Date()
  constructor(params: {
    id?: string | undefined
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
    this.createdAt = params.createdAt || new Date()
    this.updatedAt = params.updatedAt || new Date()
  }
}
