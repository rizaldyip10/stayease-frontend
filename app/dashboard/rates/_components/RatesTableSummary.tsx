import React, { useEffect, useState } from "react";
import { usePeakSeasonRate } from "@/hooks/rates/usePeakSeasonRate";
import RateTable from "@/app/dashboard/rates/_components/RateTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyTable from "@/app/dashboard/properties/_components/PropertyTable";
import RoomTable from "@/app/dashboard/properties/_components/RoomTable";
import { RateResponseType } from "@/constants/Rates";
import { useTabContext } from "@/context/TabContext";

const RatesTableSummary = () => {
  const { rates, isLoading } = usePeakSeasonRate();
  const [manualRates, setManualRates] = useState<RateResponseType[]>([]);
  const [automaticRates, setAutomaticRates] = useState<RateResponseType[]>([]);

  useEffect(() => {
    if (rates) {
      const filteredRates = rates.filter((rate) =>
        rate.reason?.toLowerCase().includes("automatic".toLowerCase()),
      );
      setAutomaticRates(filteredRates);
      setManualRates(rates.filter((rate) => !filteredRates.includes(rate)));
    }
  }, [rates]);

  return (
    <div className="w-full">
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Rates Setting</TabsTrigger>
          <TabsTrigger value="auto">Auto Rates Setting</TabsTrigger>
        </TabsList>
        <TabsContent value="manual">
          <div className="mt-5">
            <RateTable rates={manualRates} isLoading={isLoading} />
          </div>
        </TabsContent>
        <TabsContent value="auto">
          <div className="mt-5">
            <RateTable rates={automaticRates} isLoading={isLoading} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RatesTableSummary;
