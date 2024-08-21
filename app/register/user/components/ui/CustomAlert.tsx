import React, { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export interface AlertProps {
  className?: string;
  show?: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<AlertProps> = ({
  className,
  show,
  title,
  message,
  onClose,
}) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onClose();
  //   }, 10000); // Auto hide after 5 seconds
  //
  //   return () => clearTimeout(timer);
  // }, [onClose]);

  return (
    <Alert className={className} onClick={onClose}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
