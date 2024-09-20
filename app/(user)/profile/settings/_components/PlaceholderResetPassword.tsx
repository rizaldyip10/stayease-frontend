"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const ResetPassword: React.FC = () => {
  const handleResetPassword = () => {
    alert("Reset password functionality to be implemented");
  };

  return (
    <div>
      <p className="mb-4">Click the button below to reset your password.</p>
      <Button
        onClick={handleResetPassword}
        className="bg-blue-950 text-white hover:bg-blue-900"
      >
        Reset Password
      </Button>
    </div>
  );
};

export default ResetPassword;
