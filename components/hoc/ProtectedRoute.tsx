"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  if (isLoading) {
    return <div>Loading...</div>; // !TODO or a loading spinner
  }

  if (!auth) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
