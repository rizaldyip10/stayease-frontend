"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth) {
      router.push("/dashboard");
    }
  }, [auth, router]);

  if (auth) {
    return <Skeleton />; // or a loading spinner
  }

  return <>{children}</>;
};

export default PublicRoute;
