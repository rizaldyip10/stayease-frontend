"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomAlert from "@/app/register/user/components/ui/CustomAlert";
import { Button } from "@/components/ui/button";
import SocialLoginDesktop from "@/app/register/user/components/ui/SocialLoginDesktop";

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

  const socials = [
    { icon: "/google-icon.svg", text: "Sign up with Google" },
    { icon: "/github-icon.svg", text: "Sign up with GitHub" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register/user",
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
      <div className="self-stretch overflow-hidden flex flex-col items-center justify-between text-left text-sm text-gray-900">
        <div className="self-stretch h-24 md:hidden" />
        <div className="self-stretch flex flex-col items-center justify-start py-0 md:px-8">
          <div className="flex flex-col items-center justify-start gap-4">
            <div className="self-stretch flex flex-col md:items-start md:justify-start">
              <h2 className="text-2xl text-center md:text-left text-appblue-900 md:text-black self-stretch relative leading-[38px] font-semibold">
                Sign Up
              </h2>
              <h3 className="mb-6 md:mb-0 text-center md:text-left text-sm text-apptext">
                As a User
              </h3>
            </div>
            <div className="md:mt-5 mb-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                {showAlert && (
                  <CustomAlert title={alertType} message={message} />
                )}
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="w-full p-3 bg-appblue-900 text-white rounded hover:bg-blue-700 transition mb-4"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Create Account"}
                </Button>
              </form>
            </div>
            {socials.map((social) => (
              <SocialLoginDesktop
                key={social.icon}
                className="flex items-center justify-center w-full"
                icon={social.icon}
                message={social.text}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
