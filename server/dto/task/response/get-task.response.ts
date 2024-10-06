import { TaskData } from "~/server/types/task"
export class GetTaskResponse {
  readonly tasks: TaskData[]
  constructor(tasks: TaskData[]) {
    this.tasks = tasks
  }
}