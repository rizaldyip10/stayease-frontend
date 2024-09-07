"use client";
import React from "react";
import { withRoleAccess } from "@/components/withRoleAccess";

const TenantTest = () => {
  return <div>Welcome to the Tenant Test!</div>;
};

export default withRoleAccess(TenantTest, ["TENANT"]);
