"use client";
import React from "react";
import UserDashboard from "@/app/dashboard/(user)/UserDashboard";
import TenantDashboard from "@/app/dashboard/(tenant)/TenantDashboard";
import { useSession } from "next-auth/react";

const DashboardHomePage = () => {
  const { data: session } = useSession();
  if (session?.user?.userType === "USER") {
    return <UserDashboard />;
  }
  return <TenantDashboard />;
};

export default DashboardHomePage;
