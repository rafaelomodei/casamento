import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

export async function slugExists(slug: string) {
  const q = query(collection(db, 'gifts'), where('slug', '==', slug));
  const snap = await getDocs(q);
  return !snap.empty;
}
