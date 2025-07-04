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
    const { id, createdAt, updatedAt, ...data } = product;

    await addDoc(this.collection, {
      ...data,
      features: product.features ?? [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
  async findAll(tenant: string): Promise<ProductDTO[]> {
    console.info('tenant:: ', tenant);
    const q = query(this.collection, where('storeId', '==', tenant));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        ...(data as ProductDTO),
        id: doc.id,
        price: Number(data.price),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      };
    });
  }

  async findBySlug(slug: string, tenant: string): Promise<ProductDTO | null> {
    const q = query(
      this.collection,
      where('storeId', '==', tenant),
      where('slug', '==', slug)
    );

    const snapshot = await getDocs(q);
    const doc = snapshot.docs[0];
    if (!doc) return null;

    const data = doc.data();
    return {
      ...(data as ProductDTO),
      id: doc.id,
      price: Number(data.price),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  }

  async findById(id: string, tenant: string): Promise<ProductDTO | null> {
    const q = query(
      this.collection,
      where('storeId', '==', tenant),
      where('id', '==', id)
    );

    const snapshot = await getDocs(q);
    const doc = snapshot.docs[0];
    if (!doc) return null;

    const data = doc.data();
    return {
      ...(data as ProductDTO),
      id: doc.id,
      price: Number(data.price),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  }
}
