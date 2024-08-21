"use client";
import React, { useState } from "react";
import Register from "@/app/auth/pages/Register";
import LogIn from "@/app/auth/pages/LogIn";

const Auth: React.FC = () => {
  const [authType, setAuthType] = useState("login");

  return (
    // <>
    //   <FormSection className="form mb-2 w-full h-full md:w-2/5" />
    //   <SidePicture
    //     alt="sign-up"
    //     src="/sign-up-side-pic.webp"
    //     className="hidden md:flex"
    //   />
    // </>
    <>{authType === "login" ? <LogIn /> : <Register />}</>
  );
};

export default Auth;
