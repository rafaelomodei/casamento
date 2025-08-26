import { FamilyDTO } from '../entities/FamilyDTO';

export interface IFamilyRepository {
  create(family: FamilyDTO): Promise<string>;
  addMember(familyId: string, userId: string): Promise<void>;
  findById(id: string): Promise<FamilyDTO | null>;
  list(): Promise<FamilyDTO[]>;
  update(id: string, data: Partial<FamilyDTO>): Promise<void>;
}
