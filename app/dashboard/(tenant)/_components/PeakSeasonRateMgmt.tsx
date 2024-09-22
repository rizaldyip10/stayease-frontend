"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { usePropertyData } from "@/hooks/properties/usePropertyData";
import { useTenantProperties } from "@/hooks/useTenantProperties";
import CustomSelect from "@/components/CustomSelect";

type AdjustmentType = "PERCENTAGE" | "FIXED";

interface ManualPeakRate {
  propertyId: number | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  adjustmentRate: string;
  adjustmentType: AdjustmentType;
  reason: string;
}

interface ScheduledRate {
  adjustmentRate: string;
  adjustmentType: AdjustmentType;
}

interface ScheduledRates {
  holiday: ScheduledRate;
  weekend: ScheduledRate;
}
interface PeakRateManagementProps {
  className?: string;
}

const PeakRateManagement: React.FC<PeakRateManagementProps> = ({
  className,
}) => {
  const { properties } = useTenantProperties();
  const [useScheduler, setUseScheduler] = useState(false);
  const [holidaySchedulerEnabled, setHolidaySchedulerEnabled] = useState(false);
  const [weekendSchedulerEnabled, setWeekendSchedulerEnabled] = useState(false);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const [manualPeakRate, setManualPeakRate] = useState<ManualPeakRate>({
    propertyId: undefined,
    startDate: undefined,
    endDate: undefined,
    adjustmentRate: "",
    adjustmentType: "PERCENTAGE",
    reason: "",
  });

  const [scheduledRates, setScheduledRates] = useState<ScheduledRates>({
    holiday: {
      adjustmentRate: "",
      adjustmentType: "PERCENTAGE",
    },
    weekend: {
      adjustmentRate: "",
      adjustmentType: "PERCENTAGE",
    },
  });

  const propertyList = properties?.map((property) => ({
    value: property.id.toString(),
    label: property.propertyName,
  }));

  const handleManualSubmit = () => {
    // TODO: Implement API call to save manual peak rate
    console.log("Submitting manual peak rate:", {
      ...manualPeakRate,
    });
  };

  const handleScheduledSubmit = () => {
    // TODO: Implement API call to save scheduled rates
    console.log("Submitting scheduled rates:", {
      holidaySchedulerEnabled,
      weekendSchedulerEnabled,
      scheduledRates,
    });
  };

  const minEndDate = manualPeakRate.startDate
    ? new Date(manualPeakRate.startDate.getTime() + 24 * 60 * 60 * 1000)
    : new Date();

  const updateDate = (
    date: Date | undefined,
    type: "startDate" | "endDate",
  ) => {
    const updatedManualPeakRate = {
      ...manualPeakRate,
      [type]: date || undefined,
    };

    if (type === "startDate") {
      setStartDateOpen(false);
      setEndDateOpen(true);
    }

    setManualPeakRate(updatedManualPeakRate);
    setEndDateOpen(false);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-blue-950">
          Peak Season Rate Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <CustomSelect
            title="Select Property"
            options={propertyList}
            onChange={(value) => {
              setManualPeakRate({
                ...manualPeakRate,
                propertyId: Number(value),
              });
            }}
          />
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="use-scheduler"
            checked={useScheduler}
            onCheckedChange={setUseScheduler}
          />
          <Label htmlFor="use-scheduler">Use Rate Scheduler</Label>
        </div>

        <Tabs defaultValue={useScheduler ? "scheduler" : "manual"}>
          <TabsList>
            <TabsTrigger value="manual" disabled={useScheduler}>
              Manual Setting
            </TabsTrigger>
            <TabsTrigger value="scheduler" disabled={!useScheduler}>
              Scheduler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <div className="space-y-4 mt-4">
              <div className="flex md:flex-row flex-col md:space-x-4 gap-5 md:gap-0">
                <div className="md:w-1/2 w-full">
                  <Label className="text-blue-950 font-semibold">
                    Start Date
                  </Label>
                  <CustomDatePicker
                    title="Select start date"
                    date={manualPeakRate.startDate}
                    onDateChange={(date) => updateDate(date, "startDate")}
                    minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </div>
                <div className="md:w-1/2 w-full">
                  <Label className="text-blue-950 font-semibold">
                    End Date
                  </Label>
                  <CustomDatePicker
                    title="Select end date"
                    date={manualPeakRate.endDate}
                    onDateChange={(date) => updateDate(date, "endDate")}
                    minDate={minEndDate}
                    open={endDateOpen}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Label className="text-blue-950 font-semibold">
                    Adjustment
                  </Label>
                  <Input
                    type="number"
                    value={manualPeakRate.adjustmentRate}
                    onChange={(e) =>
                      setManualPeakRate({
                        ...manualPeakRate,
                        adjustmentRate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-1/2">
                  <Label className="text-blue-950 font-semibold">
                    Adjustment Type
                  </Label>
                  <Select
                    value={manualPeakRate.adjustmentType}
                    onValueChange={(value: AdjustmentType) =>
                      setManualPeakRate({
                        ...manualPeakRate,
                        adjustmentType: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                      <SelectItem value="FIXED">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-blue-950 font-semibold">Reason</Label>
                <Input
                  value={manualPeakRate.reason}
                  onChange={(e) =>
                    setManualPeakRate({
                      ...manualPeakRate,
                      reason: e.target.value,
                    })
                  }
                />
              </div>
              <Button
                onClick={handleManualSubmit}
                className="bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950"
              >
                Set Manual Peak Rate
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="scheduler">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="holiday-scheduler"
                    checked={holidaySchedulerEnabled}
                    onCheckedChange={setHolidaySchedulerEnabled}
                  />
                  <Label htmlFor="holiday-scheduler">
                    Enable Holiday Scheduler
                  </Label>
                </div>
                {holidaySchedulerEnabled && (
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Label>Holiday Adjustment</Label>
                      <Input
                        type="number"
                        value={scheduledRates.holiday.adjustmentRate}
                        onChange={(e) =>
                          setScheduledRates({
                            ...scheduledRates,
                            holiday: {
                              ...scheduledRates.holiday,
                              adjustmentRate: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="w-1/2">
                      <Label>Adjustment Type</Label>
                      <Select
                        value={scheduledRates.holiday.adjustmentType}
                        onValueChange={(value: AdjustmentType) =>
                          setScheduledRates({
                            ...scheduledRates,
                            holiday: {
                              ...scheduledRates.holiday,
                              adjustmentType: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                          <SelectItem value="FIXED">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="weekend-scheduler"
                    checked={weekendSchedulerEnabled}
                    onCheckedChange={setWeekendSchedulerEnabled}
                  />
                  <Label htmlFor="weekend-scheduler">
                    Enable Weekend Scheduler
                  </Label>
                </div>
                {weekendSchedulerEnabled && (
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Label>Weekend Adjustment</Label>
                      <Input
                        type="number"
                        value={scheduledRates.weekend.adjustmentRate}
                        onChange={(e) =>
                          setScheduledRates({
                            ...scheduledRates,
                            weekend: {
                              ...scheduledRates.weekend,
                              adjustmentRate: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="w-1/2">
                      <Label>Adjustment Type</Label>
                      <Select
                        value={scheduledRates.weekend.adjustmentType}
                        onValueChange={(value: AdjustmentType) =>
                          setScheduledRates({
                            ...scheduledRates,
                            weekend: {
                              ...scheduledRates.weekend,
                              adjustmentType: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                          <SelectItem value="FIXED">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
              <Button
                onClick={handleScheduledSubmit}
                className="bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950"
              >
                Save Scheduled Rates
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PeakRateManagement;
