"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import { getUserInfo } from "@/services/auth.service";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const user = getUserInfo(); // now runs only in the browser
    setIsLoggedIn(!!user);
  }, []);

  if (!isClient) return null; // or return a skeleton loader

  return (
    <MainLayout>
      <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between">
            <Link
              className="flex-none text-xl font-semibold dark:text-white focus:outline-hidden focus:opacity-80"
              href="/"
              aria-label="Brand"
            >
              <Image
                src="/assets/TimelySocialsLogo.png"
                width={250}
                height={50}
                alt="logo"
              />
            </Link>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle relative size-9 text-9xl border border-gray-600 rounded-lg flex justify-center items-center gap-x-2 bg-dark text-gray-800 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-500 dark:hover:bg-gray/10 dark:focus:bg-white/10"
                id="hs-navbar-example-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-example"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-example"
              >
                <svg
                  className="hs-collapse-open:hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>
          </div>
          <div
            id="hs-navbar-example"
            className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
            aria-labelledby="hs-navbar-example-collapse"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center  sm:mt-0 sm:ms-5 grow justify-end">
              <div className="flex flex-col gap-10 mt-5 sm:flex-row sm:items-center  sm:mt-0 sm:ms-5 grow justify-center">
                <Link
                  className="font-medium hover:underline text-black hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-black dark:hover:text-neutral-500 dark:focus:text-neutral-500 text-xl"
                  href="#pricing"
                  aria-current="page"
                >
                  Pricing
                </Link>
                <Link
                  className="font-medium hover:underline text-black hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-black dark:hover:text-neutral-500 dark:focus:text-neutral-500 text-xl"
                  href="#features"
                >
                  Features
                </Link>
                <Link
                  className="font-medium hover:underline text-black hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-black dark:hover:text-neutral-500 dark:focus:text-neutral-500 text-xl"
                  href="/blogs"
                >
                  Blogs
                </Link>
                <Link
                  className="font-medium hover:underline text-black hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-black dark:hover:text-neutral-500 dark:focus:text-neutral-500 text-xl"
                  href="#platforms"
                >
                  Platforms
                </Link>
                <Link
                  className="font-medium hover:underline text-black hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-black dark:hover:text-neutral-500 dark:focus:text-neutral-500 text-xl"
                  href="#faq"
                >
                  FAQ
                </Link>
              </div>
              {isLoggedIn ? (
                <Link
                  className="font-extrabold text-black border-black rounded-lg px-5 py-2 bg-teal border-4 text-xl justify-end"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  className="font-extrabold text-black border-black rounded-lg px-5 py-2 bg-teal border-4 text-xl justify-end"
                  href="/signin"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </MainLayout>
  );
};

export default Navbar;
