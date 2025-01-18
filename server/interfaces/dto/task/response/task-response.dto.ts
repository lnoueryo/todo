import type { Task } from '~/server/domain/entities/task'
export class TaskResponse {
  constructor(
    private tasks: Task[]
  ) {}
  public responseUserTasks() {
    const tasks = this.tasks.map((task) => {
      if (!task.id) {
        
      }
      return {
        id: task.id!,
        content: task.content,
        active: task.active,
        order: task.order,
      }
    })
    return { tasks }
  }
}
