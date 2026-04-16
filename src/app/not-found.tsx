import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
