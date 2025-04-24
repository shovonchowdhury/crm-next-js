"use client";

import Loader from "@/app/components/Loader";
import { clientsAtom } from "@/store/clientSlice";
import axios from "axios";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

const clientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "10 digit required for Phone Number"),
  company: z.string().optional(),
  notes: z.string().optional(),
});
type Client = {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  notes: string;
};

type ClientDetailsData = z.infer<typeof clientSchema>;

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const [clients, setClients] = useAtom(clientsAtom);
  const { clientId } = params;
  const [clientDetails, setClientDetails] = useState<Client | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ClientDetailsData, string>>
  >({});

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

    fetchClient();
  }, [clientId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setClientDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = clientSchema.safeParse(clientDetails);
    if (!result.success) {
      const newErrors: Partial<Record<keyof ClientDetailsData, string>> = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0] as keyof ClientDetailsData;
        newErrors[path] = err.message;
      });
      setErrors(newErrors);
    } else {
      console.log("Form Data:", clientDetails);
      setErrors({});

      // Submit or reset logic here
      try {
        const res = await axios.put(
          `/api/clients/${clientDetails?._id}`,
          result.data
        );
        console.log(res.data);
        toast.success("Client Info Updated Successfully!!!");
        router.push("/viewClients");
      } catch (err) {
        console.log(err);
        toast.error("Sign Up Error!!");
      }
    }
  };

  if (!clientDetails) {
    return <Loader />;
  }

  return (
    <div className="md:w-[80%] mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">
        Edit Client Information
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={clientDetails?.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Client's Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={clientDetails?.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Client's Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              value={clientDetails?.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="123-45-678"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="company"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              value={clientDetails?.company}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Client's Company"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="notes"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            value={clientDetails?.notes}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Write any notes about the client..."
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white md:text-xl cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Edit Info
          </button>
        </div>
      </form>
    </div>
  );
}
