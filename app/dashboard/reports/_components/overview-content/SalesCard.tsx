"use client";

import {RecentSales} from "@/app/dashboard/reports/_components/overview-content/RecentSales";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const SalesCard = () => {
    return (
        <Card className="col-span-3  text-blue-950">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                    You made 265 sales this month.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RecentSales />
            </CardContent>
        </Card>
    );
};

export default SalesCard;