import React from "react";

const CreateWorkspaceError = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center p-4 border-gray-200 border rounded-lg">
      <p className="text-gray-600 font-semibold">
        Please select a Workspace as default or create a new one
      </p>
    </div>
  );
};

export default CreateWorkspaceError;
