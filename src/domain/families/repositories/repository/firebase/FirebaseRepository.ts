import { adminDb } from '@/infra/repositories/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { FamilyDTO } from '@/domain/families/entities/FamilyDTO';
import { IFamilyRepository } from '@/domain/families/repositories/IFamilyRepository';

export class FirebaseRepository implements IFamilyRepository {
  private readonly collection;

  constructor() {
    this.collection = adminDb.collection('families');
  }

  async create(family: FamilyDTO): Promise<string> {
    const { id, ...data } = family;
    const docRef = id ? this.collection.doc(id) : this.collection.doc();
    await docRef.set({ ...data });
    return docRef.id;
  }

  async addMember(familyId: string, userId: string): Promise<void> {
    await this.collection.doc(familyId).update({
      memberIds: FieldValue.arrayUnion(userId),
    });
  }

  async findById(id: string): Promise<FamilyDTO | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Omit<FamilyDTO, 'id'>) };
  }

  async list(): Promise<FamilyDTO[]> {
    const snap = await this.collection.get();
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<FamilyDTO, 'id'>),
    }));
  }

  async update(id: string, data: Partial<FamilyDTO>): Promise<void> {
    await this.collection.doc(id).update(data);
  }
}
