import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
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

  async findById(id: string): Promise<UserDTO | null> {
    const docRef = doc(this.db, this.collectionPath, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...(docSnap.data() as Omit<UserDTO, 'id'>) };
  }
}
