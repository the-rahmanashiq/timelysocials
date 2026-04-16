"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (data: Record<string, any>) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signup`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }
  );

  const userInfo = await res.json();
  return userInfo;
};
