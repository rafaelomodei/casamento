import { NextResponse } from 'next/server';

import { tableRepository } from '@/infra/repositories/firebase/TableServerFirebaseRepositories';
import { userRepository } from '@/infra/repositories/firebase/UserServerFirebaseRepositories';
import { ListTablesUseCase } from '@/domain/tables/useCases/listTables/ListTablesUseCase';
import { prepareTablesForDisplay } from '@/lib/utlils/tables';
import { buildTablesCsvContent } from '@/lib/csv/tables-csv';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const listTables = new ListTablesUseCase(tableRepository, userRepository);
    const tables = await listTables.execute();

    const { tables: preparedTables } = prepareTablesForDisplay(tables);
    const csv = buildTablesCsvContent(preparedTables);
    const withBom = `\ufeff${csv}`;

    return new NextResponse(withBom, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="organizacao-mesas.csv"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Não foi possível gerar o CSV da organização de mesas.';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
