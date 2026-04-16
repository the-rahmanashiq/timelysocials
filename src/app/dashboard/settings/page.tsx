"use client";
import React from "react";

const page = () => {
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <div className="w-16 h-1 bg-sky-400 rounded mt-1"></div>
          <div className="text-gray-600 mt-2">
            Update settings according to your preference
          </div>
          <hr className="my-4 border-gray-200" />
          <div className="mt-4">
            <div>
              <label className="font-bold text-lg">Profile Picture</label>
              <p className="text-gray-600">
                Give a personal touch to your personal account
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
