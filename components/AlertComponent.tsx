import React from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { AlertType } from "@/constants/Types";

interface AlertProps {
  type: AlertType;
  message: string;
  onClose: () => void;
}

const AlertComponent: React.FC<AlertProps> = ({ type, message, onClose }) => {
  return (
    <div
      className="fixed top-4 right-4 z-50 p-4 rounded-md shadow-md flex items-center justify-between max-w-md w-full animate-in slide-in-from-top-2 duration-300"
      style={{
        backgroundColor:
          type === "success"
            ? "rgba(220, 252, 231, 0.95)"
            : type === "error"
              ? "rgba(254, 226, 226, 0.95)"
              : type === "warn"
                ? "rgba(255, 243, 205, 0.95)"
                : "rgba(219, 234, 254, 0.95)",
      }}
    >
      <div className="flex items-center">
        {type === "success" ? (
          <CheckCircle className="text-green-500 mr-2" />
        ) : type === "error" ? (
          <AlertCircle className="text-red-500 mr-2" />
        ) : type === "warn" ? (
          <AlertCircle className="text-yellow-500 mr-2" />
        ) : (
          <AlertCircle className="text-blue-500 mr-2" />
        )}
        <p
          className={
            type === "success"
              ? "text-green-700"
              : type === "error"
                ? "text-red-700"
                : type === "warn"
                  ? "text-yellow-700"
                  : "text-blue-700"
          }
        >
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default AlertComponent;
