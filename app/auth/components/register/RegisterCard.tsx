import { Button } from "@/components/ui/button";
import Image from "next/image";
import googleLogo from "@/assets/icons/google-icon.png";
import Link from "next/link";
import RegisterForm from "@/app/auth/components/register/RegisterForm";
import React from "react";
import logo from "@/assets/images/logo_horizontal.png";
import { UserType } from "@/constants/Types";

interface RegisterCardProps {
  onSubmit: (value: string) => void;
  userType: "user" | "tenant";
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterCard: React.FC<RegisterCardProps> = ({
  onSubmit,
  userType,
  setUserType,
  setEmail,
}) => {
  return (
    <div className="w-96 max-sm:w-80 max-sm:px-5 flex flex-col items-center bg-white px-7 py-10 gap-5 md:gap-7">
      <div className="w-full flex flex-col items-center md:gap-3 gap-2 md:mb-5">
        <Image src={logo} alt="logo" height={50} className="md:hidden mb-10" />
        <h1 className="text-3xl font-bold text-appblue-800 md:text-left">
          Register
        </h1>
        <p>Choose account type:</p>
        <p>
          <span
            className={
              userType === "user"
                ? "font-bold p-1 bg-appblue-900 text-white rounded-sm"
                : "font-normal"
            }
            onClick={() => setUserType("user")}
          >
            <a>User</a>
          </span>{" "}
          /{" "}
          <span
            className={
              userType === "tenant"
                ? "font-bold p-1 bg-appblue-900 text-white rounded-sm"
                : "font-normal"
            }
            onClick={() => setUserType("tenant")}
          >
            <a>Tenant</a>
          </span>
        </p>
      </div>
      <RegisterForm
        onSubmit={onSubmit}
        userType={userType}
        setEmail={setEmail}
      />
      <div className="w-full relative mt-2">
        <hr className="bg-neutral-500 w-full relative" />
        <h1
          className="absolute right-1/2 translate-x-1/2 -translate-y-1/2 bg-white
                    text-neutral-500 text-sm"
        >
          OR
        </h1>
      </div>
      <Button variant="outline" className="w-full flex items-center gap-2">
        <Image src={googleLogo} alt={"google"} height={20} />
        Continue with Google
      </Button>
      <div className="flex items-center gap-1">
        <p className="text-sm text-gray-600">Already have an account?</p>
        <Link href="/public" className="text-sm font-bold text-blue-950">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterCard;
