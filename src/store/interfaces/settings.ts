import { User } from "./Auth";
import { AddressType } from "./Checkout";
import { ProductType } from "./Product";

export interface SettingsType {
  _id: string;
  deliveryFee: number;
  updatedAt: Date;
  createdAt: Date;
}
export interface SettingState {
  loading: boolean;
  settings: SettingsType | null;
  orderHistory: Array<OrderHistoryType>;
  shareHistory: Array<ShareHistoryType>;
}

export interface PriceInformationType {
  subtotal: number;
  discount: number;
  total: number;
}

export interface OrderProductType {
  size?: string;
  color?: string;
  _id: string;
  quantity: number;
  product: ProductType;
}

export interface OrderHistoryType {
  _id: string;
  user: User;
  shippingAddress: AddressType;
  billingAddress: AddressType;
  products: OrderProductType;
  priceInformation: PriceInformationType;
  orderStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SharedUser {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}
export interface ShareHistoryType {
  _id: string;
  sharedBy: SharedUser;
  sharedTo: SharedUser;
  pointsShared: number;
  timestamp: Date;
}
