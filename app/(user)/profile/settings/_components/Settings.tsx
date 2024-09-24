"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteAccount from "@/app/(user)/profile/settings/_components/DeleteAccount";
import ChangeCredentialButton from "@/app/(user)/profile/settings/_components/ChangeCredentialButton";

const SettingsPage: React.FC = () => {
  const cardContents = [
    {
      title: "Reset Password",
      component: (
        <ChangeCredentialButton
          variant="ghost"
          title="Request password reset"
          isPasswordReset={true}
          className="bg-blue-950 text-white hover:text-blue-950 font-semibold"
        />
      ),
    },
    {
      title: "Change Email",
      component: (
        <ChangeCredentialButton
          variant="ghost"
          title="Request email change"
          isPasswordReset={false}
          className="bg-blue-950 text-white hover:text-blue-950 font-semibold"
        />
      ),
    },
    {
      title: "Delete Account",
      component: <DeleteAccount />,
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-blue-950 mb-6">
        Account Settings
      </h1>
      {cardContents.map((content, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{content.title}</CardTitle>
          </CardHeader>
          <CardContent>{content.component}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SettingsPage;
