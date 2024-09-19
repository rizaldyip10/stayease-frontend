import { useState, useCallback } from "react";
import { AlertType } from "@/constants/Types";
import { useRouter } from "next/navigation";

interface AlertInfo {
  show: boolean;
  type: AlertType;
  message: string;
}

export const useAlert = () => {
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    show: false,
    type: "success",
    message: "",
  });
  const router = useRouter();

  const showAlert = useCallback(
    (type: AlertType, message: string, redirect?: string) => {
      setAlertInfo({ show: true, type, message });
      setTimeout(() => {
        setAlertInfo({ show: false, type: "success", message: "" });
        if (redirect) {
          router.push(redirect);
        }
      }, 3000);
    },
    [router],
  );

  const hideAlert = useCallback(() => {
    setAlertInfo({ show: false, type: "success", message: "" });
  }, []);

  return { alertInfo, showAlert, hideAlert };
};
