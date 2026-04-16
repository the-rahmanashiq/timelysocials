/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import WorkSpaceCard from "./components/WorkSpaceCard";
import CreateWorkSpaceModal from "./components/CreateWorkSpaceModal";
import { useGetWorkspacesQuery } from "@/redux/api/workspaceApi";
import Loader from "@/app/components/Loader";
import CreateWorkspace from "../../common/CreateWorkspaceError";

const Page = () => {
  const [isCreateWorkspaceModalOpen, setIsCreateWorkspaceModalOpen] =
    useState(false);

  const { data: workspaceData, isLoading } = useGetWorkspacesQuery(undefined);

  if (isLoading) return <Loader />;

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Workspace</h1>
          <div className="w-16 h-1 bg-sky-400 rounded mt-1"></div>
          <p className="text-gray-600 mt-2">
            Manage your social media workspaces and teams
          </p>
          <div className="mt-4 h-full flex items-center lg:justify-end md:justify-end sm:justify-start lg:w-auto md:w-auto sm:w-full">
            <button
              className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 bg-teal font-semibold cursor-pointer lg:w-auto md:w-auto sm:w-auto xs:w-full "
              onClick={() => setIsCreateWorkspaceModalOpen(true)}
            >
              <IoMdAddCircleOutline className="size-5" />
              Create a New Workspace
            </button>
          </div>
          <div className="mt-4 grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1">
            {workspaceData?.length > 0 ? (
              workspaceData.map((workspace: any) => (
                <WorkSpaceCard key={workspace._id} id={workspace._id} />
              ))
            ) : (
              <CreateWorkspace />
            )}
          </div>
        </div>
      </div>
      {isCreateWorkspaceModalOpen && (
        <CreateWorkSpaceModal setIsOpen={setIsCreateWorkspaceModalOpen} />
      )}
    </main>
  );
};

export default Page;
