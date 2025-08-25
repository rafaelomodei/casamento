import { IFamilyRepository } from '@/domain/families/repositories/IFamilyRepository';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';

interface Request {
  name: string;
  memberIds: string[];
}

export class CreateFamilyUseCase {
  constructor(
    private familyRepository: IFamilyRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, memberIds }: Request): Promise<string> {
    const createdAt = new Date().toISOString();
    const id = await this.familyRepository.create({
      name,
      memberIds,
      createdAt,
    });

    await Promise.all(
      memberIds.map((uid) => this.userRepository.update(uid, { familyId: id })),
    );

    return id;
  }
}
