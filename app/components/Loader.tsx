import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-gray-900 w-16 h-16 border-solid rounded-full animate-spin"></div>
    </div>
  );
}
