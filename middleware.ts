import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { isPublicRoute, getRouteHandler } from "./utils/routeHandlers";

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/" || isPublicRoute(path)) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Handle new OAuth users
  if (session?.user.isNewUser && session.user.googleToken) {
    if (path !== "/register/select-user-type") {
      return NextResponse.redirect(
        new URL("/register/select-user-type", request.url),
      );
    }
  }

  // Redirect logged-in users trying to access auth pages
  if (session && ["/login", "/register"].includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const handler = getRouteHandler(path);
  if (handler) {
    const result = handler(session, request);
    if (result instanceof NextResponse) {
      return result;
    }
    return result
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.redirect(new URL("/unauthorized", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/login|/register|register/verify|/dashboard",
  ],
};
