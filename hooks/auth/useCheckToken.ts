import { useEffect, useState } from "react";
import authService from "@/services/authService";
import { FormType } from "@/constants/Types";
import { profileService } from "@/services/profileService";

export const useCheckToken = ({
  formType,
  token,
}: {
  formType: FormType;
  token: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  const checkService =
    formType === "verify"
      ? authService.checkToken
      : profileService.checkEmailChangeToken;

  const checkIsTokenValid = async () => {
    if (token) {
      setIsTokenValid(null); // Reset the state
      try {
        const response = await checkService(token);
        console.log("response from checkService:", response);
        if (response.data) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
      } catch (error: any) {
        console.error(error.message);
        setError(error.response.data.statusMessage);
        setIsTokenValid(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    checkIsTokenValid();
  }, [token]);

  return { isLoading, error, isTokenValid };
};
