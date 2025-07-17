export interface ProductDTO {
  id?: string;
  slug: string;
  title: string;
  price: number;
  images: string[];
  description?: string;
  views?: number;
  /** ID do produto cadastrado no InfinityPay */
  infinityPayProductId?: string;
  /** URL do checkout do InfinityPay para este produto */
  checkoutUrl?: string;
  /**
   * Status do produto.
   * Quando um presente é comprado, ele deve receber o status 'gifted'.
   */
  status?: 'available' | 'gifted';
}
