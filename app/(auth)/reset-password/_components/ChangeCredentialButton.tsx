import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ChangeCredentialModal from "./ChangeCredentialModal";
import { useForgotPassword } from "@/hooks/useForgotPassword";

interface ForgotPasswordButtonProps {
  variant:
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | "link"
    | "ghost"
    | null
    | undefined;
  title: string;
  isPasswordReset: boolean;
}

const ChangeCredentialButton: React.FC<ForgotPasswordButtonProps> = ({
  variant,
  title,
  isPasswordReset,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-950 hover:bg-blue-900 text-white"
      >
        {title}
      </Button>
      <ChangeCredentialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isPasswordReset={isPasswordReset}
      />
    </>
  );
};

export default ChangeCredentialButton;
