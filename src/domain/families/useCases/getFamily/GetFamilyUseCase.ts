import { IFamilyRepository } from '@/domain/families/repositories/IFamilyRepository';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';
import { FamilyDTO } from '@/domain/families/entities/FamilyDTO';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export class GetFamilyUseCase {
  constructor(
    private familyRepository: IFamilyRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<(FamilyDTO & { members: UserDTO[] }) | null> {
    const family = await this.familyRepository.findById(id);
    if (!family) return null;
    const members = await this.userRepository.findByFamilyId(id);
    return { ...family, members };
  }
}
