import { IMessageRepository } from '@/domain/messages/repositories/IMessageRepository';

interface UpdateMessageDTO {
  id: string;
  userId: string;
  message: string;
}

export class UpdateMessageUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute({ id, userId, message }: UpdateMessageDTO): Promise<void> {
    const existing = await this.messageRepository.findById(id);
    if (!existing) {
      throw new Error('Message not found');
    }
    if (existing.userId !== userId) {
      throw new Error('Not authorized');
    }
    await this.messageRepository.update(id, message);
  }
}
