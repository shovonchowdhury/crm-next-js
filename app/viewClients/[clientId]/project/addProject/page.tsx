"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  budget: z.string().min(1, "Budget is required"),
  status: z.string().min(1, "Status is required"),
  deadline: z.string().min(1, "Deadline is required"),
});

interface Project {
  title: string;
  budget: string;
  status: string;
  deadline: string;
}

export default function AddProject() {
  const router = useRouter();
  const params = useParams() as { clientId?: string };
  const clientId = params.clientId;

  const [project, setProject] = useState<Project>({
    title: "",
    budget: "",
    status: "",
    deadline: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Project, string>>>(
    {}
  );
  const [submitState, setSubmitState] = useState("Create Project");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = projectSchema.safeParse(project);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof Project;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({}); // clear errors
    if (!clientId) {
      toast.error("Client ID not found!", { position: "top-center" });
      return;
    }

    try {
      setSubmitState("Creating...");
      const res = await axios.post("/api/projects", project);
      console.log(project);
      toast.success("Project created successfully!", {
        position: "top-center",
      });
      setSubmitState("Create Project");
      setProject({ title: "", budget: "", status: "", deadline: "" });
      router.push(`/viewClients/${clientId}`);
    } catch (error) {
      console.error(error);
      toast.error("Project creation failed!", { position: "top-center" });
      setSubmitState("Create Project");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white px-6 pb-4 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Project</h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Title */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            placeholder="Project title"
            className="border rounded-lg px-3 py-2 bg-gray-100"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
          {errors.title && (
            <span className="text-red-600 text-sm">{errors.title}</span>
          )}
        </div>

        {/* Budget */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Budget</label>
          <input
            type="text"
            placeholder="Project budget"
            className="border rounded-lg px-3 py-2 bg-gray-100"
            value={project.budget}
            onChange={(e) => setProject({ ...project, budget: e.target.value })}
          />
          {errors.budget && (
            <span className="text-red-600 text-sm">{errors.budget}</span>
          )}
        </div>

        {/* Deadline */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Deadline</label>
          <input
            type="date"
            className="border rounded-lg px-3 py-2 bg-gray-100"
            value={project.deadline}
            onChange={(e) =>
              setProject({ ...project, deadline: e.target.value })
            }
          />
          {errors.deadline && (
            <span className="text-red-600 text-sm">{errors.deadline}</span>
          )}
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Status</label>
          <select
            className="border rounded-lg px-3 py-2 bg-gray-100"
            value={project.status}
            onChange={(e) => setProject({ ...project, status: e.target.value })}
          >
            <option value="" disabled>
              ---Select Status---
            </option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <span className="text-red-600 text-sm">{errors.status}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 sm:justify-center">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg "
          >
            {submitState}
          </button>
        </div>
      </form>
    </div>
  );
}
