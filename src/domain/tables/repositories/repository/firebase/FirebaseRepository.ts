import { TableDTO } from '@/domain/tables/entities/TableDTO';
import { ITableRepository } from '@/domain/tables/repositories/ITableRepository';
import { adminDb } from '@/infra/repositories/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export class FirebaseRepository implements ITableRepository {
  private readonly collection;

  constructor() {
    this.collection = adminDb.collection('tables');
  }

  async create(table: TableDTO): Promise<string> {
    const { id, ...data } = table;
    const docRef = id ? this.collection.doc(id) : this.collection.doc();
    await docRef.set({ ...data });
    return docRef.id;
  }

  async addMember(tableId: string, userId: string): Promise<void> {
    await this.collection.doc(tableId).update({
      memberIds: FieldValue.arrayUnion(userId),
    });
  }

  async findById(id: string): Promise<TableDTO | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Omit<TableDTO, 'id'>) };
  }

  async list(): Promise<TableDTO[]> {
    const snap = await this.collection.get();
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<TableDTO, 'id'>),
    }));
  }

  async update(id: string, data: Partial<TableDTO>): Promise<void> {
    await this.collection.doc(id).update(data);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
