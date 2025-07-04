import { MessageDTO } from '@/domain/messages/entities/MessageDTO';
import { IMessageRepository } from '@/domain/messages/repositories/IMessageRepository';

export class CreateMessageUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(data: MessageDTO): Promise<void> {
    await this.messageRepository.create(data);
  }
}
