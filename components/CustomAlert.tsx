import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import React from "react";

export interface AlertProps {
  className?: string;
  show?: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<AlertProps> = ({
  className,
  title,
  message,
  onClose,
}) => {
  return (
    <Alert className={className} onClick={onClose}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
