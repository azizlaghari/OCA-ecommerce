import { privateAPI, publicAPI } from "../../config/constants";
import { notification } from "antd";
import store from "../../store";

import {
  CreatePasswordType,
  LoginType,
  ResetPassType,
  SignupType,
  UpdatePassType,
  UpdateUserType,
  verifyEmailType,
} from "../interfaces/Auth";

import { clearUser, setUser } from "../slices/authSlice";

const handleError = (error: any) => {
  notification.error({
    message: error?.response?.data?.message || "Server Error",
  });
};

export const login = async (payload: LoginType) => {
  try {
    const response = await publicAPI.post("/auth/login", payload);
    const unverified = response?.data?.data?.message === "Unverified";
    if (unverified) {
      const isToken = await requestEmailToken(payload.email);
      if (isToken) {
        return "unverified";
      }
    } else {
      store.dispatch(setUser(response?.data?.data));
      localStorage.setItem("token", response?.data?.data?.token);
      localStorage.setItem("userId", response?.data?.data?.user?._id);
      return "verified";
    }
  } catch (error: any) {
    handleError(error);
  }
};

export const register = async (payload: SignupType) => {
  try {
    const response = await publicAPI.post("/auth/register", payload);
    console.log('response :', response);
    
    if (response) {
      const isEmailVerified = await requestEmailToken(payload?.email);
      return isEmailVerified;
    }
  } catch (error: any) {
    handleError(error);
  }
};

export const forgotPassword = async (payload: String) => {
  try {
    const response = await publicAPI.post("/auth/forgotPassword", {
      email: payload,
    });
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const resetPassword = async (payload: ResetPassType) => {
  try {
    const response = await publicAPI.post("/auth/resetPassword", payload);
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const requestEmailToken = async (payload: String) => {
  try {
    const response = await publicAPI.post("/auth/requestEmailToken", {
      email: payload,
    });
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const verifyEmail = async (payload: verifyEmailType) => {
  try {
    const response = await publicAPI.post("/auth/verifyEmail", payload);
    notification.success({
      message: response?.data?.data,
    });
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const createPassword = async (payload: CreatePasswordType) => {
  try {
    const response = await publicAPI.post("/auth/createPassword", payload);
    notification.success({
      message: response?.data?.data,
    });
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const getUser = async () => {
  try {
    if (localStorage.getItem("token")) {
      const response = await privateAPI.get("/auth/getuser");
      store.dispatch(setUser(response?.data?.data));
      localStorage.setItem("token", response?.data?.data?.token);
      localStorage.setItem("userId", response?.data?.data?.user?._id);
      return response;
    }
    return null;
  } catch (error: any) {
    handleError(error);
  }
};

export const updateUser = async (payload: UpdateUserType) => {
  try {
    const response = await privateAPI.post("/auth/update", payload);
    if (response) {
      notification.success({
        message: response?.data?.data?.message || "User updated successfully.",
      });
      await getUser();
    }
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const updatePassword = async (payload: UpdatePassType) => {
  try {
    const response = await privateAPI.post("/auth/updatepassword", payload);
    if (response) {
      notification.success({
        message:
          response?.data?.data?.message || "Password updated successfully.",
      });
      await getUser();
    }
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const logout = async () => {
  localStorage.clear();
  store.dispatch(clearUser());
  window.location.href = "/";
};
