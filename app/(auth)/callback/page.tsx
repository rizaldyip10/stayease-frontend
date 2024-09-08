"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthCallback() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      console.log("code:" + code);

      if (code) {
        try {
          await login({ values: { code }, isOAuth: true });
          router.push("/check-email"); // TODO : redirect to dashboard
        } catch (error) {
          console.error("Failed to exchange code for tokens:", error);
          router.push("/login?error=auth_failed");
        }
      } else {
        router.push("/login?error=no_code");
      }
    };

    handleCallback();
  }, [login, router]);

  // TODO : Make loading UI?
  return <div>Processing your login...</div>;
}
