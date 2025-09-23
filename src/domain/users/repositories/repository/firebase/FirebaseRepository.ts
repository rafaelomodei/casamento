import { adminDb } from '@/infra/repositories/firebase/admin';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export class FirebaseRepository implements IUserRepository {
  private readonly collection;

  constructor() {
    this.collection = adminDb.collection('users');
  }

  async create(user: UserDTO): Promise<string> {
    const { id, ...data } = user;
    const docRef = id ? this.collection.doc(id) : this.collection.doc();
    await docRef.set({ ...data });
    return docRef.id;
  }

  async findById(id: string): Promise<UserDTO | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Omit<UserDTO, 'id'>) };
  }

  async findByPhone(phone: string): Promise<UserDTO | null> {
    const snap = await this.collection
      .where('phone', '==', phone)
      .limit(1)
      .get();
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...(doc.data() as Omit<UserDTO, 'id'>) };
  }

  async findByFamilyId(familyId: string): Promise<UserDTO[]> {
    const snap = await this.collection
      .where('familyId', '==', familyId)
      .get();
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<UserDTO, 'id'>),
    }));
  }

  async findByTableId(tableId: string): Promise<UserDTO[]> {
    const snap = await this.collection.where('tableId', '==', tableId).get();
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<UserDTO, 'id'>),
    }));
  }

  async search(term: string): Promise<UserDTO[]> {
    const snap = await this.collection.get();
    const lower = term.toLowerCase();

    return snap.docs
      .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<UserDTO, 'id'>) }))
      .filter(
        (u) =>
          u.name.toLowerCase().includes(lower) ||
          (u.phone ? u.phone.includes(term) : false),
      );
  }

  async update(id: string, data: Partial<UserDTO>): Promise<void> {
    await this.collection.doc(id).update(data);
  }
}
