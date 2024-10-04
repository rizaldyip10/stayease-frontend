"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import PopularRoomsList from "@/app/dashboard/reports/_components/properties-content/PopularRoomsList";

const PopularRoomsCard = () => {
    return (
        <Card className="col-span-3 text-blue-950">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                    Your popular rooms
                </CardDescription>
            </CardHeader>
            <CardContent>
                <PopularRoomsList />
            </CardContent>
        </Card>
    );
};

export default PopularRoomsCard;