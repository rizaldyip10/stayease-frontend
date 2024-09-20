import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import AlertComponent from "@/components/AlertComponent";
import { useRouter } from "next/navigation";

type AlertType = "success" | "error";

interface AlertContextType {
  showAlert: (type: AlertType, message: string) => void;
  hideAlert: () => void;
  alertInfo: {
    type: AlertType;
    message: string;
  } | null;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alertInfo, setAlertInfo] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  const router = useRouter();

  const showAlert = useCallback(
    (type: AlertType, message: string, redirect?: string) => {
      setAlertInfo({ type, message });
      setTimeout(() => {
        setAlertInfo(null);
        if (redirect) {
          router.push(redirect);
        }
      }, 3000);
    },
    [router],
  );

  const hideAlert = useCallback(() => {
    setAlertInfo(null);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alertInfo }}>
      {children}
      {alertInfo && (
        <AlertComponent
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={hideAlert}
        />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
