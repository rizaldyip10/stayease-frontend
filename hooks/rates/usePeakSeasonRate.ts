import { useCallback, useEffect, useState } from "react";
import { RateRequestType, RateResponseType } from "@/constants/Rates";
import { useAlert } from "@/context/AlertContext";
import logger from "@/utils/logger";
import rateService from "@/services/rateService";
import { useFetchData } from "@/hooks/utils/useFetchData";
import { useSession } from "next-auth/react";

export const usePeakSeasonRate = () => {
  const [rates, setRates] = useState<RateResponseType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const { data: session } = useSession();

  const {
    data: fetchedRates,
    error: rateError,
    isLoading: rateIsLoading,
  } = useFetchData<RateResponseType[]>(
    `rates-tenantId-${session?.user?.id}`,
    () => rateService.getTenantRates(),
  );

  useEffect(() => {
    if (fetchedRates) {
      setRates(fetchedRates);
    }
  }, [fetchedRates]);

  const fetchRates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await rateService.getTenantRates();
      setRates(response);
    } catch (error) {
      setError("Failed to fetch rates");
      console.error("Error fetching rates:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createRate = useCallback(
    async (propertyId: number, rateData: RateRequestType) => {
      setIsLoading(true);
      setError(null);
      try {
        logger.info("Creating rate for property: " + propertyId);
        const response = await rateService.setRate(propertyId, rateData);
        logger.info("Rate created successfully", response);
        showAlert("success", "Rate created successfully", "/dashboard/rates");
      } catch (error) {
        setError("Failed to create rate");
        console.error("Error creating rate:", error);
        showAlert("error", "Failed to create rate: " + error);
      } finally {
        setIsLoading(false);
      }
    },
    [showAlert],
  );

  const updateRate = useCallback(
    async (rateId: number, rateData: RateRequestType) => {
      setIsLoading(true);
      setError(null);
      try {
        await rateService.updateRate(rateId, rateData);
        showAlert("success", "Rate updated successfully");
      } catch (error) {
        setError("Failed to update rate");
        console.error("Error updating rate:", error);
        showAlert("error", "Failed to update rate: " + error);
      } finally {
        setIsLoading(false);
      }
    },
    [showAlert],
  );

  const deleteRate = useCallback(
    async (rateId: number) => {
      setIsLoading(true);
      setError(null);
      try {
        await rateService.deleteRate(rateId);
        showAlert("success", "Rate deleted successfully");
      } catch (error) {
        setError("Failed to delete rate");
        console.error("Error deleting rate:", error);
        showAlert("error", "Failed to delete rate: " + error);
      } finally {
        setIsLoading(false);
      }
    },
    [showAlert],
  );

  return {
    rates,
    isLoading,
    error,
    createRate,
    updateRate,
    deleteRate,
    fetchRates,
  };
};
