import { UserDTO } from '../entities/UserDTO';

export interface IUserRepository {
  create(user: UserDTO): Promise<string>;
  findById(id: string): Promise<UserDTO | null>;
  findByPhone(phone: string): Promise<UserDTO | null>;
  findByFamilyId(familyId: string): Promise<UserDTO[]>;
  search(term: string): Promise<UserDTO[]>;
  update(id: string, data: Partial<UserDTO>): Promise<void>;
}
