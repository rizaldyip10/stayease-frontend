"use client";
import React from "react";
import AuthCard from "@/app/auth/components/AuthCard";
import { FormType, UserType } from "@/constants/Types";

const LogIn: React.FC = () => {
  const [userType, setUserType] = React.useState<UserType>("user");
  const [formType, setFormType] = React.useState<FormType>("login");
  return (
    <div>
      <AuthCard
        userType={"user"}
        setUserType={setUserType}
        formType={formType}
      />
    </div>
  );
};

export default LogIn;
