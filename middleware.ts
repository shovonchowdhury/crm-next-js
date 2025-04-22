import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const requestedUrl = request.nextUrl.pathname;

  console.log(requestedUrl);

  if (requestedUrl === "/login" || requestedUrl === "/signup") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url)); // <-- Correct redirect
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup","/addClient"],
};
