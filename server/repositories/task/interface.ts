import { TaskData } from '~/server/types/task'
export type ITaskRepository = {
  getTasksByUserId(id: string): Promise<TaskData[]>
}