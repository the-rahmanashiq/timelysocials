import Link from "next/link";
import React from "react";
import { FaImage, FaFilePdf, FaRegEdit } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { IoMdVideocam } from "react-icons/io";

const page = () => {
  const cardClasses =
    "flex flex-col items-center justify-center border rounded-lg bg-white shadow-sm p-6 hover:bg-gray-50 transition cursor-pointer";

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create Post</h1>
          <div className="w-16 h-1 bg-sky-400 rounded mt-1"></div>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-6">Create a new post</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Text Post */}
              <div className={cardClasses}>
                <FaRegEdit className="text-4xl text-gray-500 mb-3" />
                <p className="text-lg font-medium mb-2">Text Post</p>
                <div className="flex flex-wrap justify-center gap-1 text-xs text-gray-500">
                  <span>✖️</span>
                  <span>in</span>
                  <span>🔗</span>
                  <span>🧵</span>
                  <span>🦋</span>
                </div>
              </div>

              {/* Image Post */}
              <Link className={cardClasses} href="/dashboard/create-post/image">
                <FaImage className="text-4xl text-gray-500 mb-3" />
                <p className="text-lg font-medium mb-2">Image Post</p>
                <div className="flex flex-wrap justify-center gap-1 text-xs text-gray-500">
                  <span>✖️</span>
                  <span>in</span>
                  <span>🔗</span>
                  <span>📘</span>
                  <span>📸</span>
                  <span>📌</span>
                  <span>🦋</span>
                </div>
              </Link>

              {/* Video Post */}
              <div className={cardClasses}>
                <IoMdVideocam className="text-4xl text-gray-500 mb-3" />
                <p className="text-lg font-medium mb-2">Video Post</p>
                <div className="flex flex-wrap justify-center gap-1 text-xs text-gray-500">
                  <span>✖️</span>
                  <span>in</span>
                  <span>🔗</span>
                  <span>📘</span>
                  <span>📸</span>
                  <span>🎵</span>
                  <span>📌</span>
                </div>
              </div>

              {/* PDF Post */}
              <div className={cardClasses}>
                <FaFilePdf className="text-4xl text-gray-500 mb-3" />
                <p className="text-lg font-medium mb-2">PDF</p>
                <div className="text-xs text-gray-500">in</div>
              </div>

              {/* Instagram Story */}
              <div className={cardClasses}>
                <GoHistory className="text-4xl text-gray-500 mb-3" />
                <p className="text-lg font-medium mb-2">Instagram Story</p>
                <div className="text-xs text-pink-500">📸</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
