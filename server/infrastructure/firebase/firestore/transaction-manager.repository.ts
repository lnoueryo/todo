import admin from 'firebase-admin'
import { ITransactionManager, Repositories } from '~/server/domain/repositories/transaction-manager.repository'
import { TaskRepository } from './task.repository'

export class FireStoreTransactionManager implements ITransactionManager {
  constructor(private readonly firestore: admin.firestore.Firestore) {}

  async execute<T>(operation: (repositories: Repositories) => Promise<T>): Promise<T> {
    return await this.firestore.runTransaction(async (tx) => {
      const repositories: Repositories = {
        taskRepository: new TaskRepository(tx),
      }
      return operation(repositories)
    })
  }
}
