import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { publicRoutes, routeHandlers } from "./utils/routeHandlers";

export type RouteHandler = (
  session: any,
  request: NextRequest,
) => boolean | NextResponse;

export interface RouteConfig {
  route: string;
  handler: RouteHandler;
}
export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public routes access
  if (publicRoutes.some((route) => path === route)) {
    return NextResponse.next();
  }
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const handler = findMatchingHandler(path);

  if (handler) {
    const result = handler(session, request);
    if (result === true) return NextResponse.next();
    if (result instanceof NextResponse) return result;
  }

  return NextResponse.redirect(new URL("/unauthorized", request.url));
}

function findMatchingHandler(path: string) {
  return routeHandlers.find(({ route }) => path.startsWith(route))?.handler;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/properties/:path*",
    "/bookings/:path*",
    "/register/:path*",
    // Add more matchers as needed
  ],
};
