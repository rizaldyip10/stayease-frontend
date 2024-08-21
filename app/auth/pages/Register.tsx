import React from "react";
import FormSection from "@/app/auth/components/FormSection2";
import SidePicture from "@/app/auth/components/SidePicture";

const Register: React.FC = () => {
  return (
    <>
      <FormSection className="form mb-2 w-full h-full md:w-2/5" />
      <SidePicture
        alt="sign-up"
        src="/sign-up-side-pic.webp"
        className="hidden md:flex"
      />
    </>
  );
};

export default Register;
