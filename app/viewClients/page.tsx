"use client";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useAtom } from "jotai";
import { clientsAtom } from "@/store/clientSlice";
import { useRouter } from "next/navigation";

export default function ViewClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useAtom(clientsAtom);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("/api/clients");
        setClients(response.data.clients);
        setLoading(false);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchClients();
  }, [setClients]);

  const onDelete = async (clientId) => {
    try {
      // Show SweetAlert confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/clients/${clientId}`);
        Swal.fire("Deleted!", "Your client has been deleted.", "success"); // Show success alert
        setClients(clients.filter((client) => client._id === clientId));
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Something went wrong. Please try again.", "error"); // Show error alert if something fails
    }
  };

 

  if (loading) return <Loader />;

  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-2xl text-center font-bold mb-6">Your Clients</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Client name
              </th>
              <th scope="col" className="px-6 py-3">
                Client Email
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((client) => (
              <tr
                key={client._id}
                onClick={() => router.push(`/viewClients/${client._id}`)}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {client.name}
                </th>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.company}</td>
                <td className="px-6 py-4">{client.phone}</td>
                <td className="px-6 py-4 flex gap-3 justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/editClient/${client._id}`);
                    }}
                    className="font-medium  text-blue-600 dark:text-blue-500 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(client._id);
                    }}
                    className="text-red-500 font-medium  cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {clients.length === 0 && !loading && (
        <p className="text-gray-500 text-center">No clients found</p>
      )}
    </div>
  );
}
