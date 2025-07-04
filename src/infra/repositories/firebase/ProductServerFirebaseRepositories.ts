import { IProductRepository } from '@/domain/products/repositories/IProductRepository';
import { FirebaseRepository } from '@/domain/products/repositories/repository/firebase/FirebaseRepository';

export const productRepository: IProductRepository = new FirebaseRepository();
