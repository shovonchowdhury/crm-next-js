"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useAtom } from "jotai";
import { clientsAtom, Client } from "@/store/clientSlice"; // ✅ Importing Client type
import ClientCard from "../components/client/ClientCard";

export default function ViewClientsPage() {
  const [clients, setClients] = useAtom(clientsAtom);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get<{ clients: Client[] }>("/api/clients");
        setClients(response.data.clients);
        setLoading(false);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchClients();
  }, [setClients]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center font-bold mb-6">Your Clients</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <ClientCard key={client._id} client={client} />
        ))}
      </div>
      {clients.length === 0 && !loading && (
        <p className="text-gray-500 text-center">No clients found</p>
      )}
    </div>
  );
}
