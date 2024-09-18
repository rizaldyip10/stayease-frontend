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

  if (["/login", "/register"].includes(path)) {
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
