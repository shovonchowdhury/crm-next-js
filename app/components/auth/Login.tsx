"use client";

import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import signupSvg from "../../../public/undraw_online-ad_t56y.svg"; // you can keep same image or replace if needed
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { useAtom } from "jotai";
import { currentUserAtom, loginAtom } from "@/store/authslice";
import Link from "next/link";

// Login Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [login, setLogin] = useAtom(loginAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LoginFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      console.log("Validated Data:", result.data);
      setErrors({});
      try {
        const res = await axios.post("/api/login", result.data);
        console.log(res.data);
        toast.success("Logged In Successfully!!!");
        setLogin(true);
        setCurrentUser(res.data.user);
        router.push("/");
      } catch (err) {
        console.log(err);
        toast.error("Invalid Email or Password");
      }
    }
  };

  return (
    <div className="w-[80%] md:w-[60%] lg:w-[40%] mx-auto pt-10">
      <div className="flex flex-col items-center justify-center mb-4">
        <Image src={signupSvg} alt="Login" className="mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white font-bold p-2 rounded hover:bg-green-700 transition cursor-pointer"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>
          Have no account?{" "}
          <Link href="/signup" className="text-black hover:underline">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
}
