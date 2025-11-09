import { NextResponse } from 'next/server';

import { CreateTransactionUseCase } from '@/domain/transactions/useCases/createTransaction/CreateTransactionUseCase';
import { ListTransactionsByUserUseCase } from '@/domain/transactions/useCases/listTransactionsByUser/ListTransactionsByUserUseCase';
import { transactionRepository } from '@/infra/repositories/firebase/TransactionServerFirebaseRepositories';

import {
  extractErrorMessage,
  mapTransactionErrorToStatus,
} from './error-map';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const limitParam = searchParams.get('limit');

    if (!userId) {
      return NextResponse.json({ error: 'userId obrigatório' }, { status: 400 });
    }

    const limit = limitParam ? Number(limitParam) : undefined;
    const listTransactions = new ListTransactionsByUserUseCase(transactionRepository);
    const transactions = await listTransactions.execute({ userId, limit });

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    const status = mapTransactionErrorToStatus(error);
    const message = extractErrorMessage(error);
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const createTransaction = new CreateTransactionUseCase(transactionRepository);
    const transaction = await createTransaction.execute(payload);

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    const status = mapTransactionErrorToStatus(error);
    const message = extractErrorMessage(error);
    return NextResponse.json({ error: message }, { status });
  }
}
