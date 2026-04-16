"use client";
import { baseApi } from "@/redux/api/baseApi";
import { store } from "@/redux/store";
import { registerUser } from "@/services/actions/registerUser";
import setAccessToken from "@/services/actions/setAccessToken";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const handleRegister = async (values: FieldValues) => {
    console.log("values: ", values);
    try {
      const res = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      console.log("res: ", res);
      if (res.success) {
        toast.success(res.message);
        const userResponse = await userLogin({
          email: values.email,
          password: values.password,
        });
        console.log("userResponse: ", userResponse);

        if (userResponse.success) {
          store.dispatch(baseApi.util.resetApiState());
          storeUserInfo(userResponse.data.accessToken);
          setAccessToken(userResponse.data.accessToken, {
            redirect: "/dashboard",
          });
          toast.success("Signed up successfully");
        }
      } else {
        toast.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 md:p-8">
        <div className="text-center space-y-2">
          <Image
            src="/assets/TimelySocialsLogo.png"
            alt="timelysocials"
            className="mx-auto"
            width={230}
            height={48}
          />
          <h1 className="text-2xl font-bold text-gray-900">Sign up</h1>
          <Link
            href="/signin"
            className="text-cyan-500 hover:underline text-sm"
          >
            or sign in to your account
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <Link
            className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition w-full"
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/providers/google/auth/google`}
          >
            <Image
              src={"/assets/social/Google.svg"}
              alt={`Google logo`}
              className="h-5 w-5"
              height={20}
              width={20}
            />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </Link>
          <button className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition w-full">
            <Image
              src={"/assets/social/Facebook.svg"}
              alt={`Facebook logo`}
              className="h-5 w-5"
              height={20}
              width={20}
            />
            <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition w-full">
            <Image
              src={"/assets/social/instagram.svg"}
              alt={`Instagram logo`}
              className="h-5 w-5"
              height={20}
              width={20}
            />
            <span className="text-sm font-medium text-gray-700">Instagram</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition w-full">
            <Image
              src={"/assets/social/linkedin.svg"}
              alt={`LinkedIn logo`}
              className="h-5 w-5"
              height={20}
              width={20}
            />
            <span className="text-sm font-medium text-gray-700">LinkedIn</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition w-full">
            <Image
              src={"/assets/social/x.svg"}
              alt={`Twitter/X logo`}
              className="h-5 w-5"
              height={20}
              width={20}
            />
            <span className="text-sm font-medium text-gray-700">Twitter/X</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition w-full">
            <Image
              src={"/assets/social/magic-link.svg"}
              alt={`Magic Link logo`}
              className="h-5 w-5"
              height={20}
              width={20}
            />
            <span className="text-sm font-medium text-gray-700">
              Magic Link
            </span>
          </button>
        </div>

        <div className="flex items-center my-6">
          <span className="flex-grow border-t border-gray-200"></span>
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <span className="flex-grow border-t border-gray-200"></span>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-cyan-400 focus:border-cyan-400"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-cyan-400 focus:border-cyan-400"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              type="password"
              className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-cyan-400 focus:border-cyan-400"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              type="password"
              className="mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-cyan-400 focus:border-cyan-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold rounded-lg transition"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
