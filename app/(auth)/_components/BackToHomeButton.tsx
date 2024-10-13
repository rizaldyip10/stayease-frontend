import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const BackToHomeButton: React.FC = () => {
  const router = useRouter();

  const handleClick = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <Button
      variant="link"
      className="text-blue-950 hover:underline font-light"
      onClick={handleClick}
    >
      Back to Home
    </Button>
  );
};

export default BackToHomeButton;
