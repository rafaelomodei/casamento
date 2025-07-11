import { IUserRepository } from '@/domain/users/repositories/IUserRepository';
import { FirebaseRepository } from '@/domain/users/repositories/repository/firebase/FirebaseRepository';

export const userRepository: IUserRepository = new FirebaseRepository();
