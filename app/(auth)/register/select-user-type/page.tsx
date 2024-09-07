"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function SelectUserType() {
  const [userType, setUserType] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ values: { userType }, isNew: true });
      router.push("/check-email"); // TODO : redirect to dashboard
    } catch (error) {
      console.error("Failed to set user type:", error);
      router.push("/login?error=select_user_failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Select User Type</h1>
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="">Select...</option>
        <option value="USER">User</option>
        <option value="TENANT">Tenant</option>
      </select>
      <button type="submit">Continue</button>
    </form>
  );
}
