import { ProductType } from "./Product";

export interface CartProductType {
  points?: number;
  color?: string;
  product: ProductType;
  quantity: number;
  size?: number;
  _id?: string;
}

export interface CartDataType {
  products: Array<CartProductType>;
  user: string;
  updatedAt: Date;
  createdAt: Date;
  _id: string;
}

export interface WishlistStateType {
  loading: boolean;
  wishlist: CartDataType | null;
}

export interface AddToWishlist {
  _id?: string;
  productId?: string;
  points?: number;
  color?: string;
  product?: string;
  quantity: number;
  size?: string | number | undefined;
}
