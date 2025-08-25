import { IMessageRepository } from '@/domain/messages/repositories/IMessageRepository';
import { FirebaseRepository } from '@/domain/messages/repositories/repository/firebase/FirebaseRepository';

export const messageRepository: IMessageRepository = new FirebaseRepository();
