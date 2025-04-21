"use client";

import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import signupSvg from "../../../public/undraw_online-ad_t56y.svg"; // you can keep same image or replace if needed

// Login Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
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

  const handleSubmit = (e: React.FormEvent) => {
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
      // You can continue with login API call here
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
            className="border rounded w-full p-2"
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
            className="border rounded w-full p-2"
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
    </div>
  );
}
