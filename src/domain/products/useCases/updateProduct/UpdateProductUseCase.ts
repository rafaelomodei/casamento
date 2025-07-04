import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { IProductRepository } from '@/domain/products/repositories/IProductRepository';

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string, data: ProductDTO): Promise<void> {
    await this.productRepository.update(id, data);
  }
}
