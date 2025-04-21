import bcrypt from "bcryptjs";
import { connectDB } from "@/helper/db";
// import { User } from "@/models/user";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "@/models/user";

await connectDB();

// GET all users
export async function GET() {
  try {
    const users = await User.find(); // fetch all users
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to get users" },
      { status: 500 }
    );
  }
}

// POST a new user
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json() ;

    const saltRounds:string = "10";
    if (!saltRounds) throw new Error("Salt rounds not configured!");

    const salt = await bcrypt.genSalt(parseInt(saltRounds));
    const hashedPassword = await bcrypt.hash(password, salt); // <-- fixed to async

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully!",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create user" },
      { status: 500 }
    );
  }
}
