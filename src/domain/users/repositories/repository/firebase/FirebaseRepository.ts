import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { appFirebase } from '../../../../../infra/repositories/firebase/config';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export class FirebaseRepository implements IUserRepository {
  private readonly db;
  private readonly collectionPath: string;
  private readonly collection;

  constructor() {
    if (!appFirebase) {
      throw new Error('Firebase not initialized');
    }

    this.collectionPath = 'users';
    this.db = getFirestore(appFirebase);
    this.collection = collection(this.db, this.collectionPath);
  }

  async create(user: UserDTO): Promise<void> {
    const { id, ...data } = user;
    const docRef = id ? doc(this.db, this.collectionPath, id) : doc(this.collection);
    await setDoc(docRef, { ...data });
  }
}
