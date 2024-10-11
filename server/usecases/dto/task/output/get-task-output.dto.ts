import { Task } from "~/server/domain/entities/task"
export class GetTaskOutputDTO {
  constructor(
    public id: string,
    public content: string,
    public active: boolean,
    public order: number
  ) {}

  public static fromEntity(task: Task): GetTaskOutputDTO {
    if (!task.id) {
      throw new Error('Task must have an ID to be converted to GetTaskOutput');
    }
    return new GetTaskOutputDTO(
      task.id,
      task.content,
      task.active,
      task.order
    )
  }

  public static fromEntities(tasks: Task[]): GetTaskOutputDTO[] {
    return tasks.map(task => GetTaskOutputDTO.fromEntity(task))
  }
}
