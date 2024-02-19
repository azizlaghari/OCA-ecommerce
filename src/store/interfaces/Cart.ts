import { ProductType } from "./Product";

export interface CartProductType {
  points?: number;
  color?: string;
  product: ProductType;
  quantity: number;
  size?: number;
  _id?: string;
  variations?: VariationType[];

}

export interface VariationType {
  size: string;
  colors: ColorType[];
  _id: string;
}
export interface ColorType {
  hex: string;
  stock: number;
  points: number;
  urls?: string[]; // You might want to specify the type of URLs
  _id: string;
}

export interface CartDataType {
  products: Array<CartProductType>;
  user: string;
  updatedAt: Date;
  createdAt: Date;
  _id: string;
}

export interface CartStateType {
  loading: boolean;
  singleLoading: boolean;
  cart: Array<CartDataType>;
}

export interface AddToCart {
  _id?: string;
  productId?: string;
  points?: number;
  color?: string;
  product?: string;
  quantity: number;
  size?: string | number | undefined;
}
