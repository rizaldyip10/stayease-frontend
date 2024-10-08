"use client";
import React from "react";
import UserDashboard from "@/app/dashboard/(user)/UserDashboard";
import TenantDashboard from "@/app/dashboard/(tenant)/TenantDashboard";
import { useSession } from "next-auth/react";
import GlobalLoading from "@/components/GlobalLoading";

const DashboardHomePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <GlobalLoading width={100} height={100} />;
  }

  return session?.user?.userType === "USER" ? (
    <UserDashboard />
  ) : (
    <TenantDashboard />
  );
};

export default DashboardHomePage;
