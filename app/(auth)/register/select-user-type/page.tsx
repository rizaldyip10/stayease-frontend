"use client";
import React from "react";
import AuthPage from "@/app/(auth)/_components/AuthPage";

const SelectUserTypePage: React.FC = () => {
  return (
    <AuthPage
      formType="userType"
      pictureSrc={`https://res.cloudinary.com/duxay6ujg/image/upload/v1726642932/select_zotmvs.webp`}
      sidePic="left"
    />
  );
};

export default SelectUserTypePage;
