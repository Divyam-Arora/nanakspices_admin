import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession, updateSession } from "./lib/session";

// 1. Specify protected and public routes
export const protectedRoutes = [
  "/dashboard",
  "/inventory",
  "/customers",
  "/orders",
];
export const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const session = getSession();
  console.log(session);

  // 4. Redirect
  if ((isProtectedRoute || req.nextUrl.pathname == "/") && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // updateSession();

  return NextResponse.next();
}
