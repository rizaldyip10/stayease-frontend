import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ForgotPasswordModal from "./ForgotPasswordModal";

const ForgotPasswordButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="link"
        onClick={() => setIsModalOpen(true)}
        className="text-blue-950 hover:text-blue-800"
      >
        Forgot Password?
      </Button>
      <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ForgotPasswordButton;
