"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="border-b fixed top-0 left-0 w-full text-white  bg-[#6c63ff] z-50">
      <div className=" w-[80%] mx-auto ">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold">
              FreelanceCRM
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* <ModeToggle /> */}
            <Link href="/login" className="hover:text-gray-400">
              Login
            </Link>
            <Link href="/signup" className="hover:text-gray-400">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
