"use client";
import React from "react";
import AuthPage from "@/app/(auth)/_components/AuthPage";

const LogIn: React.FC = () => {
  return (
    <div>
      <AuthPage
        formType="login"
        pictureSrc={`https://res.cloudinary.com/duxay6ujg/image/upload/v1728102116/login-pic_js0mdl.webp`}
        sidePic="left"
      />
    </div>
  );
};

export default LogIn;
