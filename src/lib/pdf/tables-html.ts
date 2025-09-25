import { formatBuffetLabel, getBuffetType } from '@/lib/utlils/buffet';
import { PreparedTable, TablesOverview, TableMemberLike } from '@/lib/utlils/tables';

interface PrintableMemberBase extends TableMemberLike {
  name: string;
  phone: string;
  age?: number;
  respondedAt?: string;
  needsChildChair?: boolean;
}

export type PrintableTable<TMember extends PrintableMemberBase = PrintableMemberBase> =
  PreparedTable<TMember>;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatRespondedAt(date?: string): string {
  if (!date) return '-';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '-';
  return parsed.toLocaleDateString('pt-BR');
}

function formatAttendance(attending?: boolean): string {
  if (attending === undefined) return '-';
  return attending ? 'Sim' : 'Não';
}

function renderTableRows<TMember extends PrintableMemberBase>(
  table: PrintableTable<TMember>,
): string {
  return table.members
    .map((member) => {
      const buffetType = getBuffetType(member.age);
      const buffetLabel = formatBuffetLabel(buffetType);
      const childChairLabel = member.needsChildChair ? 'Sim' : '-';

      return `
        <tr>
          <td>${escapeHtml(member.name)}</td>
          <td>${escapeHtml(buffetLabel)}</td>
          <td>${formatAttendance(member.attending)}</td>
          <td>${formatRespondedAt(member.respondedAt)}</td>
          <td>${childChairLabel}</td>
        </tr>
      `;
    })
    .join('');
}

function renderTableSection<TMember extends PrintableMemberBase>(
  tables: PrintableTable<TMember>[],
): string {
  return tables
    .filter((table) => !table.isVirtual || table.members.length > 0)
    .map((table) => {
      const totalMembers = table.members.length;
      const title = escapeHtml(table.name);
      const subtitle = `${totalMembers} convidado${totalMembers === 1 ? '' : 's'}`;
      const tableClass = table.isVirtual ? 'table-card virtual' : 'table-card';

      return `
        <section class="${tableClass}">
          <header class="table-header">
            <div>
              <h2>${title}</h2>
              <p>${escapeHtml(subtitle)}</p>
            </div>
          </header>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Buffet</th>
                <th>Presença</th>
                <th>Última resposta</th>
                <th>Cadeira infantil</th>
              </tr>
            </thead>
            <tbody>
              ${renderTableRows(table)}
            </tbody>
          </table>
        </section>
      `;
    })
    .join('');
}

export function buildTablesPdfHtml<TMember extends PrintableMemberBase>(
  tables: PrintableTable<TMember>[],
  overview: TablesOverview,
  generatedAt: Date,
): string {
  const generatedLabel = generatedAt.toLocaleString('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Organização de mesas</title>
    <style>
      @page {
        size: A4;
        margin: 16mm;
      }

      :root {
        color-scheme: light;
        font-family: 'Arial', sans-serif;
      }

      body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        color: #1c1917;
      }

      .print-surface {
        padding: 16px 0 24px;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      header.page-header {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-bottom: 2px solid #e2d6c2;
        padding-bottom: 12px;
      }

      header.page-header h1 {
        font-size: 24px;
        margin: 0;
      }

      header.page-header p {
        margin: 0;
        color: #6f4735;
        font-size: 14px;
      }

      .overview-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 12px;
      }

      .overview-card {
        border: 1px solid #e2d6c2;
        padding: 12px;
        border-radius: 8px;
        background: #fcf7eb;
      }

      .overview-card h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: #6f4735;
      }

      .overview-card p {
        margin: 4px 0 0;
        font-size: 18px;
        font-weight: 600;
      }

      .table-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .table-card {
        border: 1px solid #e2d6c2;
        border-radius: 8px;
        padding: 12px;
        background: #ffffff;
        page-break-inside: avoid;
      }

      .table-card.virtual {
        background: #f9f2e6;
        border-style: dashed;
      }

      .table-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }

      .table-header h2 {
        margin: 0;
        font-size: 18px;
      }

      .table-header p {
        margin: 4px 0 0;
        color: #6b7280;
        font-size: 12px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }

      th,
      td {
        padding: 6px;
        border-top: 1px solid #f3ece2;
        text-align: left;
      }

      thead th {
        background: #f6eddf;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="print-surface">
      <header class="page-header">
        <h1>Organização de mesas</h1>
        <p>Gerado em ${escapeHtml(generatedLabel)}</p>
      </header>
      <section class="overview-grid">
        <div class="overview-card">
          <h3>Total de mesas</h3>
          <p>${overview.totalTables}</p>
        </div>
        <div class="overview-card">
          <h3>Convidados alocados</h3>
          <p>${overview.totalGuests}</p>
        </div>
        <div class="overview-card">
          <h3>Pagantes</h3>
          <p>${overview.payingGuests}</p>
        </div>
        <div class="overview-card">
          <h3>Não pagantes</h3>
          <p>${overview.nonPayingGuests}</p>
        </div>
        <div class="overview-card">
          <h3>Sem mesa</h3>
          <p>${overview.unassignedGuests}</p>
        </div>
      </section>
      <div class="table-list">
        ${renderTableSection(tables)}
      </div>
    </div>
  </body>
</html>`;
}
