"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdjustedRatesType, PropertyAndRoomType } from "@/constants/Property";
import { usePropertyDetails } from "@/hooks/properties/usePropertyDetails";
import { currencyFormatter } from "@/utils/CurrencyFormatter";
import Link from "next/link";
import RoomTab from "@/app/dashboard/(tenant)/_components/RoomTab";
import { useTenantProperties } from "@/hooks/properties/useTenantProperties";

interface Room {
  id: number;
  name: string;
  baseRate: number;
  peakRate: number;
}

interface Property {
  id: number;
  name: string;
  location: string;
  rooms: Room[];
}

interface PropertyManagementProps {
  className?: string;
}

const PropertyManagement: React.FC<PropertyManagementProps> = ({
  className,
}) => {
  const [activeTab, setActiveTab] = useState("properties");
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyAndRoomType | null>(null);
  const { properties, isLoading, error } = useTenantProperties();

  const handlePropertySelect = (property: PropertyAndRoomType) => {
    setSelectedProperty(property);
    setActiveTab("rooms");
  };

  const total =
    (properties?.length ?? 0) > 0
      ? `Total properties: ${properties?.length}`
      : "No properties found";

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-blue-950">Property Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
          </TabsList>
          <TabsContent value="properties">
            <div className="space-y-4">
              <p>{total}</p>
              {properties?.slice(0, 4).map((property) => (
                <Card key={property.id} className="p-4">
                  <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center">
                    <div className="w-full">
                      <h3 className="font-semibold text-blue-950">
                        {property.propertyName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {property.address}
                      </p>
                    </div>
                    <Button
                      onClick={() => handlePropertySelect(property)}
                      className="bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950 w-full md:w-auto"
                    >
                      Manage Rooms
                    </Button>
                  </div>
                </Card>
              ))}
              {(properties?.length ?? 0) > 4 && (
                <p className="mt-2">
                  ... and {(properties?.length ?? 0) - 4} more
                </p>
              )}
              <Link href="/dashboard/properties/create">
                <Button className="w-full bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950 mt-5">
                  <Plus className="mr-2 h-4 w-4" /> Add New Property
                </Button>
              </Link>
            </div>
          </TabsContent>
          <TabsContent value="rooms">
            {selectedProperty ? (
              <div className="space-y-4">
                <h3 className="font-semibold text-blue-950">
                  {selectedProperty.propertyName} - Rooms
                </h3>
                <RoomTab propertyId={selectedProperty.id} />
              </div>
            ) : (
              <p>Select a property to manage rooms</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PropertyManagement;
