import { UserDTO } from '@/domain/users/entities/UserDTO';
import { IUserRepository } from '@/domain/users/repositories/IUserRepository';

export class GetUserByPhoneUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(phone: string): Promise<UserDTO | null> {
    return this.userRepository.findByPhone(phone);
  }
}
