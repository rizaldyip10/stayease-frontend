"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import SalesChart from "@/app/dashboard/reports/_components/properties-content/SalesChart";

const DailySalesCard = () => {
    return (
        <Card className="col-span-4 text-blue-950">
            <CardHeader className="w-full flex flex-row justify-between items-center">
                <CardTitle>Month Sales</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <SalesChart />
            </CardContent>
        </Card>
    );
};

export default DailySalesCard;