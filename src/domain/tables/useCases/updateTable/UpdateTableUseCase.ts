import { ITableRepository } from '@/domain/tables/repositories/ITableRepository';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';

interface Request {
  id: string;
  name: string;
  memberIds: string[];
  priority?: number;
}

export class UpdateTableUseCase {
  constructor(
    private tableRepository: ITableRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute({ id, name, memberIds, priority }: Request): Promise<void> {
    const existing = await this.tableRepository.findById(id);
    if (!existing) {
      throw new Error('Mesa não encontrada');
    }

    const parsedPriority =
      typeof priority === 'number' && Number.isFinite(priority)
        ? priority
        : existing.priority ?? 0;

    await this.tableRepository.update(id, {
      name,
      memberIds,
      priority: parsedPriority,
    });

    const added = memberIds.filter((memberId) => !existing.memberIds.includes(memberId));
    const removed = existing.memberIds.filter((memberId) => !memberIds.includes(memberId));

    await Promise.all([
      ...added.map((userId) => this.userRepository.update(userId, { tableId: id })),
      ...removed.map((userId) => this.userRepository.update(userId, { tableId: null })),
    ]);
  }
}
