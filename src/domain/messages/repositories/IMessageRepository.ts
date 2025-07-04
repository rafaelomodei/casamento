import { MessageDTO } from '../entities/MessageDTO';

export interface IMessageRepository {
  create(message: MessageDTO): Promise<void>;
  findAll(): Promise<MessageDTO[]>;
  findById(id: string): Promise<MessageDTO | null>;
}
