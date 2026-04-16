import { useDeleteWorkspaceMutation } from "@/redux/api/workspaceApi";
import { clearCurrentWorkspace } from "@/redux/features/workspaceSplice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";
import toast from "react-hot-toast";

const WorkSpaceModalSettings = ({
  id,
  setIsOpen,
}: {
  id: string;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [deleteWorkspace] = useDeleteWorkspaceMutation();
  const currentWorkspaceId = useAppSelector(
    (state) => state.workspace.currentWorkspaceId
  );
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    deleteWorkspace(id)
      .unwrap()
      .then(() => {
        toast.success("Workspace deleted successfully");
        setIsOpen(false);
        if (currentWorkspaceId === id) {
          dispatch(clearCurrentWorkspace());
        }
      })
      .catch((error) => {
        toast.error("Failed to delete workspace: ", error);
        setIsOpen(false);
      });
  };
  return (
    <div>
      <button
        className="bg-red-500 text-white font-bold w-full rounded-lg max-w-48 p-2 cursor-pointer hover:bg-red-600 transition-colors duration-300"
        onClick={handleDelete}
      >
        Delete Workspace
      </button>
    </div>
  );
};

export default WorkSpaceModalSettings;
