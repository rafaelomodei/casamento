import { NextResponse } from 'next/server';

import { GetTransactionByIdUseCase } from '@/domain/transactions/useCases/getTransactionById/GetTransactionByIdUseCase';
import { transactionRepository } from '@/infra/repositories/firebase/TransactionServerFirebaseRepositories';

import {
  extractErrorMessage,
  mapTransactionErrorToStatus,
} from '../error-map';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId obrigatório' }, { status: 400 });
    }

    const getTransaction = new GetTransactionByIdUseCase(transactionRepository);
    const transaction = await getTransaction.execute({ id, userId });

    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    const status = mapTransactionErrorToStatus(error);
    const message = extractErrorMessage(error);
    return NextResponse.json({ error: message }, { status });
  }
}
