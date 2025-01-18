import { ITaskRepository } from './task.repository'

export interface ITransactionManager {
  execute<T>(operation: (repositories: Repositories) => Promise<T>): Promise<T>;
}

export interface Repositories {
  taskRepository: ITaskRepository
}