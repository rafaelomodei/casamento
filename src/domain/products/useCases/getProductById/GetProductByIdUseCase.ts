import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { IProductRepository } from '@/domain/products/repositories/IProductRepository';

export class GetProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<ProductDTO | null> {
    return this.productRepository.findById(id);
  }
}
