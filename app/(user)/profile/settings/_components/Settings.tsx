import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPassword from "@/app/(user)/profile/settings/_components/PlaceholderResetPassword";
import ChangeEmail from "@/app/(user)/profile/settings/_components/ChangeEmail";
import DeleteAccount from "@/app/(user)/profile/settings/_components/DeleteAccount";

const SettingsPage: React.FC = () => {
  const cardContents = [
    {
      title: "Reset Password",
      // !TODO placeholder to be replaced with ResetPassword component
      component: <ResetPassword />,
    },
    {
      title: "Change Email",
      component: <ChangeEmail /> || null,
    },
    {
      title: "Delete Account",
      component: <DeleteAccount /> || null,
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
