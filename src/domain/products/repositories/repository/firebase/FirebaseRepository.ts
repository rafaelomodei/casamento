import { adminDb } from '@/infra/repositories/firebase/admin';
import { IProductRepository } from '@/domain/products/repositories/IProductRepository';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';

export class FirebaseRepository implements IProductRepository {
  private readonly collection;

  constructor() {
    this.collection = adminDb.collection('products');
  }

  async create(product: ProductDTO): Promise<void> {
    const { id, ...data } = product;
    const docRef = id ? this.collection.doc(id) : this.collection.doc();
    await docRef.set({ ...data, views: data.views ?? 0 });
  }

  async findAll(): Promise<ProductDTO[]> {
    const snap = await this.collection.get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as ProductDTO) }));
  }

  async findById(id: string): Promise<ProductDTO | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as ProductDTO) };
  }

  async findBySlug(slug: string): Promise<ProductDTO | null> {
    const snap = await this.collection.where('slug', '==', slug).limit(1).get();
    const doc = snap.docs[0];
    if (!doc) return null;
    return { id: doc.id, ...(doc.data() as ProductDTO) };
  }

  async findMostViewed(limit: number): Promise<ProductDTO[]> {
    const snap = await this.collection
      .orderBy('views', 'desc')
      .limit(limit)
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as ProductDTO) }));
  }

  async update(id: string, product: ProductDTO): Promise<void> {
    const { ...data } = product;
    await this.collection.doc(id).update({ ...data });
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
