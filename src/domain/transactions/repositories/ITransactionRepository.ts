import { TransactionDTO } from '../entities/TransactionDTO';

export interface FindUserTransactionsOptions {
  limit?: number;
}

export interface ITransactionRepository {
  create(transaction: TransactionDTO): Promise<string>;
  findByUser(
    userId: string,
    options?: FindUserTransactionsOptions,
  ): Promise<TransactionDTO[]>;
  findById(id: string): Promise<TransactionDTO | null>;
}
