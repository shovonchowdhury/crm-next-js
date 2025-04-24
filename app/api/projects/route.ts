import { connectDB } from "@/helper/db";
import Project from "@/models/project";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Connect to DB
await connectDB();

// Zod schema
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  budget: z.string().min(1, "Budget is required"),
  status: z.enum(["pending", "in progress", "completed"], {
    required_error: "Status is required",
  }),
  deadline: z.string().min(1, "Deadline is required").transform((val) => new Date(val)),
});

export async function GET() {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, projects }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate data with z.parse (throws an error if validation fails)
    const parsed = projectSchema.parse(body);

    // Get token and verify
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, "ji2b3on1e45on8ek6@ma43ra") as { id: string };
    const clientId = new mongoose.Types.ObjectId(decoded.id); // Convert to ObjectId

    // Create project with clientId
    const newProject = await Project.create({
      ...parsed, // Directly use the parsed data
      clientId,
    });

    return NextResponse.json(
      { success: true, project: newProject },
      { status: 201 }
    );
  } catch (error: any) {
    // If validation fails, it will automatically throw an error, so handle it here
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
