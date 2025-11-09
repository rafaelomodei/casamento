import { TransactionDTO } from '@/domain/transactions/entities/TransactionDTO';
import { ITransactionRepository } from '@/domain/transactions/repositories/ITransactionRepository';

export interface GetTransactionByIdInput {
  id: string;
  userId: string;
}

function normalizeId(id: string): string {
  return id.trim();
}

function normalizeUserId(userId: string): string {
  return userId.trim();
}

export class GetTransactionByIdUseCase {
  constructor(private readonly repository: ITransactionRepository) {}

  async execute({ id, userId }: GetTransactionByIdInput): Promise<TransactionDTO> {
    const sanitizedId = normalizeId(id);
    const sanitizedUserId = normalizeUserId(userId);

    if (!sanitizedId) {
      throw new Error('Transaction ID is required');
    }

    if (!sanitizedUserId) {
      throw new Error('User ID is required');
    }

    const transaction = await this.repository.findById(sanitizedId);

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if (transaction.userId !== sanitizedUserId) {
      throw new Error('Not authorized');
    }

    return transaction;
  }
}
