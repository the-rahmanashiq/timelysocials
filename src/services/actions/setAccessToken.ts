"use server";
import { authKey } from "@/constants/authKey";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setAccessToken = async (token: string, option?: any) => {
  if (token) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: authKey,
      value: token || "",
    });

    if (option && option.redirect) {
      redirect(option.redirect);
    }
  }
};

export default setAccessToken;
