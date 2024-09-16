"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );

  const properties = [
    {
      id: 1,
      name: "Beachfront Villa",
      location: "Malibu, CA",
      rooms: [
        { id: 1, name: "Master Suite", baseRate: 200, peakRate: 300 },
        { id: 2, name: "Guest Room", baseRate: 150, peakRate: 250 },
      ],
    },
    {
      id: 2,
      name: "Mountain Cabin",
      location: "Aspen, CO",
      rooms: [
        { id: 3, name: "Loft", baseRate: 180, peakRate: 280 },
        { id: 4, name: "Downstairs Bedroom", baseRate: 160, peakRate: 260 },
      ],
    },
  ];

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-blue-950">Property Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="properties" className="w-full">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
          </TabsList>
          <TabsContent value="properties">
            <div className="space-y-4">
              {properties.map((property) => (
                <Card key={property.id} className="p-4">
                  <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center">
                    <div className="w-full">
                      <h3 className="font-semibold text-blue-950">
                        {property.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {property.location}
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
              <Button className="w-full bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950">
                <Plus className="mr-2 h-4 w-4" /> Add New Property
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="rooms">
            {selectedProperty ? (
              <div className="space-y-4">
                <h3 className="font-semibold text-blue-950">
                  {selectedProperty.name} - Rooms
                </h3>
                {selectedProperty.rooms.map((room) => (
                  <Card key={room.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-blue-950">
                          {room.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Base Rate: ${room.baseRate}
                        </p>
                        <p className="text-sm text-gray-500">
                          Peak Rate: ${room.peakRate}
                        </p>
                      </div>
                      <Button variant="outline" className="text-blue-950">
                        Adjust Rates
                      </Button>
                    </div>
                  </Card>
                ))}
                <Button className="w-full bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950">
                  <Plus className="mr-2 h-4 w-4" /> Add New Room
                </Button>
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
