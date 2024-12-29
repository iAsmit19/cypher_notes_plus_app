import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("middleware triggered");

  // retrieve token from cookies
  const token = request.cookies.get("token")?.value;
  console.log("Retrieved token from cookies:", token);

  // if token is missing, redirect to login
  if (!token) {
    console.log("Token missing, redirecting to login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // optionally, validate the token here (e.g., decode or verify jwt)
  try {
    // token validation logic (if required)
    console.log("Token is valid, allowing access");
    return NextResponse.next();
  } catch (error) {
    console.error("Token validation failed:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/trash", "/archives"], // apply middleware only to these routes
};
