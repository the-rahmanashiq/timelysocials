import { useCreateWorkspaceMutation } from "@/redux/api/workspaceApi";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateWorkspaceFormData = {
  name: string;
};

const CreateWorkSpaceModal = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkspaceFormData>();
  const [mutate] = useCreateWorkspaceMutation();

  const handleRegister = async (values: CreateWorkspaceFormData) => {
    const data = await mutate(values);

    if (data) {
      setIsOpen(false);
      toast.success("Workspace created successfully");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Create a New Workspace
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
        <hr className="mb-4 border-gray-200" />
        <div className="space-y-6">
          <div className="border-b border-gray-200">
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
              <div className="mt-3">
                <button
                  className="w-full py-2 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold rounded-lg transition"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkSpaceModal;
