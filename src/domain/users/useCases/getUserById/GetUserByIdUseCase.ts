import { UserDTO } from '@/domain/users/entities/UserDTO';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserDTO | null> {
    return this.userRepository.findById(id);
  }
}
