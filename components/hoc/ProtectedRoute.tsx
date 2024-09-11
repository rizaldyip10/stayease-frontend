"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!auth && pathname !== "/") {
      router.push("/login");
    }
  }, [auth, pathname, router]);

  if (isLoading) {
    return <div>Loading...</div>; // !TODO or a loading spinner
  }

  if (!auth) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
