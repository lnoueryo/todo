import admin from 'firebase-admin'

export abstract class BaseRepository {
  constructor(protected dbCtx: admin.firestore.Firestore | admin.firestore.Transaction) {}
  protected abstract collectionName: string;
  protected getCollection(): admin.firestore.CollectionReference {
    if (this.dbCtx instanceof admin.firestore.Transaction) {
      return admin.firestore().collection(this.collectionName);
    }
    return this.dbCtx.collection(this.collectionName);
  }
}
