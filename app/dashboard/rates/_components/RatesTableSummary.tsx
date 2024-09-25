import React from "react";
import { usePeakSeasonRate } from "@/hooks/reports/usePeakSeasonRate";
import RateTable from "@/app/dashboard/rates/_components/RateTable";

const RatesTableSummary = () => {
  const { rates, isLoading } = usePeakSeasonRate();
  return (
    <div>
      <RateTable rates={rates} isLoading={isLoading} />
    </div>
  );
};

export default RatesTableSummary;
