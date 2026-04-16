"use client";
import { getUserInfo } from "@/services/auth.service";
import React, { useState } from "react";

function Dashboard() {
  const [draftModal, setDraftModal] = useState(false);
  const user = getUserInfo();

  return (
    <div className="flex">
      {/* Sidebar already created - space left here */}
      <main className="p-8 bg-gray-50 min-h-screen">
        <div className=" mx-auto bg-white p-6 rounded-lg shadow">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Home</h1>
            <div className="w-16 h-1 bg-sky-400 rounded mt-1"></div>
          </div>
          {/* Greeting and Instruction */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold">
              Good morning, {user?.name?.split(" ")[0]}
            </h2>
            <p className="text-gray-600">
              Here you can dump all your ideas that you might want to look back
              on later. And when it is needed, you can turn them into a
              masterpiece.
            </p>
          </section>

          {/* Draft Ideas Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Draft Ideas</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Write Idea Card */}
              <div
                className="flex items-center justify-center border border-dashed border-gray-300 rounded-lg h-40 bg-white cursor-pointer hover:bg-gray-100 transition"
                onClick={() => setDraftModal(true)}
              >
                <span className="text-gray-600">+ Write an idea</span>
              </div>

              {/* Idea Cards */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="border rounded-lg bg-white p-4 text-sm text-gray-800 shadow-sm"
                >
                  <p className="font-medium mb-1">Sabuj Ahmed</p>
                  <p className="font-semibold mb-1">
                    Never Miss a Spark of Social Media Genius Again! 🚀
                  </p>
                  <p className="text-gray-600 text-xs">
                    #DraftIdeas is your one-stop shop for capturing fleeting
                    social media inspiration.
                  </p>
                </div>
              ))}
            </div>

            <div className="text-right mt-4">
              <a href="#" className="text-blue-600 hover:underline text-sm">
                View all &gt;&gt;
              </a>
            </div>
          </section>

          {/* Updates Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4">
              Updates you may have missed from us
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="border rounded-lg h-32 bg-white flex items-center justify-center text-gray-500 shadow-sm"
                >
                  Recent Blogs
                </div>
              ))}
            </div>

            <div className="text-right mt-4">
              <a href="#" className="text-blue-600 hover:underline text-sm">
                See all articles &gt;&gt;
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Sidebar */}
      {/* Main Content */}
      <main className="flex-1 bg-gray-50 min-h-screen"></main>

      {/* Draft Pop-Up (Initially Hidden - controlled by state ideally) */}
      {/* Replace with modal logic as needed */}
      {/* Example placeholder */}

      {draftModal && (
        <div className="fixed top-1/3 right-1/3 m-8 w-80 p-4 border rounded bg-white shadow-md">
          <textarea
            className="w-full h-24 border rounded p-2"
            placeholder="Write something here..."
          />
          <div className="flex items-center justify-between mt-2">
            <button className="text-sm text-blue-500">#Hashtags</button>
            <button className="text-sm text-gray-600">Labels</button>
          </div>
          <button className="w-full mt-3 bg-gray-200 p-2 rounded">
            Click or Drag & Drop Media
          </button>
          <button
            className="mt-4 w-full bg-blue-600 text-white p-2 rounded cursor-pointer hover:bg-blue-700 transition"
            onClick={() => setDraftModal(false)}
          >
            Save draft
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
