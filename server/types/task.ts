import type { Task } from '../entities/task'

export type TaskData = Omit<Task, 'createdAt' | 'updatedAt'>