import store from "../../store";
import { privateAPI } from "../../config/constants";
import { notification } from "antd";
import { setCart, setLoading, setSingleLoading } from "../slices/cartSlice";
import { getUser } from "./auth";
import { AddToCart } from "../interfaces/Cart";
import { ProductType } from "../interfaces/Product";

export const createCart = async (payload: AddToCart) => {
  try {
    store.dispatch(setSingleLoading(true));
    const response = await privateAPI.post("/cart/create", payload);
    if (response) {
      store.dispatch(setSingleLoading(false));
      getUser();
      getCart();
      return response?.data?.data;
    }
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
    });
  } finally {
    store.dispatch(setSingleLoading(false));
  }
};

export const getCart = async () => {
  try {
    const response = await privateAPI.get("/cart/get-all");
    if (response) {
      const products = response?.data?.data[0]?.products;

      let updatedProducts = [];
      if (products?.length > 0) {
        updatedProducts = await Promise.all(
          products.map(async (v: any) => {
            if (v?.size) {
              const isSize = v?.product?.variations?.find(
                (variant: any) => variant?._id === v?.size
              );
              const isColor = isSize?.colors?.find(
                (variant: any) => variant?._id === v?.color
              );
              if (!isSize) {
                await deleteCart(response?.data?.data[0]?._id, v?.size);
                return null;
              } else if (isSize && !isColor) {
                await deleteCart(response?.data?.data[0]?._id, v?.color);
                return null;
              }
            }
            return v;
          })
        );
      }

      const filteredProducts = updatedProducts.filter(
        (product: any) => product !== null
      );
      const updatedCartData = {
        ...response?.data?.data[0],
        products: filteredProducts,
      };
      console.log(response?.data?.data);
      store.dispatch(
        setCart(
          response?.data?.data?.length > 0
            ? [updatedCartData]
            : response?.data?.data?.[0]
        )
      );
      return response.data.data;
    }
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};

export const deleteCart = async (cartId: string, productId?: string) => {
  try {
    const payload = {
      _id: cartId,
      productId: productId,
    };
    const response = await privateAPI.post(`/cart/delete-user`, payload);
    if (response) {
      await getCart();
      await getUser();
    }
    return response.data.data;
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};

export const updateCart = async (payload: AddToCart) => {
  try {
    store.dispatch(setLoading(true));
    const response = await privateAPI.put("/cart/update", payload);
    if (response?.data?.success) {
      store.dispatch(setLoading(false));
      getUser();
      getCart();
      return response.data.data;
    }
  } catch (error: any) {
    store.dispatch(setLoading(false));
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};
