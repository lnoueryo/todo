import { httpAuth } from '~/server/interfaces/auth/http-auth'
import taskController from '~/server/infrastructure/http/task.http'

export default defineEventHandler<
  Promise<
    {
      tasks: {
        id: string
        content: string
        active: boolean
        order: number
      }[]
    }
  >
>(
  httpAuth(taskController.updateTasks.bind(taskController))
)
