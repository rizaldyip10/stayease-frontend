import React from "react";
import { RateResponse } from "@/services/rateService";
import { Card } from "@/components/ui/card";

interface RatesCardProps {
  rates: RateResponse[];
  isAutomatic?: boolean;
}

const RatesCard: React.FC<RatesCardProps> = ({ rates, isAutomatic }) => {
  const title = isAutomatic
    ? rates.length > 0
      ? "Total active automatic rates: " + rates.length
      : "No active automatic rates"
    : rates.length > 0
      ? "Total active manual rates: " + rates.length
      : "No active manual rates";

  return (
    <>
      <p>{title}</p>
      {rates.slice(0, 4).map((rate: RateResponse) => (
        <Card key={rate.rateId} className="mt-2 p-4">
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center">
            <div className="w-full">
              <h3 className="font-semibold text-blue-950">
                {rate.propertySummary.propertyName}
              </h3>
              <p>
                {new Date(rate.startDate).toLocaleDateString()} -{" "}
                {new Date(rate.endDate).toLocaleDateString()}:{" "}
                {rate.adjustmentRate} ({rate.adjustmentType})
              </p>
            </div>
          </div>
        </Card>
      ))}
      {rates.length > 4 && (
        <p className="mt-2">... and {rates.length - 4} more</p>
      )}
    </>
  );
};

export default RatesCard;
