// pages/social-accounts.tsx
"use client";
import {
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaLinkedin,
  FaFacebook,
  FaPinterest,
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import CreateWorkspace from "../common/CreateWorkspaceError";
import { useAppSelector } from "@/redux/hooks";

const platforms = [
  {
    name: "Instagram",
    icon: <FaInstagram className="text-2xl text-pink-500" />,
  },
  { name: "Twitter/X", icon: <FaTwitter className="text-2xl text-sky-500" /> },
  { name: "TikTok", icon: <FaTiktok className="text-2xl" /> },
  { name: "LinkedIn", icon: <FaLinkedin className="text-2xl text-blue-700" /> },
  { name: "Facebook", icon: <FaFacebook className="text-2xl text-blue-600" /> },
  { name: "Threads", icon: <SiThreads className="text-2xl" /> },
  {
    name: "Pinterest",
    icon: <FaPinterest className="text-2xl text-red-500" />,
  },
];

export default function SocialAccounts() {
  const currrentWorkspaceId = useAppSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.workspace.currentWorkspaceId
  );
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Social Accounts</h1>
          <div className="w-16 h-1 bg-sky-400 rounded mt-1"></div>
        </div>
        {currrentWorkspaceId ? (
          <div>
            {/* Filters row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              {/* Dropdowns */}
              <div className="flex items-center gap-4">
                {/* Status */}
                <div className="relative" data-dropdown>
                  <div className="m-1 hs-dropdown [--trigger:hover] relative inline-flex">
                    <button
                      id="hs-dropdown-hover-event"
                      type="button"
                      className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      aria-label="Dropdown"
                    >
                      Status
                      <svg
                        className="hs-dropdown-open:rotate-180 size-4"
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
                      className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="hs-dropdown-hover-event"
                    >
                      <div className="p-1 space-y-0.5">
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 cursor-pointer"
                          href="#"
                        >
                          All accounts
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="#"
                        >
                          Active accounts
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="#"
                        >
                          Reauthorization needed
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    id="status-dropdown"
                    className="hidden absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-sm py-2"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      All accounts
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Active accounts
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Reauthorization needed
                    </a>
                  </div>
                </div>

                {/* Platform */}
                <div className="relative" data-dropdown>
                  <div className="m-1 hs-dropdown [--trigger:hover] relative inline-flex">
                    <button
                      id="hs-dropdown-hover-event"
                      type="button"
                      className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      aria-label="Dropdown"
                    >
                      All Accounts
                      <svg
                        className="hs-dropdown-open:rotate-180 size-4"
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
                      className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="hs-dropdown-hover-event"
                    >
                      <div className="p-1 space-y-0.5">
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="#"
                        >
                          Instagram
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="#"
                        >
                          Facebook
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="#"
                        >
                          Threads
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="#"
                        >
                          LinkedIn
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="#"
                        >
                          TikTok
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                          href="#"
                        >
                          Pinterest
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    id="status-dropdown"
                    className="hidden absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-sm py-2"
                  >
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      All accounts
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Active accounts
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Reauthorization needed
                    </a>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search account"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
            </div>

            {/* Account list */}
            <div className="space-y-4">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {p.icon}
                    <span className="font-medium text-lg">{p.name}</span>
                  </div>
                  <button className="px-4 py-2 text-sky-500 border border-sky-500 rounded-lg hover:bg-sky-500 hover:text-white transition cursor-pointer">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <CreateWorkspace />
        )}
      </div>
    </main>
  );
}
