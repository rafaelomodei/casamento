import { IUserRepository } from '@/domain/users/repositories/IUserRepository';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export class GetUsersByFamilyIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(familyId: string): Promise<UserDTO[]> {
    return this.userRepository.findByFamilyId(familyId);
  }
}
