import { MessageDTO } from '@/domain/messages/entities/MessageDTO';
import { IMessageRepository } from '@/domain/messages/repositories/IMessageRepository';

export class GetAllMessagesUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(limit?: number): Promise<MessageDTO[]> {
    return this.messageRepository.findAll(limit);
  }
}
