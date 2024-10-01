import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorComponentProps {
  message?: string;
  fullPage?: boolean;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message = "An error occurred. Please try again later.",
  fullPage = false,
}) => {
  const containerClasses = fullPage
    ? "min-h-screen flex items-center justify-center bg-slate-200"
    : "p-4";

  return (
    <div className={containerClasses}>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <AlertTriangle className="mx-auto text-blue-950 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold text-blue-950 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link href="/" passHref>
          <Button className="bg-blue-950 text-white hover:bg-gray-500 hover:text-blue-950">
            Go back to home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorComponent;
