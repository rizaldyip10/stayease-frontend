import React, { useCallback, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomSelect from "@/components/CustomSelect";
import { ManualRateForm } from "./ManualRateForm";
import { useTenantProperties } from "@/hooks/useTenantProperties";
import { RateRequest, RateResponse } from "@/services/rateService";
import { usePeakSeasonRate } from "@/hooks/usePeakSeasonRate";
import logger from "@/utils/logger";

interface RatesManagementProps {
  isEditing: boolean;
  selectedRate?: RateResponse;
  onClose: () => void;
}

export const RatesManagement: React.FC<RatesManagementProps> = ({
  isEditing,
  selectedRate,
  onClose,
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const { properties } = useTenantProperties();
  const { createRate, updateRate } = usePeakSeasonRate();

  const propertyOptions =
    properties?.map((property) => ({
      value: property.id.toString(),
      label: property.propertyName,
    })) || [];

  useEffect(() => {
    if (isEditing && selectedRate) {
      setSelectedPropertyId(selectedRate.propertySummary.propertyId);
    }
  }, [isEditing, selectedRate]);

  const handleSubmit = useCallback(
    (data: RateRequest) => {
      if (isEditing && selectedRate) {
        try {
          updateRate(selectedRate.rateId, data);
          onClose();
        } catch (error) {
          logger.error("Error updating rate");
        }
      } else if (!isEditing && selectedPropertyId) {
        logger.info("Creating new rate for property ID:", {
          id: selectedPropertyId,
        });
        try {
          createRate(selectedPropertyId, data);
          logger.info("Rate created successfully");
          onClose();
        } catch (error) {
          logger.error("Error creating rate");
        }
      } else {
        setError("Please select a property to apply the rate to");
      }
    },
    [isEditing, selectedRate, selectedPropertyId, createRate, updateRate],
  );

  const handlePropertyChange = useCallback(
    (value: string) => {
      if (!isEditing) {
        if (!value) {
          setError("Please select a property");
        } else {
          setSelectedPropertyId(Number(value));
          setError(null);
        }
      }
    },
    [isEditing],
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-blue-950">
          {isEditing ? "Edit Rate" : "Set New Rate"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2 mb-4">
            <CustomSelect
              title="Select Property"
              options={propertyOptions}
              onChange={handlePropertyChange}
              value={selectedPropertyId?.toString()}
              disabled={isEditing}
            />
            {error && <p className="text-left text-red-600 text-sm">{error}</p>}
          </div>
          <ManualRateForm
            onSubmit={handleSubmit}
            initialData={
              isEditing && selectedRate
                ? {
                    startDate: new Date(selectedRate.startDate),
                    endDate: new Date(selectedRate.endDate),
                    adjustmentRate: selectedRate.adjustmentRate,
                    adjustmentType: selectedRate.adjustmentType,
                    reason: selectedRate.reason,
                  }
                : undefined
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
