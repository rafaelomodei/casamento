import { TableDTO } from '@/domain/tables/entities/TableDTO';
import { ITableRepository } from '@/domain/tables/repositories/ITableRepository';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export class ListTablesUseCase {
  constructor(
    private tableRepository: ITableRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<(TableDTO & { members: UserDTO[] })[]> {
    const tables = await this.tableRepository.list();
    const tablesWithMembers = await Promise.all(
      tables.map(async (table) => ({
        ...table,
        priority: table.priority ?? 0,
        members: await this.userRepository.findByTableId(table.id!),
      })),
    );

    tablesWithMembers.sort(
      (a, b) => (b.priority ?? 0) - (a.priority ?? 0),
    );

    const allUsers = await this.userRepository.search('');
    const noTableMembers = allUsers.filter((user) => !user.tableId);

    if (noTableMembers.length) {
      const memberIds = noTableMembers
        .map((user) => user.id)
        .filter((id): id is string => Boolean(id));

      tablesWithMembers.push({
        id: '__no_table__',
        name: 'Não estão associados a uma mesa',
        memberIds,
        createdAt: new Date().toISOString(),
        priority: Number.NEGATIVE_INFINITY,
        members: noTableMembers,
      });
    }

    return tablesWithMembers;
  }
}
