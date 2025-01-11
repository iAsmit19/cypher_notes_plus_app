import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // retrieve token from cookies
  const token = request.cookies.get("token")?.value;

  // if token is missing, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // optionally, validate the token here (e.g., decode or verify jwt)
  try {
    // token validation logic (if required)
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/trash", "/archives"], // apply middleware only to these routes
};
