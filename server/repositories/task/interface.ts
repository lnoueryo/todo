import { TaskData } from '~/server/types/task'
export type ITaskRepository = {
  getTasks(): Promise<TaskData[]>
}