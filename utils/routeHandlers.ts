import { NextRequest, NextResponse } from "next/server";

type RouteHandler = (
  session: any,
  request: NextRequest,
) => boolean | NextResponse;

const publicRoutes = new Set([
  "/login",
  "/register",
  "/forgot-password",
  "/register/verify",
  "/about",
  "/properties",
  "/properties/*",
  "/faq",
]);

const routeHandlers = new Map<string, RouteHandler>([
  ["/dashboard/user", (session) => session.user.userType === "USER"],
  ["/dashboard/tenant", (session) => session.user.userType === "TENANT"],
  [
    "/dashboard",
    (session) => ["USER", "TENANT"].includes(session.user.userType),
  ],
  ["/bookings", (session) => session.user.userType === "USER"],
  [
    "/register/select-user-type",
    (session, request) =>
      session.user.isNewUser ||
      NextResponse.redirect(new URL("/", request.url)),
  ],
]);

export function isPublicRoute(path: string): boolean {
  if (publicRoutes.has(path)) {
    return true;
  }

  // Check for wildcard patterns
  for (const route of Array.from(publicRoutes)) {
    if (route.endsWith("*") && path.startsWith(route.slice(0, -1))) {
      return true;
    }
  }

  return false;
}

export function getRouteHandler(path: string): RouteHandler | undefined {
  const exactMatch = routeHandlers.get(path);
  if (exactMatch) {
    return exactMatch;
  }

  const partialMatch = Array.from(routeHandlers.keys()).find((route) =>
    path.startsWith(route),
  );

  return partialMatch ? routeHandlers.get(partialMatch) : undefined;
}
