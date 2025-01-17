import type { Task } from '~/server/domain/entities/task'
export class GetTaskResponse {
  constructor(
    public tasks: Task[]
  ) {}
}
