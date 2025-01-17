export class User {
  public id: string
  public email: string
  constructor(params: {
    id: string
    email: string
  }) {
    this.id = params.id
    this.email = params.email
  }
}
