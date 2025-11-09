import { TransactionDTO } from '@/domain/transactions/entities/TransactionDTO';
import { ITransactionRepository } from '@/domain/transactions/repositories/ITransactionRepository';

export type CreateTransactionInput = Record<string, unknown> & {
  userId: string;
  createdAt?: string;
};

function normalizeUserId(userId: string): string {
  return userId.trim();
}

function resolveCreatedAt(createdAt?: string): string {
  if (createdAt && createdAt.trim().length > 0) {
    return createdAt;
  }
  return new Date().toISOString();
}

export class CreateTransactionUseCase {
  constructor(private readonly repository: ITransactionRepository) {}

  async execute(input: CreateTransactionInput): Promise<TransactionDTO> {
    const rawUserId = typeof input.userId === 'string' ? input.userId : '';
    const userId = normalizeUserId(rawUserId);

    if (!userId) {
      throw new Error('User ID is required');
    }

    const createdAt = resolveCreatedAt(
      typeof input.createdAt === 'string' ? input.createdAt : undefined,
    );

    const safeRest = Object.fromEntries(
      Object.entries(input).filter(
        ([key]) => !['userId', 'createdAt', 'id'].includes(key),
      ),
    ) as Record<string, unknown>;

    const transaction: TransactionDTO = {
      ...safeRest,
      userId,
      createdAt,
    };

    const id = await this.repository.create(transaction);

    return {
      ...transaction,
      id,
    };
  }
}
