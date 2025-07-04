import { ProductDTO } from '../entities/ProductDTO';

export interface IProductRepository {
  create(product: ProductDTO): Promise<void>;
  findAll(tenant: string): Promise<ProductDTO[]>;
  findById(id: string, tenant: string): Promise<ProductDTO | null>;
  findBySlug(slug: string, tenant: string): Promise<ProductDTO | null>;
}
