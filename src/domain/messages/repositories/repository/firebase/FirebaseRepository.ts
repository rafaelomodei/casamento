import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { appFirebase } from '../../../../../infra/repositories/firebase/config';
import { IMessageRepository } from '@/domain/messages/repositories/IMessageRepository';
import { MessageDTO } from '@/domain/messages/entities/MessageDTO';

export class FirebaseRepository implements IMessageRepository {
  private readonly db;
  private readonly collectionPath: string;
  private readonly collection;

  constructor() {
    if (!appFirebase) {
      throw new Error('Firebase not initialized');
    }

    this.collectionPath = 'messages';
    this.db = getFirestore(appFirebase);
    this.collection = collection(this.db, this.collectionPath);
  }

  async create(message: MessageDTO): Promise<void> {
    const { ...data } = message;

    await addDoc(this.collection, {
      ...data,
      date: serverTimestamp(),
    });
  }
  async findAll(): Promise<MessageDTO[]> {
    const q = query(this.collection);

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        message: data.message as string,
        date: data.date.toDate(),
      };
    });
  }

  async findById(id: string): Promise<MessageDTO | null> {
    const q = query(this.collection, where('id', '==', id));

    const snapshot = await getDocs(q);
    const doc = snapshot.docs[0];
    if (!doc) return null;

    const data = doc.data();
    return {
      id: doc.id,
      message: data.message as string,
      date: data.date.toDate(),
    };
  }
}
