import React from "react";
import SidePicture from "@/app/(auth)/_components/SidePicture";
import AuthFormSection from "@/app/(auth)/_components/AuthFormSection";
import PageWrapper from "@/components/PageWrapper";
import { FormType } from "@/constants/Types";

interface AuthPageProps {
  formType: FormType;
  pictureSrc: string;
  sidePic: "left" | "right";
}

const AuthPage: React.FC<AuthPageProps> = ({
  formType,
  pictureSrc,
  sidePic,
}) => {
  return (
    <PageWrapper className="shadow-md rounded-lg">
      <div className="bg-white max-h-screen md:h-1/3 w-full flex items-center justify-center p-5 my-auto">
        <SidePicture
          alt={formType}
          src={pictureSrc}
          className={`hidden md:flex ${sidePic === "left" ? "order-1" : "order-2"}`}
        />
        <AuthFormSection
          formType={formType}
          className={`form mb-2 w-full h-full md:w-2/5 ${sidePic === "left" ? "order-2" : "order-1"}`}
        />
      </div>
    </PageWrapper>
  );
};

export default AuthPage;
