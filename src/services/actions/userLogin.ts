"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userLogin = async (data: Record<string, any>) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signin`,
    {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const userInfo = await res.json();

  return userInfo;
};
