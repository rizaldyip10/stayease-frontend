"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Chart} from "@/app/dashboard/reports/_components/overview-content/Chart";

const OverviewCard = () => {
    return (
        <Card className="col-span-4 text-blue-950">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <Chart />
            </CardContent>
        </Card>
    );
};

export default OverviewCard;