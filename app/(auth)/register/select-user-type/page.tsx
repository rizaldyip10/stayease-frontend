"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import authService from "@/services/authService";

const SelectUserType: React.FC = () => {
  const [userType, setUserType] = useState<"USER" | "TENANT" | undefined>(
    undefined,
  );
  const [businessName, setBusinessName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, update } = useSession();

  const isFormValid = () => {
    if (!userType) return false;
    if (userType === "TENANT" && !businessName) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!session?.user.googleToken) {
      setError("No Google token found. Please try logging in again.");
      return;
    }

    if (!session.user.isNewUser) {
      router.push("/dashboard");
      return;
    }

    if (!userType) {
      setError("Please select a user type");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.registerOAuth2({
        googleToken: session.user.googleToken,
        userType,
        businessName: userType === "TENANT" ? businessName : undefined,
        taxId: userType === "TENANT" ? taxId : undefined,
      });

      console.log("Registration response:", response);

      console.log("Session before update:", session);
      const updatedSession = await update({
        ...session,
        user: {
          ...session.user,
          id: response.id,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          avatar: response.avatar,
          userType: response.userType,
          isVerified: response.isVerified,
          isOAuth2: response.isOAuth2,
          accessToken: response.token.accessToken,
          refreshToken: response.token.refreshToken,
          expiresAt: response.token.expiresAt,
          googleToken: null, // Clear the Google token
          isNewUser: false, // Set isNewUser to false
        },
      });

      alert("Registration successful! Please sign back in");
      signOut();
      router.push("/");

      // console.log("Updated session:", updatedSession);
      // console.log("Session after update:", session);
      // // Force session re-fetch by reloading the page
      // router.refresh(); // Ensure the session is fully refreshed from the server
      // router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Select User Type</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value as "USER" | "TENANT")}
          required
        >
          <option value="">Select...</option>
          <option value="USER">User</option>
          <option value="TENANT">Tenant</option>
        </select>
        {userType === "TENANT" && (
          <>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Business Name"
              required
            />
            <input
              type="text"
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              placeholder="Tax ID (optional)"
            />
          </>
        )}
        <button type="submit" disabled={!isFormValid() || isLoading}>
          {isLoading ? "Loading..." : "Continue"}
        </button>
      </form>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default SelectUserType;
