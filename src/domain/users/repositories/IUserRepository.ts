import { UserDTO } from '../entities/UserDTO';

export interface IUserRepository {
  create(user: UserDTO): Promise<string>;
  findById(id: string): Promise<UserDTO | null>;
  findByPhone(phone: string): Promise<UserDTO | null>;
}
