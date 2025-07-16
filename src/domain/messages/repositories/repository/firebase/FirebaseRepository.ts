import { adminDb } from '@/infra/repositories/firebase/admin';
import { IMessageRepository } from '@/domain/messages/repositories/IMessageRepository';
import { MessageDTO } from '@/domain/messages/entities/MessageDTO';

export class FirebaseRepository implements IMessageRepository {
  private readonly collection;

  constructor() {
    this.collection = adminDb.collection('messages');
  }

  async create(message: MessageDTO): Promise<void> {
    const docRef = this.collection.doc();
    await docRef.set({
      message: message.message,
      createdAt: new Date().toISOString(),
    });
  }

  async findAll(limit?: number): Promise<MessageDTO[]> {
    let q = this.collection.orderBy('createdAt', 'desc');
    if (limit) {
      q = q.limit(limit);
    }

    const snap = await q.get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as MessageDTO) }));
  }

  async findById(id: string): Promise<MessageDTO | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as MessageDTO) };
  }
}
