"use client";
import React, { useState } from "react";

export default function Labels() {
  const [showModal, setShowModal] = useState(false);
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "Product Tags",
      items: ["NewArrival", "BestSeller", "Discount", "LimitedEdition"],
    },
    {
      id: 2,
      title: "User Roles",
      items: ["Admin", "Editor", "Subscriber", "Guest"],
    },
    // add more label lists as needed
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newItems, setNewItems] = useState("");

  const handleAddList = () => {
    if (!newTitle || !newItems) return;
    const id = lists.length + 1;
    setLists([
      ...lists,
      { id, title: newTitle, items: newItems.split(",").map((s) => s.trim()) },
    ]);
    setNewTitle("");
    setNewItems("");
    setShowModal(false);
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Labels</h1>
          <div className="w-16 h-1 bg-sky-400 rounded mt-1"></div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Labels Lists</h2>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <svg
                className="w-5 h-5 mr-1"
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
              New List
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lists.map((list) => (
              <div key={list.id} className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium mb-2">
                  List #{list.id}: {list.title}
                </h3>
                <ul className="text-sm space-y-1">
                  {list.items.map((item, idx) => (
                    <li key={idx} className="inline-flex items-center">
                      <span className="px-2 py-1 bg-gray-200 rounded-full">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Create label list</h2>
              <label className="block mb-3">
                <span className="text-sm">List name</span>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </label>
              <label className="block mb-4">
                <span className="text-sm">Labels (comma separated)</span>
                <textarea
                  className="mt-1 block w-full border rounded px-3 py-2"
                  rows={4}
                  value={newItems}
                  onChange={(e) => setNewItems(e.target.value)}
                />
              </label>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddList}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
