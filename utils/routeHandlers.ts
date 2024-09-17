import { NextRequest, NextResponse } from "next/server";

type RouteHandler = (
  session: any,
  request: NextRequest,
) => boolean | NextResponse;

interface RouteConfig {
  route: string;
  handler: RouteHandler;
}

const dashboardHandlers: RouteConfig[] = [
  {
    route: "/dashboard/user",
    handler: (session) => session.user.userType === "USER",
  },
  {
    route: "/dashboard/tenant",
    handler: (session) => session.user.userType === "TENANT",
  },
  {
    route: "/dashboard",
    handler: (session) => ["USER", "TENANT"].includes(session.user.userType),
  },
];

const propertyHandlers: RouteConfig[] = [
  {
    route: "/properties",
    handler: (session) => session.user.userType === "TENANT",
  },
];

const bookingHandlers: RouteConfig[] = [
  {
    route: "/bookings",
    handler: (session) => session.user.userType === "USER",
  },
];

const registrationHandlers: RouteConfig[] = [
  {
    route: "/register/select-user-type",
    handler: (session, request) => {
      if (session.user.isNewUser === true) return true;
      return NextResponse.redirect(new URL("/", request.url));
    },
  },
];

export const routeHandlers: RouteConfig[] = [
  ...dashboardHandlers,
  ...propertyHandlers,
  ...bookingHandlers,
  ...registrationHandlers,
  // Add more route handler groups as needed
];
