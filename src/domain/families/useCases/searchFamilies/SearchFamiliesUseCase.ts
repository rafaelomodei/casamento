import { IFamilyRepository } from '@/domain/families/repositories/IFamilyRepository';
import { FamilyDTO } from '@/domain/families/entities/FamilyDTO';

export class SearchFamiliesUseCase {
  constructor(private familyRepository: IFamilyRepository) {}

  async execute(term: string): Promise<FamilyDTO[]> {
    const families = await this.familyRepository.list();
    const lower = term.toLowerCase();
    return families.filter((f) => f.name.toLowerCase().includes(lower));
  }
}
