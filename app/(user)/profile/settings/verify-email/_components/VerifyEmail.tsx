"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useChangeEmail } from "@/hooks/useChangeEmail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const VerifyEmail: React.FC = () => {
  const { completeChangeEmail, isLoading, error } = useChangeEmail();
  const [isVerified, setIsVerified] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    const router = useRouter();
    router.push("/dashboard");
  }

  const handleSubmit = async () => {
    if (!token) return;
    try {
      await completeChangeEmail(token);
      setIsVerified(true);
      setInitialized(true);
    } catch (error) {
      setIsVerified(false);
      setInitialized(false);
    }
  };

  // if (isLoading) {
  //   return <div>Verifying email change...</div>;
  // }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Email Change Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {!isVerified && (
            <div>
              <p className="mb-4">
                Click the button below to confirm your request to change email
                address. You will be logged out once your change is confirmed.
              </p>
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleSubmit}
                  className="bg-blue-950 text-white hover:text-blue-950"
                >
                  "Verify your new email address"
                </Button>
              )}
            </div>
          )}
          {initialized ? (
            isVerified ? (
              <div>
                <p className="text-green-600">
                  Your email has been successfully changed. Please log in with
                  your new email.
                </p>
                <Button asChild variant="link">
                  <Link href="/login">Take me to login page</Link>
                </Button>
              </div>
            ) : (
              <p className="text-red-600">
                {error ||
                  "Failed to verify email change. Please try again or contact support."}
              </p>
            )
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
