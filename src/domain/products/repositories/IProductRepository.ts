import { ProductDTO } from '../entities/ProductDTO';

export interface IProductRepository {
  create(product: ProductDTO): Promise<void>;
  findAll(): Promise<ProductDTO[]>;
  findById(id: string): Promise<ProductDTO | null>;
  update(id: string, product: ProductDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
