"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import type { FieldError, UseFormRegister } from "react-hook-form";
import Image from "next/image";
import toast from "react-hot-toast";
import { userLogin } from "@/services/actions/userLogin";
import setAccessToken from "@/services/actions/setAccessToken";
import { storeUserInfo } from "@/services/auth.service";
import { store } from "@/redux/store";
import { baseApi } from "@/redux/api/baseApi";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const userData = await userLogin({
      email: data.email,
      password: data.password,
    });

    if (userData?.data?.accessToken) {
      storeUserInfo(userData.data.accessToken);
      setAccessToken(userData.data.accessToken, { redirect: "/dashboard" });
      store.dispatch(baseApi.util.resetApiState());
      toast.success("Logged in successfully");
    }
  };

  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 md:p-8">
        {/* Logo + Heading */}
        <div className="text-center space-y-2 relative">
          <Image
            src="/assets/TimelySocialsLogo.png"
            alt="timelysocials"
            className="mx-auto"
            width={230}
            height={48}
          />
          <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
          <Link
            href="/signup"
            className="text-cyan-500 hover:underline text-sm"
          >
            or sign up for an account
          </Link>
        </div>

        {/* Social buttons */}
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
          <SocialButton name="Facebook" logo="/assets/social/Facebook.svg" />
          <SocialButton name="Instagram" logo="/assets/social/instagram.svg" />
          <SocialButton name="LinkedIn" logo="/assets/social/linkedin.svg" />
          <SocialButton name="Twitter/X" logo="/assets/social/x.svg" />
          <SocialButton
            name="Magic Link"
            logo="/assets/social/magic-link.svg"
          />
        </div>

        {/* or divider */}
        <div className="flex items-center my-6">
          <span className="flex-grow border-t border-gray-200"></span>
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <span className="flex-grow border-t border-gray-200"></span>
        </div>

        {/* Login form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            id="email"
            label="Email address"
            type="email"
            required
            register={register}
            error={errors.email}
          />

          <PasswordField
            id="password"
            label="Password"
            required
            register={register}
            error={errors.password}
            extraLink={
              <Link
                href="/forgot-password"
                className="text-cyan-500 hover:underline text-sm"
              >
                Forgot password?
              </Link>
            }
          />

          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              {...register("remember")}
              className="h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold rounded-lg transition cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

type SocialButtonProps = { name: string; logo: string };
function SocialButton({ name, logo }: SocialButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
    >
      <Image
        src={logo}
        alt={`${name} logo`}
        className="h-5 w-5"
        width={20}
        height={20}
      />
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </button>
  );
}

type FormFieldProps = {
  id: keyof FormValues;
  label: string;
  type: string;
  required?: boolean;
  register: UseFormRegister<FormValues>;
  error?: FieldError | undefined;
};
function FormField({
  id,
  label,
  type,
  required,
  register,
  error,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        {...register(id, { required })}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 transition"
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">This field is required</p>
      )}
    </div>
  );
}

type PasswordFieldProps = {
  id: keyof FormValues;
  label: string;
  required?: boolean;
  extraLink?: React.ReactNode;
  register: UseFormRegister<FormValues>;
  error?: FieldError | undefined;
};

function PasswordField({
  id,
  label,
  required,
  extraLink,
  register,
  error,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {extraLink}
      </div>

      <div className="relative mt-1">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          {...register(id, { required })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 transition"
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">This field is required</p>
        )}

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
        >
          {showPassword ? (
            <Image
              src="/assets/icons/eye-password-show.svg"
              alt="Hide password"
              width={20}
              height={20}
              className="h-5 w-5"
            />
          ) : (
            <Image
              src="/assets/icons/eye-password-hide.svg"
              alt="Hide password"
              width={20}
              height={20}
              className="h-5 w-5"
            />
          )}
        </button>
      </div>
    </div>
  );
}

export default Page;
