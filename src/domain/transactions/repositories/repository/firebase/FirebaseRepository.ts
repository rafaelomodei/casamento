import type { CollectionReference } from 'firebase-admin/firestore';

import { adminDb } from '@/infra/repositories/firebase/admin';
import { TransactionDTO } from '@/domain/transactions/entities/TransactionDTO';
import {
  FindUserTransactionsOptions,
  ITransactionRepository,
} from '@/domain/transactions/repositories/ITransactionRepository';

export class FirebaseRepository implements ITransactionRepository {
  private readonly collection: CollectionReference;

  constructor() {
    this.collection = adminDb.collection('transactions');
  }

  async create(transaction: TransactionDTO): Promise<string> {
    const docRef = this.collection.doc();
    const data = { ...transaction } as Record<string, unknown>;
    delete (data as { id?: string }).id;
    await docRef.set(data);
    return docRef.id;
  }

  async findByUser(
    userId: string,
    options?: FindUserTransactionsOptions,
  ): Promise<TransactionDTO[]> {
    let query = this.collection
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc');

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as TransactionDTO),
    }));
  }

  async findById(id: string): Promise<TransactionDTO | null> {
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...(doc.data() as TransactionDTO),
    };
  }
}
