export interface ProductDTO {
  id?: string;
  slug: string;
  title: string;
  price: number;
  images: string[];
  description?: string;
  views?: number;
}
