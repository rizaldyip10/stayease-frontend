import { useCallback, useEffect, useState } from "react";
import { AutoRateRequestType, AutoRateResponseType } from "@/constants/Rates";
import { useAlert } from "@/context/AlertContext";
import rateService from "@/services/rateService";
import { useFetchData } from "@/hooks/utils/useFetchData";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useAutoRateSetting = (propertyId: number) => {
  const [autoRateSetting, setAutoRateSetting] =
    useState<AutoRateResponseType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

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

  const updateAutoRateSetting = useCallback(
    async (data: Partial<AutoRateRequestType>) => {
      setIsLoading(true);
      setError(null);
      try {
        await rateService.setOrUpdateAutoRateSetting(propertyId, data);
        await queryClient.invalidateQueries({
          queryKey: [`rates-tenantId-${session?.user?.id}`],
        });
        console.log("Auto rate setting updated successfully");
        showAlert("success", "Auto rate setting updated successfully");
      } catch (error: any) {
        setError(error.response.statusMessage);
        console.error(
          "Error updating rate setting:",
          error.response.statusMessage,
        );
        showAlert(
          "error",
          "Failed to update rate setting: " + error.response.statusMessage,
        );
      } finally {
        setIsLoading(false);
      }
    },
    [propertyId, showAlert],
  );

  const deactivateAutoRateSetting = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await rateService.deactivateAutoRateSetting(propertyId);
      await queryClient.invalidateQueries({
        queryKey: [`rates-tenantId-${session?.user?.id}`],
      });
      console.log("Auto rate setting deactivated successfully");
      showAlert("success", "Auto rate setting deactivated successfully");
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
  }, [propertyId, showAlert]);

  return {
    autoRateSetting,
    error,
    isLoading,
    updateAutoRateSetting,
    deactivateAutoRateSetting,
  };
};
