"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import setAccessToken from "@/services/actions/setAccessToken";
import Loader from "../components/Loader";

const CallbackClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken && typeof accessToken === "string") {
      localStorage.setItem("accessToken", accessToken);
      setAccessToken(accessToken, { redirect: "/dashboard" });
      router.replace("/dashboard");
    } else {
      router.replace("/dashboard");
    }
  }, [router, searchParams]);

  return <Loader />;
};

export default CallbackClient;
