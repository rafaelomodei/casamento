import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { IProductRepository } from '@/domain/products/repositories/IProductRepository';

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(data: ProductDTO): Promise<void> {
    await this.productRepository.create(data);
  }
}
