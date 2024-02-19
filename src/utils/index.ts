import store from "../store";
import { CartProductType } from "../store/interfaces/Cart";
import { ColorType, VariationType } from "../store/interfaces/Product";

export const firstLetterCap = (str: string) => {
  return str ? str[0].toUpperCase() + str.slice(1) : str;
};

export const maskEmail = (email: string) => {
  const [localPart, domain] = email?.split("@");
  const maskedLocalPart =
    localPart.length <= 6
      ? "*".repeat(localPart.length - 1) + localPart.slice(-1)
      : localPart.substring(0, 3) + "*".repeat(localPart.length - 7);

  const maskedEmail = `${maskedLocalPart}@${domain}`;
  return maskedEmail;
};

export const getToken = () => localStorage.getItem("token");
export const isAuthenticated = () => localStorage.getItem("token");

export const getPoints = (data: Array<CartProductType>) => {
  let totalPoints = 0;
  data?.forEach((cart: CartProductType) => {
    const variations = cart?.product?.variations;
    if (variations && variations?.length > 0) {
      variations?.forEach((v: VariationType) => {
        if (String(v?._id) === String(cart?.size)) {
          v?.colors?.forEach((x: ColorType) => {
            if (x?._id === cart?.color) {
              totalPoints += Number(x?.points) * Number(cart?.quantity);
            }
          });
        }
      });
    } else {
      totalPoints += Number(cart?.product?.points) * Number(cart?.quantity);
    }
  });
  return totalPoints;
};

export const getDeliveryFee = (data: Array<CartProductType>) => {
  let total = 0;
  const setting = store?.getState()?.settings?.settings;
  const globalDelivery = setting?.deliveryFee ? setting?.deliveryFee : 0;
  data?.forEach((v: CartProductType) => {
    total += v?.product?.deliveryFee;
  });
  return total + globalDelivery;
};
