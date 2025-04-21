"use client";

import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import signupSvg from "../../../public/undraw_online-ad_t56y.svg";

const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z.string().min(3, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error will appear under confirmPassword field
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupFormData, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SignupFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      console.log("Validated Data:", result.data);
      setErrors({});
    }
  };

  return (
    <div className="w-[90%] max-h-screen flex flex-col items-center  md:flex-row   mx-auto pt-10 gap-2 md:gap-14">
      {/* <div className="flex justify-center mb-4">
        
      </div> */}
      <div className="w-full md:w-1/2">
        <Image src={signupSvg} alt="Signup" className="" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex  w-full md:w-1/2 flex-col gap-4 "
      >
        <h2 className="text-2xl font-bold mb-4 text-center ">Sign Up</h2>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded w-full p-2 bg-gray-100"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded w-full p-2 bg-gray-100"
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
            className="border rounded w-full p-2 bg-gray-100"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border rounded w-full p-2 bg-gray-100"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white font-bold p-2 rounded hover:bg-green-700 transition cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
