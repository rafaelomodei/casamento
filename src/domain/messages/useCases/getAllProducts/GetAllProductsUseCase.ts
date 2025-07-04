import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { IProductRepository } from '@/domain/products/repositories/IProductRepository';

export class GetAllProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(tenant: string): Promise<ProductDTO[]> {
    return this.productRepository.findAll(tenant);
  }
}
