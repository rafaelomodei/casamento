import { ITableRepository } from '@/domain/tables/repositories/ITableRepository';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';

interface Request {
  name: string;
  memberIds: string[];
  priority?: number;
}

export class CreateTableUseCase {
  constructor(
    private tableRepository: ITableRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, memberIds, priority }: Request): Promise<string> {
    const createdAt = new Date().toISOString();
    const normalizedPriority =
      typeof priority === 'number' && Number.isFinite(priority) ? priority : 0;
    const id = await this.tableRepository.create({
      name,
      memberIds,
      createdAt,
      priority: normalizedPriority,
    });

    await Promise.all(
      memberIds.map((userId) =>
        this.userRepository.update(userId, { tableId: id }),
      ),
    );

    return id;
  }
}
