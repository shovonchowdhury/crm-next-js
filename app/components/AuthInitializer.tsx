"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { currentUserAtom, loginAtom } from "@/store/authslice";
import axios from "axios";

export default function AuthInitializer() {
  const [login, setLogin] = useAtom(loginAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("/api/currentUser");

        if (res.data.user) {
          setLogin(true);
          setCurrentUser(res.data.user);
        } else {
          setLogin(false);
        }
      } catch (err) {
        console.error(err);
        setLogin(false);
      }
    };

    checkLogin();
  }, [setLogin]);

  return null;
}
