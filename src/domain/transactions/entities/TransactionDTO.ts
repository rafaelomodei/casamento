export interface TransactionDTO {
  id?: string;
  userId: string;
  createdAt: string;
  [key: string]: unknown;
}
