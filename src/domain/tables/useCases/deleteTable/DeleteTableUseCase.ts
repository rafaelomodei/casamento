import { ITableRepository } from '@/domain/tables/repositories/ITableRepository';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';

export class DeleteTableUseCase {
  constructor(
    private tableRepository: ITableRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const table = await this.tableRepository.findById(id);
    await this.tableRepository.delete(id);

    if (!table) return;

    await Promise.all(
      table.memberIds.map((userId) =>
        this.userRepository.update(userId, { tableId: null }),
      ),
    );
  }
}
