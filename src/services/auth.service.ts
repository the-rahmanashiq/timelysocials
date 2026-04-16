"use client";
import { decodedToken } from "@/app/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/app/utils/local-storage";
import { authKey } from "@/constants/authKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";

export const storeUserInfo = (token: string) => {
  return setToLocalStorage(authKey, token);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedData: any = decodedToken(authToken);
    return {
      ...decodedData,
    };
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
  return false;
};

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/refresh-token`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
