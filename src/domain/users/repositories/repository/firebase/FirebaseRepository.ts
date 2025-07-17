import { adminDb } from '@/infra/repositories/firebase/admin';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export class FirebaseRepository implements IUserRepository {
  private readonly collection;

  constructor() {
    this.collection = adminDb.collection('users');
  }

  async create(user: UserDTO): Promise<void> {
    const { id, ...data } = user;
    const docRef = id ? this.collection.doc(id) : this.collection.doc();
    await docRef.set({ ...data });
  }

  async findById(id: string): Promise<UserDTO | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Omit<UserDTO, 'id'>) };
  }
}
