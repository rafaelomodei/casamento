import { UserDTO } from '../entities/UserDTO';

export interface IUserRepository {
  create(user: UserDTO): Promise<void>;
  findById(id: string): Promise<UserDTO | null>;
}
