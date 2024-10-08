"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useChangeEmail } from "@/hooks/auth/useChangeEmail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useCheckToken } from "@/hooks/auth/useCheckToken";
import GlobalLoading from "@/components/GlobalLoading";
import ErrorComponent from "@/components/ErrorComponent";

const VerifyEmail: React.FC = () => {
  const {
    completeChangeEmail,
    isLoading: isChangeEmailLoading,
    error: changeEmailError,
  } = useChangeEmail();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const {
    isTokenValid,
    isLoading: isTokenLoading,
    error: tokenError,
  } = useCheckToken({
    formType: "changeEmail",
    token: token,
  });

  const [isVerified, setIsVerified] = useState(false);
  const [initialized, setInitialized] = useState(false);

  if (isTokenValid === null || isTokenLoading) {
    return <GlobalLoading fullPage />;
  }

  if (!isTokenValid) {
    return (
      <ErrorComponent message="Invalid token. Please make sure you follow the correct link sent to your email!" />
    );
  }

  if (!token) {
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
              {isChangeEmailLoading ? (
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
                  Verify your new email address
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
                {changeEmailError ||
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
