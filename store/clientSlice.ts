import { atom } from "jotai";

export type ClientType = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company: string | null;
    notes: string | null;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
  };
  
export const clientsAtom = atom<ClientType[]>([]);