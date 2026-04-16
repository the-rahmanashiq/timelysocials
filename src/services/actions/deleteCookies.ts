"use server";
import { cookies } from "next/headers";

export const deleteCookies = async (keys: string[]) => {
  const cookieStore = await cookies();
  keys.forEach(async (key) => {
    cookieStore.delete(key);
  });
};
