import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const BackToHomeButton: React.FC = () => {
  return (
    <Button
      variant="link"
      className="text-blue-950 hover:underline font-light"
      asChild
      onClick={() => signOut()}
    >
      <Link href="/">Back to Home</Link>
    </Button>
  );
};

export default BackToHomeButton;
