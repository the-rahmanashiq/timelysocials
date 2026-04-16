import React, { useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { FaHashtag, FaLink } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import WorkSpaceModalSettings from "./tabs/WorkSpaceModalSettings";
import { useGetWorkspaceByIdQuery } from "@/redux/api/workspaceApi";
import Loader from "@/app/components/Loader";

const WorkSpaceModal = ({
  setIsOpen,
  id,
}: {
  setIsOpen: (isOpen: boolean) => void;
  id: string;
}) => {
  const { data: workspaceData, isLoading } = useGetWorkspaceByIdQuery(id);
  const [tab, setTab] = useState(1);

  if (isLoading) return <Loader />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="size-12 bg-teal rounded-lg flex items-center justify-center drop-shadow-2xl mr-3">
              {workspaceData?.name.at(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {workspaceData?.name}
              </h3>
              <p>Workspace Details</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            ✕
          </button>
        </div>
        <hr className=" border-gray-200" />
        <div className="space-y-6">
          <div className="border-b border-gray-200">
            <nav className="flex gap-x-4">
              <button
                type="button"
                className={`flex items-center gap-x-2 py-4 px-1 text-sm whitespace-nowrap border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer ${
                  tab === 1
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => setTab(1)}
              >
                <FaLink className="size-4" />
                Social Accounts
              </button>
              <button
                type="button"
                className={`flex items-center gap-x-2 py-4 px-1 text-sm whitespace-nowrap border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer ${
                  tab === 2
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => setTab(2)}
              >
                <AiOutlineTeam className="size-4" />
                Team Members
              </button>
              <button
                type="button"
                className={`flex items-center gap-x-2 py-4 px-1 text-sm whitespace-nowrap border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer ${
                  tab === 3
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => setTab(3)}
              >
                <FaHashtag className="size-4" />
                Hashtag List
              </button>
              <button
                type="button"
                className={`flex items-center gap-x-2 py-4 px-1 text-sm whitespace-nowrap border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer ${
                  tab === 4
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => setTab(4)}
              >
                <IoPricetagOutline className="size-4" />
                Custom Labels
              </button>
              <button
                type="button"
                className={`flex items-center gap-x-2 py-4 px-1 text-sm whitespace-nowrap border-b-2 hover:border-blue-600 hover:text-blue-600 cursor-pointer ${
                  tab === 5
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => setTab(5)}
              >
                <MdOutlineSettings className="size-4" />
                Settings
              </button>
            </nav>
          </div>

          <div className="mt-3">
            <div
              id="tabs-with-underline-1"
              role="tabpanel"
              aria-labelledby="tabs-with-underline-item-1"
            >
              <p className="text-gray-500">This is the ${tab} tab content</p>
              {tab === 5 && (
                <WorkSpaceModalSettings id={id} setIsOpen={setIsOpen} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceModal;
