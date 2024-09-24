"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ReceiptText} from "lucide-react";

const PaidCompleteTrxCard = () => {
    return (
        <Card className="text-blue-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Paid and Complete Transactions
                </CardTitle>
                <ReceiptText className="h-4 w-4 text-muted-foreground text-blue-950" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                </p>
            </CardContent>
        </Card>
    )
};

export default PaidCompleteTrxCard;