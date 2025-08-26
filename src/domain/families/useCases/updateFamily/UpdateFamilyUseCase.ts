import { IFamilyRepository } from '@/domain/families/repositories/IFamilyRepository';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';

interface Request {
  id: string;
  name: string;
  memberIds: string[];
}

export class UpdateFamilyUseCase {
  constructor(
    private familyRepository: IFamilyRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute({ id, name, memberIds }: Request): Promise<void> {
    const existing = await this.familyRepository.findById(id);
    if (!existing) {
      throw new Error('Família não encontrada');
    }

    await this.familyRepository.update(id, { name, memberIds });

    const added = memberIds.filter((m) => !existing.memberIds.includes(m));
    const removed = existing.memberIds.filter((m) => !memberIds.includes(m));

    await Promise.all([
      ...added.map((uid) => this.userRepository.update(uid, { familyId: id })),
      ...removed.map((uid) => this.userRepository.update(uid, { familyId: null })),
    ]);
  }
}
