import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Client } from "@/models/client";
import { z } from "zod";
import type { NextRequest } from "next/server";
import { User } from "@/models/user";
import mongoose from "mongoose";

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

// Zod schema for validating incoming body
const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  company: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, "ji2b3on1e45on8ek6@ma43ra") as JwtPayload;
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    let clients;
    if (user.email === "admin@example.com") {
      // ✅ Admin: get all clients
      clients = await Client.find({});
    } else {
      // ✅ General user: get only their own clients
      clients = await Client.find({ userId: new mongoose.Types.ObjectId(userId) });
    }

    return NextResponse.json({ success: true, clients }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();

    // Validate request body
    const parsedData = clientSchema.parse(body);

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, "ji2b3on1e45on8ek6@ma43ra") as JwtPayload;
    const userId = new mongoose.Types.ObjectId(decoded.id);

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 401 }
      );
    }
    // console.log(typeof userId);
    // console.log({ ...parsedData, userId });

    const newClient = new Client({
      ...parsedData,
      userId,
    });

    await newClient.save();

    return NextResponse.json(
      { success: true, client: newClient },
      { status: 201 }
    );
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
