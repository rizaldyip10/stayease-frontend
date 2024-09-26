import { useCallback, useEffect, useState } from "react";
import { RateRequestType, RateResponseType } from "@/constants/Rates";
import { useAlert } from "@/context/AlertContext";
import logger from "@/utils/logger";
import rateService from "@/services/rateService";

export const usePeakSeasonRate = () => {
  const [rates, setRates] = useState<RateResponseType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const fetchRates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await rateService.getTenantRates();
      setRates(response);
    } catch (error) {
      setError("Failed to fetch rates");
      console.error("Error fetching rates:", error);
      showAlert("error", "Failed to fetch rates");
    } finally {
      setIsLoading(false);
    }
  }, [showAlert]);

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

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return {
    rates,
    isLoading,
    error,
    fetchRates,
    createRate,
    updateRate,
    deleteRate,
  };
};
