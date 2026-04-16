"use client";
import React, { useState } from "react";
import { RiAccountBox2Line, RiTeamLine } from "react-icons/ri";
import WorkSpaceModal from "./WorkSpaceModal";
import { useGetWorkspaceByIdQuery } from "@/redux/api/workspaceApi";
import Loader from "@/app/components/Loader";

const WorkSpaceCard = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: workspaceData, isLoading } = useGetWorkspaceByIdQuery(id);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center mb-3">
        <div className="size-12 bg-teal rounded-lg flex items-center justify-center drop-shadow-2xl mr-3 mb-3">
          {workspaceData?.name.at(0)}
        </div>
        <div className="flex flex-col items-start justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            {workspaceData?.name}
          </h2>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              workspaceData?.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {workspaceData?.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <RiAccountBox2Line />
        <p className="text-sm text-gray-600 ml-2 flex w-full justify-between">
          Social Accounts:
          <span className="font-semibold ml-1">
            {workspaceData?.socialMediaPlatforms?.length}
          </span>
        </p>
      </div>
      <div className="flex items-center mb-2">
        <RiTeamLine className="" />
        <p className="text-sm text-gray-600  ml-2 flex w-full justify-between">
          Team Members:
          <span className="font-semibold ml-1">
            {workspaceData?.teamMembers?.length}
          </span>
        </p>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
      >
        View Details
      </button>

      {isOpen && <WorkSpaceModal setIsOpen={setIsOpen} id={id} />}
    </div>
  );
};

export default WorkSpaceCard;
