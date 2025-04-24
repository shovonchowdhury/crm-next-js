"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { clientsAtom } from "@/store/clientSlice";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import axios from "axios";
import { toast } from "react-toastify";

type Client = {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  notes: string;
};

type Project = {
  _id: string;
  title: string;
  status: string;
};

export default function ClientDetailsPage() {
  const router = useRouter();
  const params = useParams() as { clientId?: string };
  const clientId = params.clientId;
  const [clientDetails, setClientDetails] = useState<Client | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchClient = async () => {
      if (!clientId) return;
      try {
        // setLoading(true);
        const response = await axios.get(`/api/clients/${clientId}`);
        setClientDetails(response.data.client);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch client details.", {
          position: "top-center",
        });
      }
    };

    const fetchProjects = async () => {
      if (!clientId) return;
      try {
        // setLoading(true);
        const response = await axios.get(`/api/projects`);
        setProjects(response.data.projects);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch client projects.", {
          position: "top-center",
        });
      }
    };

    fetchClient();
    fetchProjects();
  }, [clientId]);

  const handleCreateProject = () => {
    if (clientId) {
      router.push(`/viewClients/${clientId}/project/addProject`);
    }
  };

  if (!clientDetails) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center relative pb-6 sm:pb-8">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Client Profile
            </span>
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 h-1 w-20 sm:w-24 bg-blue-600 rounded-full"></div>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Client Info Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg sm:shadow-2xl shadow-blue-100/50 border border-blue-50">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 bg-blue-100 rounded-xl sm:rounded-2xl">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Client Information
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[
                { label: "Name", value: clientDetails.name },
                { label: "Email", value: clientDetails.email },
                { label: "Phone", value: clientDetails.phone },
                ...(clientDetails.company
                  ? [{ label: "Company", value: clientDetails.company }]
                  : []),
                ...(clientDetails.notes
                  ? [{ label: "Notes", value: clientDetails.notes }]
                  : []),
              ].map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-1 sm:grid-cols-[120px_1fr] items-baseline gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-blue-50/50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    {item.label}
                  </span>
                  <p className="text-base sm:text-lg font-medium text-gray-700 break-words">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg sm:shadow-2xl shadow-indigo-100/50 border border-indigo-50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-indigo-100 rounded-xl sm:rounded-2xl">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Projects
                </h2>
              </div>
              <button
                onClick={handleCreateProject}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full sm:rounded-full shadow-md hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-sm sm:text-lg">
                  No projects found. Start by creating a new one!
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100 hover:border-indigo-200 transition-all hover:bg-indigo-50/30 cursor-pointer gap-2 sm:gap-0"
                  >
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                        {project.title}
                      </h3>
                    </div>
                    <span
                      className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                        project.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : project.status === "in progress"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
