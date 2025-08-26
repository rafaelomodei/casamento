import { IUserRepository } from '@/domain/users/repositories/IUserRepository';
import { UserDTO } from '@/domain/users/entities/UserDTO';

export class SearchUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(term: string): Promise<UserDTO[]> {
    return this.userRepository.search(term);
  }
}
