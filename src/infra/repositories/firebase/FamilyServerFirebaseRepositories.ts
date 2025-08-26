import { IFamilyRepository } from '@/domain/families/repositories/IFamilyRepository';
import { FirebaseRepository } from '@/domain/families/repositories/repository/firebase/FirebaseRepository';

export const familyRepository: IFamilyRepository = new FirebaseRepository();
