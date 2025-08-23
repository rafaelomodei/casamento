export interface ProductDTO {
  id?: string;
  slug: string;
  title: string;
  price: number;
  images: string[];
  description?: string;
  views?: number;
  /**
   * Status do produto.
   * Quando um presente é comprado, ele deve receber o status 'gifted'.
   */
  status?: 'available' | 'gifted';
  /**
   * ID do usuário que presenteou este produto.
   */
  giftedBy?: string;
}
