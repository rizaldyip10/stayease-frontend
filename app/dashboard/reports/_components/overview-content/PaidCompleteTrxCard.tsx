"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ReceiptText} from "lucide-react";
import {TrxDiffType} from "@/constants/Reports";
import {FC} from "react";

interface PaidCompleteTrxCardProps {
    trxDiff: TrxDiffType;
}

const PaidCompleteTrxCard: FC<PaidCompleteTrxCardProps> = ({ trxDiff }) => {
    let diff;
    if (trxDiff.trxDiffPercent >= 0) {
        diff = `+ ${trxDiff.trxDiffPercent}`;
    } else {
        diff = `${trxDiff.trxDiffPercent}`;
    }
    return (
        <Card className="text-blue-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Completed Transactions
                </CardTitle>
                <ReceiptText className="h-4 w-4 text-muted-foreground text-blue-950" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{ trxDiff.trxThisMonth }</div>
                <p className="text-xs text-muted-foreground">
                    { diff }% from last month
                </p>
            </CardContent>
        </Card>
    )
};

export default PaidCompleteTrxCard;