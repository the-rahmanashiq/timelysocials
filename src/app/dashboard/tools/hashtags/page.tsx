"use client";
import React, { useState } from "react";

export default function Hashtags() {
  const [showModal, setShowModal] = useState(false);
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "Marketing",
      tags: [
        "marketing",
        "digitalmarketing",
        "socialmediamarketing",
        "marketingtips",
        "contentmarketing",
        "marketingagency",
        "marketingonline",
        "marketingstrategies",
        "marketingplan",
      ],
    },
    {
      id: 2,
      title: "Photography",
      tags: [
        "photography",
        "naturephotography",
        "travelphotography",
        "streetphotography",
        "foodphotography",
        "portraitphotography",
        "landscapephotography",
        "weddingphotography",
        "photographyskills",
      ],
    },
    // add more lists here
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newTags, setNewTags] = useState("");

  const handleAddList = () => {
    if (!newTitle || !newTags) return;
    const id = lists.length + 1;
    setLists([
      ...lists,
      { id, title: newTitle, tags: newTags.split(",").map((t) => t.trim()) },
    ]);
    setNewTitle("");
    setNewTags("");
    setShowModal(false);
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Hashtags</h1>

          <div className="w-16 h-1 bg-sky-400 rounded mt-1"></div>
          <p className="text-gray-600 mt-2">
            Manage your hashtag lists for social media posts
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Hashtags Lists</h2>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-teal text-black rounded flex items-center space-x-1 cursor-pointer hover:bg-cyan-500 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>New List</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lists.map((list) => (
              <div key={list.id} className="border p-4 rounded bg-gray-50">
                <h3 className="font-semibold mb-2">
                  List #{list.id} {list.title}
                </h3>
                <div className="text-sm leading-snug break-words">
                  {list.tags.map((tag, i) => (
                    <div key={i}>#{tag}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-6 relative">
              <div className="flex items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Create hashtag list
                  </h3>
                  <p className="text-sm text-gray-600">
                    Here you can create a new hashtag list
                  </p>
                </div>
              </div>
              <hr className="my-4 border-gray-200" />
              <label className="block mb-2">
                <span className="text-sm">List name</span>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </label>
              <label className="block mb-4">
                <span className="text-sm">Hashtags (comma separated)</span>
                <textarea
                  className="mt-1 block w-full border rounded px-3 py-2"
                  rows={4}
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </label>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddList}
                  className="px-4 py-2 bg-teal text-black hover:bg-cyan-500 transition border rounded cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
