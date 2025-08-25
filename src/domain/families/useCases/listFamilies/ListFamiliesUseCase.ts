import { IFamilyRepository } from '@/domain/families/repositories/IFamilyRepository';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';
import { FamilyDTO } from '@/domain/families/entities/FamilyDTO';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export class ListFamiliesUseCase {
  constructor(
    private familyRepository: IFamilyRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<(FamilyDTO & { members: UserDTO[] })[]> {
    const families = await this.familyRepository.list();
    return Promise.all(
      families.map(async (f) => ({
        ...f,
        members: await this.userRepository.findByFamilyId(f.id!),
      })),
    );
  }
}
