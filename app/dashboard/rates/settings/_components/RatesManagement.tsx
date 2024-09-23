import React, { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CustomSelect from "@/components/CustomSelect";
import { ManualRateForm } from "./ManualRateForm";
import { useTenantProperties } from "@/hooks/useTenantProperties";
import { RateRequest, RateResponse } from "@/services/rateService";
import { usePeakSeasonRate } from "@/hooks/usePeakSeasonRate";
import logger from "@/utils/logger";
import RateTable from "@/app/dashboard/rates/_components/RateTable";

export const RatesManagement: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null,
  );
  const [useScheduler, setUseScheduler] = useState(false);
  const [activeTab, setActiveTab] = useState<"manual" | "scheduler">("manual");
  const [selectedRate, setSelectedRate] = useState<RateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { properties } = useTenantProperties();
  const { rates, isLoading, createRate, updateRate, deleteRate } =
    usePeakSeasonRate();

  console.log("rates from page", rates);

  const propertyOptions =
    properties?.map((property) => ({
      value: property.id.toString(),
      label: property.propertyName,
    })) || [];

  const handleManualSubmit = useCallback(
    (data: RateRequest) => {
      if (selectedPropertyId) {
        if (selectedRate) {
          updateRate(selectedRate.rateId, data);
          logger.info("Updating rate:", data);
        } else {
          createRate(selectedPropertyId, data);
          logger.info("Creating rate: ", data);
        }
        setSelectedRate(null);
      } else {
        setError("Please select a property to apply the rate to");
      }
    },
    [selectedPropertyId, selectedRate, createRate, updateRate],
  );

  const handleAutomaticSubmit = useCallback((data: any) => {
    console.log("Automatic rate data:", data);
    // TODO: Implement automatic rate setting
  }, []);

  const handleDeleteRate = useCallback(
    (rateId: number) => {
      deleteRate(rateId);
      setSelectedRate(null);
    },
    [deleteRate],
  );

  const handlePropertyChange = useCallback((value: string) => {
    if (!value) {
      setError("Please select a property");
    } else {
      setSelectedPropertyId(Number(value));
      setSelectedRate(null);
      setError(null);
    }
  }, []);

  const handleSchedulerToggle = useCallback(
    (checked: boolean) => {
      if (!selectedPropertyId) {
        setError("Please select a property first");
        return;
      }
      setUseScheduler(checked);
      setActiveTab(checked ? "scheduler" : "manual");
    },
    [selectedPropertyId],
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-blue-950">
          Peak Season Rate Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-x-2 mb-4">
            <CustomSelect
              title="Select Property"
              options={propertyOptions}
              onChange={handlePropertyChange}
            />
            {error && <p className="text-left text-red-600 text-sm">{error}</p>}
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="use-scheduler"
              checked={useScheduler}
              onCheckedChange={handleSchedulerToggle}
            />
            <Label htmlFor="use-scheduler">Use Rate Scheduler</Label>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "manual" | "scheduler")
            }
          >
            <TabsList>
              <TabsTrigger value="manual" disabled={useScheduler}>
                Manual Setting
              </TabsTrigger>
              <TabsTrigger value="scheduler" disabled={!useScheduler}>
                Scheduler
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual">
              <ManualRateForm
                onSubmit={handleManualSubmit}
                initialData={
                  selectedRate
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
              {selectedRate && (
                <Button
                  onClick={() => handleDeleteRate(selectedRate.rateId)}
                  className="mt-4 bg-red-600 text-white hover:bg-red-700"
                >
                  Delete Rate
                </Button>
              )}
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Existing Rates</h3>
                {isLoading ? (
                  <p>Loading rates...</p>
                ) : (
                  // <ul className="space-y-2">
                  //   {rates.map((rate: RateResponse) => (
                  //     <li
                  //       key={rate.rateId}
                  //       className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                  //       onClick={() => setSelectedRate(rate)}
                  //     >
                  //       <p className="font-semibold">
                  //         {rate.propertySummary.propertyName}
                  //       </p>
                  //       <p>
                  //         Start Date:{" "}
                  //         {new Date(rate.startDate).toLocaleDateString()}
                  //       </p>
                  //       <p>
                  //         End Date:{" "}
                  //         {new Date(rate.endDate).toLocaleDateString()}
                  //       </p>
                  //       <p>
                  //         Adjustment: {rate.adjustmentRate} (
                  //         {rate.adjustmentType})
                  //       </p>
                  //     </li>

                  //   ))}
                  // </ul>
                  <RateTable rates={rates} isLoading={isLoading} />
                )}
              </div>
            </TabsContent>

            <TabsContent value="scheduler">
              This is where the automatic scheduler would be
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
