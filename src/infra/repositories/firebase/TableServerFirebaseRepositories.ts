import { ITableRepository } from '@/domain/tables/repositories/ITableRepository';
import { FirebaseRepository } from '@/domain/tables/repositories/repository/firebase/FirebaseRepository';

export const tableRepository: ITableRepository = new FirebaseRepository();
