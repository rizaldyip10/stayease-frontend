import React from "react";
import SidePicture from "@/app/register/user/components/SidePicture";
import FormSection from "@/app/register/user/components/FormSection";

const UserRegister: React.FC = () => {
  return (
    <div className="bg-white h-[764px] md:h-1/3 flex flex-row items-center justify-center my-auto">
      <FormSection className="form mb-2 w-full md:w-1/2" />
      <div className="hidden md:flex">
        <SidePicture alt="sign-up" src="/sign-up-side-pic.webp" />
      </div>
    </div>
  );
};

export default UserRegister;
