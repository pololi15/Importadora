export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price_b2c: number;
  price_b2b?: number;
  stock: number;
  image_url?: string;
  is_active: boolean;
  sku?: string;
}
