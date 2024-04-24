import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./features/auth/validateToken";

export async function middleware(request: NextRequest) {
  const isAuthorized = await validateToken();

  if (!isAuthorized) {
    const url = new URL("/login", process.env.NEXT_PUBLIC_CLIENT);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: "/post",
};
