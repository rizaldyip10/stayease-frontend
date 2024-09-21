import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ChangeCredentialModal from "./ChangeCredentialModal";
import { MdAlternateEmail, MdLockReset } from "react-icons/md";

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
  className?: string;
}

const ChangeCredentialButton: React.FC<ForgotPasswordButtonProps> = ({
  variant,
  title,
  isPasswordReset,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        {isPasswordReset ? (
          <MdLockReset className="mr-2" size={20} />
        ) : (
          <MdAlternateEmail className="mr-2" size={20} />
        )}
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
