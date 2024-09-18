import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

interface AlertProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const AlertComponent: React.FC<AlertProps> = ({ type, message, onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${type === "success" ? "bg-green-100" : "bg-red-100"}`}
    >
      <div className="flex items-center">
        {type === "success" ? (
          <CheckCircle className="text-green-500 mr-2" />
        ) : (
          <AlertCircle className="text-red-500 mr-2" />
        )}
        <p className={type === "success" ? "text-green-700" : "text-red-700"}>
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
    </div>
  );
};

export default AlertComponent;
