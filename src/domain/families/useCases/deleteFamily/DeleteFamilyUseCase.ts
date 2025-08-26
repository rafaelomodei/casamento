import { IFamilyRepository } from '@/domain/families/repositories/IFamilyRepository';

export class DeleteFamilyUseCase {
  constructor(private familyRepository: IFamilyRepository) {}

  async execute(id: string): Promise<void> {
    await this.familyRepository.delete(id);
  }
}
