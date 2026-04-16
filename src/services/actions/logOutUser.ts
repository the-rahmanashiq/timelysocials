import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./deleteCookies";
import { authKey } from "@/constants/authKey";

export const logoutUser = async (router: AppRouterInstance) => {
  localStorage.removeItem(authKey);
  deleteCookies([authKey, "refreshToken"]);

  router.refresh();
  router.push("/signin");
};
