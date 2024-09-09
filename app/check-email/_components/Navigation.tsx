"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const Navigation: React.FC = () => {
  const { auth } = useAuth();

  return (
    <nav>
      <p>${auth?.userType}</p>
      <Link href="/">Home</Link>
      {auth?.userType === "user" && (
        <Link href="/user-dashboard">User Dashboard</Link>
      )}
      {auth?.userType === "TENANT" && (
        <Link href="/check-email/tenant">Tenant Dashboard</Link>
      )}
      {auth?.userType === "admin" && (
        <Link href="/admin-dashboard">Admin Dashboard</Link>
      )}
      {!auth && <Link href="/login">Login</Link>}
      {auth && (
        <button
          onClick={() => {
            /* Implement logout logic */
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navigation;
