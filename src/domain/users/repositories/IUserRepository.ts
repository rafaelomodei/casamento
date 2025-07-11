import { UserDTO } from '../entities/UserDTO';

export interface IUserRepository {
  create(user: UserDTO): Promise<void>;
}
