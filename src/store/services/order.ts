import { notification } from "antd";
import { privateAPI } from "../../config/constants";
import store from "..";
import { setCart } from "../slices/cartSlice";
import { setLoading, setOrderHistory } from "../slices/settingSlice";
import { getUser } from "./auth";
import { CheckoutType } from "../interfaces/Checkout";

export const createOrder = async (payload: CheckoutType) => {
  try {
    const response = await privateAPI.post("/order/create", payload);
    notification.success({
      message: response?.data?.data?.message || "Order placed successfully",
      duration: 3,
    });
    store.dispatch(setCart([]));
    getUser();
    return response.data.data;
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
      duration: 3,
    });
  }
};

export const getOrderHistory = async () => {
  try {
    store.dispatch(setLoading(true));
    const response = await privateAPI.get("/order/get-all");
    if (response) {
      store.dispatch(setOrderHistory(response?.data?.data));
    }
    return response.data.data;
  } catch (error: any) {
    notification.error({
      message: error?.response?.data?.message,
      duration: 3,
    });
  } finally {
    store.dispatch(setLoading(false));
  }
};
