import { MessageDTO } from '@/domain/messages/entities/MessageDTO';
import { IMessageRepository } from '@/domain/messages/repositories/IMessageRepository';

export class GetAllMessagesUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(): Promise<MessageDTO[]> {
    return this.messageRepository.findAll();
  }
}
