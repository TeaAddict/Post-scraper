import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./features/auth/validateToken";

export async function middleware(request: NextRequest) {
  const isAuthorized = await validateToken();

  const url = new URL("/login", process.env.NEXT_PUBLIC_CLIENT);
  if (!isAuthorized) {
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: "/post",
};
