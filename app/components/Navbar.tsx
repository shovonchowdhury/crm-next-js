"use client";
import { loginAtom } from "@/store/authslice";
import axios from "axios";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [login, setLogin] = useAtom(loginAtom);

  const userLogOutHandle = async () => {
    const res = await axios.post("/api/logout");
    console.log(res.data);
    setLogin(false);
    router.push("/login");
  };

  const isActive = (path:string) =>
    pathname === path ? "bg-white text-black" : "hover:text-gray-300 bg-[#443ebd] md:bg-[#6c63ff]";

  return (
    <div className="fixed top-0 left-0 w-full text-white  bg-[#6c63ff] z-50">
      <div className="">
        <div className="w-[90%] mx-auto">
          <div className="flex h-12 md:h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold">
                FreelanceCRM
              </Link>
            </div>
            {login && (
              <div className="h-1/2 hidden md:flex items-center space-x-6 text-base absolute left-1/2 transform -translate-x-1/2">
                <Link
                  href={"/"}
                  className={`px-2 rounded-md flex items-center ${isActive(
                    "/"
                  )}`}
                >
                  Home
                </Link>

                <Link
                  href="/viewClients"
                  className={`px-2 rounded-md flex items-center ${isActive(
                    "/viewClients"
                  )}`}
                >
                  Your Client
                </Link>

                <Link
                  href={"/addClient"}
                  className={`px-2 rounded-md flex items-center ${isActive(
                    "/addClient"
                  )}`}
                >
                  Add Client
                </Link>
              </div>
            )}
            <div className="flex items-center gap-4">
              {!login ? (
                <>
                  <Link
                    href="/login"
                    className="cursor-pointer text-[18px] px-2 py-0.5 rounded-md  hover:bg-white hover:text-[#6c63ff]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="cursor-pointer text-[18px] px-2 py-0.5 rounded-md  hover:bg-white hover:text-[#6c63ff]"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={userLogOutHandle}
                  className="cursor-pointer text-[18px] font-medium px-2 py-0.5 rounded-md  hover:bg-white hover:text-[#6c63ff]"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {login && (
        <div className="mt-2 flex  md:hidden  text-base ">
          <Link
            href={"/"}
            className={` flex flex-1 py-1 items-center justify-center ${isActive(
              "/"
            )}`}
          >
            Home
          </Link>

          <Link
            href="/viewClients"
            className={`flex flex-1 py-1 items-center justify-center ${isActive(
              "/viewClients"
            )}`}
          >
            Your Client
          </Link>

          <Link
            href={"/addClient"}
            className={`flex flex-1 py-1 items-center justify-center ${isActive(
              "/addClient"
            )}`}
          >
            Add Client
          </Link>
        </div>
      )}
    </div>
  );
}
