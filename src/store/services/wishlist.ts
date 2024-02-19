import { notification } from "antd";
import { privateAPI } from "../../config/constants";
import store from "../../store";
import { setLoading, setWishlist } from "../slices/wishlistSlice";
import { getUser } from "./auth";
import { AddToWishlist } from "../interfaces/Wishlist";

export const createWishlist = async (payload: AddToWishlist) => {
  try {
    const response = await privateAPI.post("/wishlist/create", payload);
    if (response?.status === 200) {
      getWishlist();
      getUser();
      return response?.data?.data;
    }
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};

export const getWishlist = async () => {
  try {
    store.dispatch(setLoading(true));
    const response = await privateAPI.get("/wishlist/get-all");
    if (response) {
      store.dispatch(setLoading(false));
      store.dispatch(setWishlist(response?.data?.data));
    }
    return response?.data?.data;
  } catch (error: any) {

    notification.error({
      message: error?.response?.data?.message,
    });
  }
};

export const deleteWishlist = async (
  wishlistId: string,
  productId?: string
) => {
  try {
    const payload = {
      _id: wishlistId,
      productId: productId,
    };
    const response = await privateAPI.post(`/wishlist/delete-user`, payload);
    if (response) {
      await getWishlist();
      await getUser();
    }
    return response.data.data;
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};
