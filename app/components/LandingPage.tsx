"use client";
import { currentUserAtom, loginAtom } from "@/store/authslice";
import { useAtom } from "jotai";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ModeToggle } from "@/components/mode-toggle";

export function LandingPage() {
  const [login] = useAtom(loginAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  console.log(currentUser);
  return (
    <div>
      <section className="container grid items-center gap-6 ">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {!login
              ? "Manage your freelance business with ease"
              : "Welcome Back"}
          </h1>
          <p className="md:text-xl">
            Keep track of clients, projects, and interactions all in one place.
            FreelanceCRM helps you stay organized and focused on what matters
            most.
          </p>
          {!login && (
            <div className="flex gap-4">
              <Link href="/signup">
                <button className="bg-[#6c63ff] px-2 text-white rounded-md py-2 font-semibold hover:bg-[#5a54e0] transition duration-200 cursor-pointer">
                  Get Started
                </button>
              </Link>
              <Link href="/login">
                <button className="bg-gray-400 px-2 text-white rounded-md py-2 font-semibold hover:bg-gray-500 transition duration-200 cursor-pointer">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
        {/* <div className="flex justify-center">
            <div className="relative h-[350px] w-[350px] rounded-lg bg-muted p-4 shadow-lg md:h-[450px] md:w-[450px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Dashboard Preview</h3>
                  <p className="text-muted-foreground">
                    Track clients, projects, and more
                  </p>
                </div>
              </div>
            </div>
          </div> */}
      </section>
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Features
          </h2>
          <p className="max-w-[85%]">
            Everything you need to manage your freelance business
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow">
            <h3 className="text-xl font-semibold">Client Management</h3>
            <p className="">
              Keep track of all your clients and their details in one place.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow">
            <h3 className="text-xl font-semibold">Project Tracking</h3>
            <p className="">
              Manage projects, deadlines, and budgets with ease.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow">
            <h3 className="text-xl font-semibold">Interaction Logs</h3>
            <p className="">
              Log all client interactions to maintain a complete history.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow">
            <h3 className="text-xl font-semibold">Reminders</h3>
            <p className="">
              Never miss an important deadline or follow-up again.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow">
            <h3 className="text-xl font-semibold">Dashboard Overview</h3>
            <p className="">
              Get a quick snapshot of your business at a glance.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow">
            <h3 className="text-xl font-semibold">Dark Mode</h3>
            <p className="">
              Work comfortably day or night with light and dark themes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
