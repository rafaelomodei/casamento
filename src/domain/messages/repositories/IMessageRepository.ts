import { MessageDTO } from '../entities/MessageDTO';

export interface IMessageRepository {
  create(message: MessageDTO): Promise<void>;
  findAll(limit?: number): Promise<MessageDTO[]>;
  findById(id: string): Promise<MessageDTO | null>;
  update(id: string, message: string): Promise<void>;
  delete(id: string): Promise<void>;
}
