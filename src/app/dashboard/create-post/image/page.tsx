"use client";
import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { DateTime } from "luxon";
import Image from "next/image";

type Account = { id: number; name: string; avatar: string };

export default function CreateImagePost() {
  const accounts: Account[] = [
    { id: 1, name: "All accounts", avatar: "/avatars/all.png" },
    { id: 2, name: "Instagram", avatar: "/avatars/ig.png" },
    { id: 3, name: "Facebook", avatar: "/avatars/fb.png" },
    { id: 4, name: "Threads", avatar: "/avatars/threads.png" },
    { id: 5, name: "LinkedIn", avatar: "/avatars/linkedin.png" },
    { id: 6, name: "TikTok", avatar: "/avatars/tiktok.png" },
    { id: 7, name: "Pinterest", avatar: "/avatars/pinterest.png" },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>(
    accounts.map((a) => a.id)
  );

  const toggleAccount = (id: number) => {
    setSelectedAccounts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const [caption, setCaption] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleFiles = (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
  ) => {
    const fileList =
      "dataTransfer" in e ? e.dataTransfer.files : e.target.files;
    if (!fileList) return;
    const files = Array.from(fileList);
    setImages((prev) => [...prev, ...files]);
  };

  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop"
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [scheduledDate, setScheduledDate] = useState<string>(
    DateTime.now().toFormat("yyyy-LL-dd")
  );
  const [scheduledTime, setScheduledTime] = useState<string>(
    DateTime.now().toFormat("HH:mm")
  );

  const publishPost = () => {
    console.log("Publish now", { caption, images });
  };
  const schedulePost = () => {
    console.log("Scheduled", { caption, images, scheduledDate, scheduledTime });
    setShowCalendar(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Create a new post (Image)</h1>

      {/* Search & Filter */}
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search account"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-1 flex-1 max-w-xs"
        />
        <button
          type="button"
          onClick={() => setShowFilter(!showFilter)}
          className="border rounded px-3 py-1 flex items-center"
        >
          Filter
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h18M3 12h12M3 20h18"
            />
          </svg>
        </button>
      </div>

      {/* Account Avatars */}
      <div className="flex overflow-x-auto mb-8 space-x-3">
        {accounts
          .filter(
            (a) =>
              a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              a.id === 1
          )
          .map((acc) => (
            <button
              key={acc.id}
              type="button"
              onClick={() => toggleAccount(acc.id)}
              className={`border-2 rounded-full p-1 transition-colors ${
                selectedAccounts.includes(acc.id)
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <Image
                src={acc.avatar}
                alt={acc.name}
                className="w-12 h-12 rounded-full object-cover"
                width={48}
                height={48}
              />
            </button>
          ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Caption & Upload */}
        <div className="flex-1 space-y-4">
          <label className="block text-lg font-medium">Your caption</label>
          <div className="bg-white rounded-lg p-4">
            <textarea
              rows={6}
              placeholder="Write something here..."
              className="w-full border-none focus:ring-0 resize-none"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="space-x-2">
                <button className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  #Hashtags
                </button>
                <button className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  Labels
                </button>
              </div>
              <div className="space-x-3 text-gray-400">
                {/* Toolbar icons */}
                <button>
                  <span>B</span>
                </button>
                <button>
                  <em>I</em>
                </button>
                <button>🔄</button>
                <button>😊</button>
              </div>
            </div>
          </div>

          {/* Image thumbnails row */}
          <div className="flex items-center space-x-3">
            {images.map((file, idx) => (
              <Image
                key={idx}
                src={URL.createObjectURL(file)}
                alt="upload"
                className="w-16 h-16 object-cover rounded-lg"
              />
            ))}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 bg-white border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400"
            >
              <span className="text-2xl">+</span>
            </button>
          </div>

          {/* Upload Zone */}
          <div
            className="bg-white rounded-lg p-6 text-center text-gray-500 border-2 border-dashed cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFiles}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFiles}
            />
            Click or Drag & Drop Media
          </div>
        </div>

        {/* Right: Preview Panel */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Post Preview</span>
            <div className="flex items-center space-x-2">
              <select className="border rounded px-2 py-1 text-sm">
                <option>Filter</option>
              </select>
              <button
                onClick={() => setPreviewMode("desktop")}
                className={`${
                  previewMode === "desktop" ? "text-blue-600" : ""
                }`}
              >
                🖥️
              </button>
              <button
                onClick={() => setPreviewMode("mobile")}
                className={`${previewMode === "mobile" ? "text-blue-600" : ""}`}
              >
                📱
              </button>
            </div>
          </div>
          <div
            className="border rounded-lg overflow-hidden"
            style={{ height: previewMode === "mobile" ? 500 : 600 }}
          >
            {/* Placeholder for embed */}
            <Image
              src="/preview-placeholder.png"
              alt="preview"
              className="w-full h-full object-cover"
              width={500}
              height={600}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={publishPost}
          className="px-4 py-2 bg-white border rounded"
        >
          Publish
        </button>
        <button
          onClick={() => setShowCalendar(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Schedule
        </button>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Select Date & Time</h2>
            <div className="space-y-4">
              <label className="block text-sm">Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              <label className="block text-sm">Time</label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowCalendar(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={schedulePost}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
