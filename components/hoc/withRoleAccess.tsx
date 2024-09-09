"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

export function withRoleAccess(
  WrappedComponent: ComponentType,
  allowedRoles: string[],
) {
  return function WithRoleAccess(props: any) {
    const { auth, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (
        !isLoading &&
        (!auth || !allowedRoles.includes(auth.userType.toUpperCase()))
      ) {
        router.push("/unauthorized");
      }
    }, [auth, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!auth || !allowedRoles.includes(auth.userType.toUpperCase())) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
