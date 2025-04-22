import { atom } from "jotai";

export const loginAtom = atom<boolean>(false);

interface CurrentUser {
  username: string;
  email: string;
}

export const currentUserAtom = atom<CurrentUser>({
  username: "",
  email: "",
});

