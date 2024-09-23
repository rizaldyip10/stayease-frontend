import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RateResponse } from "@/services/rateService";
import { usePeakSeasonRate } from "@/hooks/usePeakSeasonRate";
import { GearIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RatesCard from "@/app/dashboard/(tenant)/_components/RatesCard";

interface DashboardRatesSummaryProps {
  className?: string;
}

export const DashboardRatesSummary: React.FC<DashboardRatesSummaryProps> = ({
  className,
}) => {
  const { rates, isLoading } = usePeakSeasonRate();

  let automaticRates: RateResponse[] = [];
  let manualRates: RateResponse[] = [];
  if (rates) {
    automaticRates = rates.filter((rate) =>
      rate.reason?.toLowerCase().includes("automatic".toLowerCase()),
    );
    manualRates = rates.filter((rate) => !automaticRates.includes(rate));
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-blue-950">
          <p>Peak Season Rates Summary</p>
          <Link href="/dashboard/rates-settings" className="hidden md:block">
            <Button className="w-full bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950 mt-5">
              <GearIcon className="mr-2 h-4 w-4" /> Manage Rates
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual">
          <TabsList>
            <TabsTrigger value="manual">Manual Rates</TabsTrigger>
            <TabsTrigger value="automatic">Automatic Rates</TabsTrigger>
          </TabsList>
          {isLoading && <p>Loading rates...</p>}
          <TabsContent value="manual">
            <RatesCard rates={manualRates} />
          </TabsContent>
          <TabsContent value="automatic">
            <RatesCard rates={automaticRates} isAutomatic />
          </TabsContent>
        </Tabs>
        <Link href="/dashboard/rates">
          <Button className="w-full bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950 mt-5 md:hidden">
            <GearIcon className="mr-2 h-4 w-4" /> Manage Rates
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
