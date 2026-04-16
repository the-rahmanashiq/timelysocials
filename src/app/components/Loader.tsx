import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl w-full h-full">
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex justify-center">
          <div
            className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
