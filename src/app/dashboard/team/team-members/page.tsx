/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loader from "@/app/components/Loader";
import { useGetWorkspaceByIdQuery } from "@/redux/api/workspaceApi";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

const TeamMembers = () => {
  const currentWorkspaceId = useAppSelector(
    (state) => state.workspace.currentWorkspaceId
  );

  const { data: workspaceData, isLoading } = useGetWorkspaceByIdQuery(
    currentWorkspaceId,
    {
      skip: !currentWorkspaceId,
    }
  );

  if (isLoading) return <Loader />;

  return (
    <main className="p-4 bg-gray-50 min-h-screen overflow-x-auto">
      <div className="w-full bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Team Members</h1>
          <div className="w-16 h-1 bg-sky-400 rounded mt-1"></div>
          <div className="mt-4 flex items-center justify-between flex-wrap">
            <p className="text-gray-600 mt-2">
              Manage your team members, roles, and permissions
            </p>
            <button className="mt-2 flex items-center gap-x-3.5 py-2 px-4 text-sm text-white rounded-lg bg-cyan-500 hover:bg-cyan-600 focus:outline-none font-semibold">
              <IoMdAddCircleOutline className="size-5" />
              Invite Member
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <table className="table-auto w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Member
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {workspaceData?.teamMembers?.map((member: any) => (
                  <tr key={member._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {member.status === "active" ? (
                        <span className="text-green-600">Active</span>
                      ) : (
                        <span className="text-red-600">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {member.lastLogin
                        ? new Date(member.lastLogin).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TeamMembers;
