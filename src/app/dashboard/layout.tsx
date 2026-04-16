"use client";
import { logoutUser } from "@/services/actions/logOutUser";
import { isLoggedIn } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineTag } from "react-icons/ai";
import { FaHashtag, FaUsersCog } from "react-icons/fa";
import { FaUsersRectangle } from "react-icons/fa6";
import { IoMdAddCircleOutline, IoMdNotificationsOutline } from "react-icons/io";
import {
  IoBulbOutline,
  IoCalendarOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LiaUsersSolid } from "react-icons/lia";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineComment, MdReportGmailerrorred } from "react-icons/md";
import { PiUserFocusFill } from "react-icons/pi";
import { RiBillLine, RiLogoutBoxRLine } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";
import { TbMoneybag } from "react-icons/tb";
import { VscTools } from "react-icons/vsc";
import Loader from "../components/Loader";
import { useGetMeQuery } from "@/redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentWorkspace,
  setCurrentWorkspace,
} from "@/redux/features/workspaceSplice";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentWorkspaceId = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.workspace.currentWorkspaceId
  );

  const { data: userData, isSuccess } = useGetMeQuery(undefined);
  console.log("userData: ", userData);

  useEffect(() => {
    if (isSuccess && userData.workspace.length > 0 && !currentWorkspaceId) {
      dispatch(setCurrentWorkspace(userData.workspace[0]));
    }
  }, [isSuccess, userData, currentWorkspaceId, dispatch]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logOut = async () => {
    logoutUser(router);
    toast.success("Logged out successfully");
    dispatch(clearCurrentWorkspace());
  };

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      toast.error("You are not logged in");
      router.push("/signin");
    } else {
      setCheckingAuth(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checkingAuth) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader></Loader>}>
      <div>
        <div className="flex">
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 lg:static lg:block`}
          >
            <div className="flex flex-col h-screen">
              <header className="p-4 flex justify-between items-center gap-x-2">
                <Link
                  className="flex-none text-xl font-semibold dark:text-white focus:outline-hidden focus:opacity-80"
                  href="/"
                  aria-label="Brand"
                >
                  <Image
                    src="/assets/TimelySocialsLogo.png"
                    width={200}
                    height={50}
                    alt="logo"
                    style={{ height: "auto" }} // optional: maintains aspect ratio if styles change
                  />
                </Link>

                <div className="lg:hidden -me-2">
                  <button
                    type="button"
                    className="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
                    aria-label="Toggle sidebar"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <svg
                      className="shrink-0 size-4"
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
                    <span className="sr-only">Close</span>
                  </button>
                </div>
              </header>
              <div className="flex flex-col flex-grow overflow-y-auto justify-between">
                <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                  <div
                    className="hs-accordion-group pb-0 px-2  w-full flex flex-col flex-wrap"
                    data-hs-accordion-always-open
                  >
                    <ul className="space-y-1">
                      <li>
                        <Link
                          className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 bg-teal font-semibold"
                          href="/dashboard/create-post"
                        >
                          <IoMdAddCircleOutline className="size-5" />
                          Create Post
                        </Link>
                      </li>

                      <li className="hs-accordion" id="home-accordion">
                        <Link
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 cursor-pointer"
                          href="/dashboard/"
                        >
                          <IoHomeOutline className="size-5" />
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="/dashboard/calendar"
                        >
                          <IoCalendarOutline className="size-5" />
                          Calendar
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="/dashboard/scheduled"
                        >
                          <LuCalendarClock className="size-5" />
                          Scheduled
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="/dashboard/analytics"
                        >
                          <SiSimpleanalytics className="size-5" />
                          Analytics
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="/dashboard/social-account"
                        >
                          <PiUserFocusFill className="size-5" />
                          Social Account
                        </Link>
                      </li>

                      <li className="hs-accordion" id="account-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 cursor-pointer"
                          aria-expanded="true"
                          aria-controls="account-accordion-sub-1-collapse-1"
                        >
                          <VscTools className="size-5" />
                          Tools
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
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
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500"
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
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        <div
                          id="account-accordion-sub-1-collapse-1"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="account-accordion"
                        >
                          <ul className="pt-1 ps-7 space-y-1">
                            <li>
                              <Link
                                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                                href="/dashboard/tools/hashtags"
                              >
                                <FaHashtag className="size-5" />
                                Hashtags
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                                href="/dashboard/tools/labels"
                              >
                                <AiOutlineTag className="size-5" />
                                Labels
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                                href="/dashboard/tools/viral-ideas"
                              >
                                <IoBulbOutline className="size-5" />
                                Viral Ideas
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>

                      <li className="hs-accordion" id="projects-accordion">
                        <button
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 cursor-pointer"
                          aria-expanded="true"
                          aria-controls="projects-accordion-sub-1-collapse-1"
                        >
                          <FaUsersCog className="size-5" />
                          Team
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
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
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500"
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
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        <div
                          id="projects-accordion-sub-1-collapse-1"
                          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                          role="region"
                          aria-labelledby="projects-accordion"
                        >
                          <ul className="pt-1 ps-7 space-y-1">
                            <li>
                              <Link
                                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                                href="/dashboard/team/workspace"
                              >
                                <FaUsersRectangle className="size-5" />
                                Workspace
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                                href="/dashboard/team/team-members"
                              >
                                <LiaUsersSolid className="size-5" />
                                Team Members
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
                <footer className="mt-auto p-2 border-t border-gray-200">
                  <div className="hs-dropdown [--strategy:absolute] [--auto-close:inside] relative w-full inline-flex">
                    <div
                      className="w-full inline-flex shrink-0 items-center gap-x-2 p-2 text-start text-sm text-gray-800 rounded-md hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      aria-label="Dropdown"
                    >
                      {userData?.avatar ? (
                        <Image
                          className="shrink-0 size-8 rounded-full"
                          src={userData.avatar}
                          alt="Avatar"
                          width={36}
                          height={36}
                        />
                      ) : (
                        <div className="shrink-0 size-9 rounded-full bg-teal flex items-center justify-center font-semibold text-xl">
                          {userData?.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <div className="font-bold text-lg">
                          {userData?.name}
                        </div>
                        <div className="text-xs text-gray">Free Plan</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ul>
                      <li className="">
                        <Link
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="/dashboard/settings"
                        >
                          <IoMdNotificationsOutline className="size-5" />
                          Notifications
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="/dashboard/settings"
                        >
                          <IoSettingsOutline className="size-5" />
                          Settings
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="/dashboard/plans-and-billing"
                        >
                          <RiBillLine className="size-5" />
                          Plans & Billing
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href={"/dashboard/suggest-a-feature"}
                        >
                          <MdOutlineComment className="size-5" />
                          Suggest a Feature
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href={"/dashboard/report-a-problem"}
                        >
                          <MdReportGmailerrorred className="size-5" />
                          Report a Problem
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          type="button"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href={"/dashboard/refer-and-earn"}
                        >
                          <TbMoneybag className="size-5" />
                          Refer & Earn
                        </Link>
                      </li>
                      <li className="">
                        <button
                          type="submit"
                          className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 cursor-pointer"
                          onClick={logOut}
                        >
                          <RiLogoutBoxRLine className="size-5" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </footer>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-h-screen bg-white transition-all duration-300">
            <div className="lg:hidden p-2">
              <button
                type="button"
                className="flex justify-center items-center gap-x-3 size-8 text-sm text-gray-600 hover:bg-gray-100 rounded-full"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg
                  className="sm:hidden shrink-0 size-4"
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
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M15 3v18" />
                  <path d="m8 9 3 3-3 3" />
                </svg>
                <svg
                  className="hidden sm:block shrink-0 size-4"
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
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M15 3v18" />
                  <path d="m10 15-3-3 3-3" />
                </svg>
                <span className="sr-only">Navigation Toggle</span>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Layout;
