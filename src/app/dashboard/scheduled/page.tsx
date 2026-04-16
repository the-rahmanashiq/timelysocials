import React from "react";

const page = () => {
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Scheduled</h1>
          <div className="w-16 h-1 bg-sky-400 rounded mt-1"></div>
          <div className="mt-4 h-full flex items-center justify-between">
            <p className="text-gray-600 mt-2">
              Manage your scheduled tasks and events here.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
