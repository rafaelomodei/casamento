import { formatBuffetLabel, getBuffetType } from '@/lib/utlils/buffet';
import { PreparedTable, TableMemberLike } from '@/lib/utlils/tables';

interface CsvMemberBase extends TableMemberLike {
  name: string;
  age?: number;
  respondedAt?: string;
  needsChildChair?: boolean;
}

export type CsvTable<TMember extends CsvMemberBase = CsvMemberBase> = PreparedTable<TMember>;

const HEADERS = [
  'Mesa',
  'Convidado',
  'Buffet',
  'Presença',
  'Última resposta',
  'Cadeira infantil',
];

function escapeCsv(value: string): string {
  const needsEscaping = /[";\n\r]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsEscaping ? `"${escaped}"` : escaped;
}

function formatAttendance(attending?: boolean): string {
  if (attending === undefined) return '-';
  return attending ? 'Sim' : 'Não';
}

function formatChildChairFlag(needsChildChair?: boolean): string {
  return needsChildChair ? 'Sim' : '-';
}

function formatRespondedAt(date?: string): string {
  if (!date) return '-';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '-';
  return parsed.toLocaleDateString('pt-BR');
}

function formatRow(values: string[]): string {
  return values.map((value) => escapeCsv(value)).join(';');
}

export function buildTablesCsvContent<TMember extends CsvMemberBase>(
  tables: CsvTable<TMember>[],
): string {
  const rows: string[] = [];
  rows.push(HEADERS.join(';'));

  tables.forEach((table) => {
    if (table.isVirtual && table.members.length === 0) {
      return;
    }

    table.members.forEach((member) => {
      const buffetType = getBuffetType(member.age);
      const buffetLabel = formatBuffetLabel(buffetType);

      rows.push(
        formatRow([
          table.name,
          member.name,
          buffetLabel,
          formatAttendance(member.attending),
          formatRespondedAt(member.respondedAt),
          formatChildChairFlag(member.needsChildChair),
        ]),
      );
    });
  });

  return `${rows.join('\r\n')}\r\n`;
}
