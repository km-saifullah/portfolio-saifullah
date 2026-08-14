import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/dashboard/login";
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdmin =
    (req.auth?.user as { role?: string } | undefined)?.role === "admin";

  if (isDashboardRoute && !isLoginPage && !isAdmin) {
    const loginUrl = new URL("/dashboard/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
