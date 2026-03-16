export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category?: string;
  subcategory?: string;
  description?: string;
  details?: string[];
  sizes?: string[];
  colors?: ProductColor[];
  imageUrl: string;
  secondaryImageUrl?: string;
  galleryImages?: string[];
  tags?: string[];
  inStock?: boolean;
  sku?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
