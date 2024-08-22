import React from "react";
import { FormType, UserType } from "@/constants/Types";
import Image from "next/image";
import logo from "@/assets/images/logo_horizontal.png";
import { Button } from "@/components/ui/button";
import googleLogo from "@/assets/icons/google-icon.png";
import AuthForm from "@/app/(auth)/components/AuthForm";
import { FormikHelpers, FormikValues } from "formik";
import useAuthForm from "@/hooks/useAuthForm";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthCardProps {
  formType: FormType;
  userType: UserType;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
}

const AuthCard: React.FC<AuthCardProps> = ({
  formType,
  userType,
  setUserType,
}) => {
  const router = useRouter();
  const { handleSubmit, error } = useAuthForm({
    userType,
  });

  const initialValues =
    formType === "login" ? { email: "", password: "" } : { email: "" };

  const onSubmit = (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
  ) => {
    handleSubmit(values, actions, formType);
    console.log("values: ", values);
  };

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <div className="w-96 max-sm:w-80 max-sm:px-5 flex flex-col items-center bg-white px-7 py-10 gap-5 md:gap-7">
      <div className="w-full flex flex-col items-center md:gap-3 gap-2 md:mb-5">
        <Image src={logo} alt="logo" height={50} className="md:hidden mb-10" />
        <h1 className="text-3xl font-bold text-appblue-800 md:text-left">
          {formType === "login" ? "Login" : "Register"}
        </h1>
        {formType === "register" && (
          <>
            <p>Choose account type:</p>
            <p>
              <span
                className={
                  userType === "user"
                    ? "font-bold p-1 bg-appblue-900 text-white rounded-sm cursor-pointer"
                    : "font-normal cursor-pointer"
                }
                onClick={() => setUserType("user")}
              >
                <a>User</a>
              </span>{" "}
              /{" "}
              <span
                className={
                  userType === "tenant"
                    ? "font-bold p-1 bg-appblue-900 text-white rounded-sm cursor-pointer"
                    : "font-normal cursor-pointer"
                }
                onClick={() => setUserType("tenant")}
              >
                <a>Tenant</a>
              </span>
            </p>
          </>
        )}
      </div>
      <AuthForm
        formType={formType}
        onSubmit={onSubmit}
        initialValues={initialValues}
        userType={userType}
      />

      {error && <p className="text-red-500">{error}</p>}

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
        <p className="text-sm text-gray-600">
          {formType === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>
        <Link
          href="#"
          className="text-sm font-bold text-blue-950"
          onClick={(e) =>
            handleNavigation(e, formType === "login" ? "/register" : "/login")
          }
        >
          {formType === "login" ? "Register" : "Login"}
        </Link>
      </div>
    </div>
  );
};

export default AuthCard;
