import { TableDTO } from '@/domain/tables/entities/TableDTO';
import { ITableRepository } from '@/domain/tables/repositories/ITableRepository';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export class GetTableUseCase {
  constructor(
    private tableRepository: ITableRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<(TableDTO & { members: UserDTO[] }) | null> {
    const table = await this.tableRepository.findById(id);
    if (!table) return null;
    const members = await this.userRepository.findByTableId(id);
    return { ...table, priority: table.priority ?? 0, members };
  }
}
