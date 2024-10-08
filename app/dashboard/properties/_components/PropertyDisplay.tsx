"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import PropertyTable from "@/app/dashboard/properties/_components/PropertyTable";
import RoomTable from "@/app/dashboard/properties/_components/RoomTable";

const PropertyDisplay = () => {
    return (
        <div>
            <Tabs defaultValue="apartments">
                <TabsList className="grid w-full md:max-w-max grid-cols-2">
                    <TabsTrigger value="apartments">Apartments</TabsTrigger>
                    <TabsTrigger value="rooms">Rooms</TabsTrigger>
                </TabsList>
                <TabsContent value="apartments">
                    <div className="mt-5">
                        <PropertyTable />
                    </div>
                </TabsContent>
                <TabsContent value="rooms">
                    <div className="mt-5">
                        <RoomTable />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PropertyDisplay;