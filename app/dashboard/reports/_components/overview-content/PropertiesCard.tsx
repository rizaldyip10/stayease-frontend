"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Building2} from "lucide-react";
import {FC} from "react";

interface PropertiesCardProps {
    totalProperties: number;
}

const PropertiesCard: FC<PropertiesCardProps> = ({ totalProperties }) => {
    return (
        <Card className="text-blue-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Properties
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground text-blue-950" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{ totalProperties }</div>
            </CardContent>
        </Card>
    );
};

export default PropertiesCard;