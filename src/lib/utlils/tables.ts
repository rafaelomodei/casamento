import { getBuffetType } from '@/lib/utlils/buffet';

export interface TableMemberLike {
  id?: string;
  attending?: boolean;
  tableId?: string | null;
  needsChildChair?: boolean;
  age?: number;
}

export interface TableWithMembers<TMember extends TableMemberLike = TableMemberLike> {
  id?: string;
  name: string;
  members: TMember[];
  priority?: number | null;
}

export interface PreparedTable<TMember extends TableMemberLike = TableMemberLike>
  extends TableWithMembers<TMember> {
  id: string;
  priority: number;
  isVirtual: boolean;
}

export interface TablesOverview {
  totalTables: number;
  totalGuests: number;
  unassignedGuests: number;
  payingGuests: number;
  nonPayingGuests: number;
}

export function prepareTablesForDisplay<TMember extends TableMemberLike>(
  tables: TableWithMembers<TMember>[],
): { tables: PreparedTable<TMember>[]; overview: TablesOverview } {
  const mapped = tables.map((table) => {
    const tableId = table.id ?? '';
    const isVirtual = tableId === '__no_table__';

    const members = isVirtual
      ? table.members.filter((member) => member.attending !== false)
      : table.members;

    const rawPriority = isVirtual ? Number.NEGATIVE_INFINITY : table.priority ?? 0;
    const parsedPriority = Number(rawPriority);
    const normalizedPriority = Number.isFinite(parsedPriority)
      ? parsedPriority
      : Number(rawPriority) || 0;

    return {
      ...table,
      id: tableId,
      members,
      priority: normalizedPriority,
      isVirtual,
    };
  });

  const virtualTable = mapped.find((table) => table.isVirtual);
  const realTables = mapped
    .filter((table) => !table.isVirtual)
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  const orderedTables = virtualTable ? [virtualTable, ...realTables] : realTables;

  const realTableGuests = realTables.reduce<TMember[]>(
    (acc, table) => acc.concat(table.members),
    [],
  );
  const virtualGuests = virtualTable?.members ?? [];
  const allGuests = realTableGuests.concat(virtualGuests);

  const payingGuests = allGuests.reduce((acc, member) => {
    return getBuffetType(member.age) !== 'free' ? acc + 1 : acc;
  }, 0);

  const nonPayingGuests = allGuests.length - payingGuests;

  const overview: TablesOverview = {
    totalTables: realTables.length,
    totalGuests: realTables.reduce((acc, table) => acc + table.members.length, 0),
    unassignedGuests: virtualTable?.members.length ?? 0,
    payingGuests,
    nonPayingGuests,
  };

  return { tables: orderedTables, overview };
}
