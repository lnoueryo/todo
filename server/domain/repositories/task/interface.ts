import Task from "~/server/entities/task"
export type ITaskRepository = {
  getTasksByUserId(id: string): Promise<Task[]>
}
