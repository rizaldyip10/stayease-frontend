"use client";
import React from "react";
import AuthPage from "@/app/(auth)/_components/AuthPage";

const Register: React.FC = () => {
  return (
    <AuthPage
      formType="register"
      pictureSrc={`https://res.cloudinary.com/duxay6ujg/image/upload/v1727460058/register-pic_sah7oo.webp`}
      sidePic="right"
    />
  );
};

export default Register;
