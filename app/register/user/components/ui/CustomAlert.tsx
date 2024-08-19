import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface AlertProps {
  title: string;
  message: string;
}

const CustomAlert: React.FC<AlertProps> = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
