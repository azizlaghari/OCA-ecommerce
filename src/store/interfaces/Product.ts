export interface ColorType {
  hex: string;
  stock: number;
  points: number;
  urls?: string[]; // You might want to specify the type of URLs
  _id: string;
}

export interface VariationType {
  size: string;
  colors: ColorType[];
  _id: string;
}

export interface ProductType {
  _id: string;
  imagesUrl: string[];
  name: string;
  description: string;
  category: string;
  stock: number;
  points: number;
  productType: string;
  urls: string[];
  variations?: VariationType[];
  reviews: any[]; // You may need to define a specific interface for reviews
  createdAt: string;
  updatedAt: string;
  deliveryFee: number;
  __v: number;
}

export interface CategoryWiseProductsType {
  category?: string | undefined;
  products: Array<ProductType>;
  description?: string;
}

export interface ProductColorType {
  hex: string;
  stock: string;
  points: string;
  _id?: string;
}

export interface ProductVariationsType {
  size: String;
  colors: Array<ProductColorType>;
  _id?: string;
}
