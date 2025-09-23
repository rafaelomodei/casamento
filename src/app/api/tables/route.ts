import { NextResponse } from 'next/server';

import { tableRepository } from '@/infra/repositories/firebase/TableServerFirebaseRepositories';
import { userRepository } from '@/infra/repositories/firebase/UserServerFirebaseRepositories';
import { CreateTableUseCase } from '@/domain/tables/useCases/createTable/CreateTableUseCase';
import { ListTablesUseCase } from '@/domain/tables/useCases/listTables/ListTablesUseCase';
import { GetTableUseCase } from '@/domain/tables/useCases/getTable/GetTableUseCase';
import { UpdateTableUseCase } from '@/domain/tables/useCases/updateTable/UpdateTableUseCase';
import { DeleteTableUseCase } from '@/domain/tables/useCases/deleteTable/DeleteTableUseCase';

const ADMIN_PHONE = '45991156286';

function isAuthorized(req: Request) {
  const phone = req.headers.get('x-user-phone')?.replace(/\D/g, '');
  return phone === ADMIN_PHONE;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const getTable = new GetTableUseCase(tableRepository, userRepository);
      const table = await getTable.execute(id);

      if (!table) {
        return NextResponse.json(
          { error: 'Mesa não encontrada' },
          { status: 404 },
        );
      }

      return NextResponse.json(table, { status: 200 });
    }

    const listTables = new ListTablesUseCase(tableRepository, userRepository);
    const tables = await listTables.execute();
    return NextResponse.json(tables, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { name, memberIds, priority } = (await req.json()) as {
      name: string;
      memberIds: string[];
      priority?: number;
    };

    const createTable = new CreateTableUseCase(tableRepository, userRepository);
    const parsedPriority = Number(priority);
    const normalizedPriority = Number.isFinite(parsedPriority)
      ? parsedPriority
      : 0;

    const id = await createTable.execute({ name, memberIds, priority: normalizedPriority });

    return NextResponse.json({ id, name, memberIds, priority: normalizedPriority }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id, name, memberIds, priority } = (await req.json()) as {
      id: string;
      name: string;
      memberIds: string[];
      priority?: number;
    };

    const updateTable = new UpdateTableUseCase(tableRepository, userRepository);
    const parsedPriority = Number(priority);
    const normalizedPriority = Number.isFinite(parsedPriority)
      ? parsedPriority
      : undefined;

    await updateTable.execute({ id, name, memberIds, priority: normalizedPriority });

    return NextResponse.json(
      {
        id,
        name,
        memberIds,
        priority: normalizedPriority,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });
    }

    const deleteTable = new DeleteTableUseCase(tableRepository, userRepository);
    await deleteTable.execute(id);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 },
    );
  }
}
