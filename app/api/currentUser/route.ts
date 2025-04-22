import { connectDB } from "@/helper/db";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export async function GET(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "No token provided, user not logged in.", user: null },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, "ji2b3on1e45on8ek6@ma43ra") as JwtPayload;
    console.log(decoded);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json(
        { message: "User not found.", user: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User is logged in", user:{email:user.email, username: user.username} },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Invalid token, user not logged in.", user: null },
      { status: 401 }
    );
  }
}
