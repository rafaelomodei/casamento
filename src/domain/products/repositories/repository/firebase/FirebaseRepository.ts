import {
  getFirestore,
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  getDoc,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { appFirebase } from '../../../../../infra/repositories/firebase/config';
import { IProductRepository } from '@/domain/products/repositories/IProductRepository';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';

export class FirebaseRepository implements IProductRepository {
  private readonly db;
  private readonly collectionPath: string;
  private readonly collection;

  constructor() {
    if (!appFirebase) {
      throw new Error('Firebase not initialized');
    }

    this.collectionPath = 'products';
    this.db = getFirestore(appFirebase);
    this.collection = collection(this.db, this.collectionPath);
  }

  async create(product: ProductDTO): Promise<void> {
    const { ...data } = product;
    await addDoc(this.collection, { ...data, views: data.views ?? 0 });
  }

  async findAll(): Promise<ProductDTO[]> {
    const q = query(this.collection);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      ...(docSnap.data() as ProductDTO),
      id: docSnap.id,
    }));
  }

  async findById(id: string): Promise<ProductDTO | null> {
    const docRef = doc(this.db, this.collectionPath, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { ...(docSnap.data() as ProductDTO), id: docSnap.id };
  }

  async findBySlug(slug: string): Promise<ProductDTO | null> {
    const q = query(this.collection, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    const docSnap = snapshot.docs[0];
    if (!docSnap) return null;
    return { ...(docSnap.data() as ProductDTO), id: docSnap.id };
  }

  async update(id: string, product: ProductDTO): Promise<void> {
    const docRef = doc(this.db, this.collectionPath, id);
    const { ...data } = product;
    await updateDoc(docRef, { ...data });
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.db, this.collectionPath, id);
    await deleteDoc(docRef);
  }
}
