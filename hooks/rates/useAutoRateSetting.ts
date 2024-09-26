import { useEffect, useState } from "react";
import { AutoRateRequestType, AutoRateResponseType } from "@/constants/Rates";
import { useAlert } from "@/context/AlertContext";
import rateService from "@/services/rateService";
import { useFetchData } from "@/hooks/utils/useFetchData";

export const useAutoRateSetting = (propertyId: number) => {
  const [autoRateSetting, setAutoRateSetting] =
    useState<AutoRateResponseType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  const {
    data: fetchedSetting,
    error: rateError,
    isLoading: rateIsLoading,
  } = useFetchData<AutoRateResponseType>(
    `auto-rate-setting-${propertyId}`,
    () => rateService.getAutoRateSetting(propertyId),
  );

  useEffect(() => {
    if (fetchedSetting) {
      setAutoRateSetting(fetchedSetting);
    }
  }, [fetchedSetting, propertyId]);

  const updateAutoRateSetting = async (data: AutoRateRequestType) => {
    setIsLoading(true);
    setError(null);
    try {
      await rateService.setOrUpdateAutoRateSetting(propertyId, data);
      console.log("Auto rate setting updated successfully");
      showAlert(
        "success",
        "Auto rate setting updated successfully",
        "/dashboard/rates",
      );
    } catch (error: any) {
      setError("Failed to update rate setting");
      console.error("Error updating rate setting:", error.response.data);
      showAlert(
        "error",
        "Failed to update rate setting: " + error.response.data,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deactivateAutoRateSetting = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await rateService.deactivateAutoRateSetting(propertyId);
      console.log("Auto rate setting deactivated successfully");
      showAlert(
        "success",
        "Auto rate setting deactivated successfully",
        "/dashboard/rates",
      );
    } catch (error: any) {
      setError("Failed to deactivate rate setting");
      console.error("Error deactivating rate setting:", error.response.data);
      showAlert(
        "error",
        "Failed to deactivate rate setting: " + error.response.data,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    autoRateSetting,
    error,
    isLoading,
    updateAutoRateSetting,
    deactivateAutoRateSetting,
  };
};
