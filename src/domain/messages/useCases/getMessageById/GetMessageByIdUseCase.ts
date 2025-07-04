import { MessageDTO } from '@/domain/messages/entities/MessageDTO';
import { IMessageRepository } from '@/domain/messages/repositories/IMessageRepository';

export class GetMessageByIdUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(id: string): Promise<MessageDTO | null> {
    return this.messageRepository.findById(id);
  }
}
