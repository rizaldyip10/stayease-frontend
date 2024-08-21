"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomAlert from "@/app/register/user/components/ui/CustomAlert";
import RegisterCard from "@/app/register/user/components/ui/RegisterCard";
import logo from "@/assets/images/logo_horizontal.png";
import Image from "next/image";

interface formProps {
  className?: string;
}

const FormSection: React.FC<formProps> = ({
  className,
}: {
  className?: string;
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState<"Success" | "Error">("Success");
  const [showAlert, setShowAlert] = useState(false);
  const [userType, setUserType] = useState<"user" | "tenant">("user");

  const handleSubmit = async (email: string) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/register/${userType}`,
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;

      if (response.status == 200) {
        setMessage(data.data.message);
        setAlertType("Success");
        setShowAlert(true);
        setEmail("");
      } else {
        setMessage(data.message || "Something went wrong");
        setAlertType("Error");
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occured, please try again later");
      setAlertType("Error");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <div className="md:grid grid-rows-[1fr_4fr_1fr] shrink-0 max-h-svh">
        <div>
          <Image
            src={logo}
            alt="logo"
            height={50}
            className="hidden md:flex mx-auto shrink-0"
          />
        </div>
        <div className="self-stretch overflow-hidden flex flex-col items-center justify-between text-left text-sm text-gray-900">
          <div className="self-stretch h-24 md:hidden" />
          <div className="self-stretch flex flex-col items-center justify-start py-0 md:px-8">
            {showAlert && (
              <CustomAlert
                className={`z-50 top-1/2 -translate-y-full md:max-w-[500px] max-w-[300px] bg-white fixed left-1/2 transform -translate-x-1/2`}
                title={alertType}
                message={message}
                onClose={() => setShowAlert(false)}
              />
            )}
            <RegisterCard
              onSubmit={handleSubmit}
              userType={userType}
              setUserType={setUserType}
              setEmail={setEmail}
            />
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default FormSection;
