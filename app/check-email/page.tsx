"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const AuthStatusPage: React.FC = () => {
  const { auth, isLoading, logout } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Authentication Status</h1>
      {auth ? (
        <div>
          <p className="mb-2">Logged in as: {auth.email}</p>
          <p className="mb-2">User Type: {auth.userType}</p>
          <p className="mb-2">
            Name: {auth.firstName} {auth.lastName}
          </p>
          <Button onClick={() => logout()} className="mt-4">
            Log Out
          </Button>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
};

export default AuthStatusPage;
