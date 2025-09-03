import { IMessageRepository } from '@/domain/messages/repositories/IMessageRepository';

interface DeleteMessageDTO {
  id: string;
  userId: string;
}

export class DeleteMessageUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute({ id, userId }: DeleteMessageDTO): Promise<void> {
    const existing = await this.messageRepository.findById(id);
    if (!existing) {
      throw new Error('Message not found');
    }
    if (existing.userId !== userId) {
      throw new Error('Not authorized');
    }
    await this.messageRepository.delete(id);
  }
}
