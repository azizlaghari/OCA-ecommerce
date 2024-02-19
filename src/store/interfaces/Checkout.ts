import { CartProductType } from "./Cart";

export interface AddressType {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

export interface CheckoutType {
  shippingAddress: AddressType;
  billingAddress: AddressType;
  products: Array<CartProductType>;
}
