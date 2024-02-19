import store from "..";
import { privateAPI } from "../../config/constants";
import { notification } from "antd";
import {
  setCategories,
  setSingleProduct,
  setLoading,
} from "../slices/productSlice";
// import store from "../../store";

export const getProduct = async () => {
  try {
    store.dispatch(setLoading(true));
    const response = await privateAPI.get(`product/get-product-by-category`);
    if (response?.status === 200) {
      store.dispatch(setLoading(false));
      store.dispatch(setCategories(response?.data?.data?.result));
    }
    return response.data.data;
  } catch (error: any) {
    store.dispatch(setLoading(false));
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};

export const getSingleProduct = async (id: string) => {
  try {
    store.dispatch(setLoading(true));
    const response = await privateAPI.get(
      `product/userProduct-get-one?productId=${id}`
    );
    if (response?.status === 200) {
      store.dispatch(setLoading(false));
      store.dispatch(setSingleProduct(response?.data?.data));
    }
    return response.data.data;
  } catch (error: any) {
    store.dispatch(setLoading(false));
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};
export const filterProducts = async (payload: any) => {
  try {
    const response = await privateAPI.post('/product/search', payload)
    if (response) {
      return response?.data?.data;
    }
  } catch (error: any) {
    store.dispatch(setLoading(false));
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};
export const getRecommendationProducts = async () => {
  try {
    const recommned = await privateAPI.get(
      "/product/get-just-for-you-products"
    );
    if (recommned) {
    }
    return recommned.data.data;
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};
export const getWeeklySellingProducts = async () => {
  try {
    const weekly = await privateAPI.get("/product/get-weekly-selling-products");
    if (weekly) {
    }
    return weekly.data.data;
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
    });
  }
};
