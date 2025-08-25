import { UserDTO } from '@/domain/users/entities/UserDTO';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UserDTO): Promise<string> {
    return this.userRepository.create(data);
  }
}
