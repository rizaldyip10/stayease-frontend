import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps {
  title: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ title }) => {
  return (
    <Button disabled className="w-full">
      <Loader2 className="mr-2 h-4 animate-spin" />
      {title}
    </Button>
  );
};

export default LoadingButton;
