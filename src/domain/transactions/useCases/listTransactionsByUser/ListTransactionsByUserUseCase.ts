import { TransactionDTO } from '@/domain/transactions/entities/TransactionDTO';
import { ITransactionRepository } from '@/domain/transactions/repositories/ITransactionRepository';

export interface ListTransactionsByUserInput {
  userId: string;
  limit?: number;
}

function normalizeUserId(userId: string): string {
  return userId.trim();
}

function normalizeLimit(limit?: number): number | undefined {
  if (typeof limit !== 'number') {
    return undefined;
  }

  if (!Number.isFinite(limit)) {
    return undefined;
  }

  const parsed = Math.floor(limit);
  return parsed > 0 ? parsed : undefined;
}

export class ListTransactionsByUserUseCase {
  constructor(private readonly repository: ITransactionRepository) {}

  async execute({ userId, limit }: ListTransactionsByUserInput): Promise<TransactionDTO[]> {
    const sanitizedUserId = normalizeUserId(userId);

    if (!sanitizedUserId) {
      throw new Error('User ID is required');
    }

    const normalizedLimit = normalizeLimit(limit);

    return this.repository.findByUser(sanitizedUserId, {
      limit: normalizedLimit,
    });
  }
}
