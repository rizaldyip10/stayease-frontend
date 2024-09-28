import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BackToHomeButton: React.FC = () => {
  return (
    <Button
      variant="link"
      className="text-blue-950 hover:underline font-light"
      asChild
    >
      <Link href="/">Back to Home</Link>
    </Button>
  );
};

export default BackToHomeButton;
