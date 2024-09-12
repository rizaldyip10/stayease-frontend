import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { MapPin, Star } from "lucide-react";

const PropertyDetailsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Property Name</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card className="mb-4">
            <CardContent className="p-4">
              <img
                src="/api/placeholder/800/400"
                alt="Property"
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <div className="flex items-center mb-2">
                <MapPin className="mr-2" size={16} />
                <span>Location</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-2 text-yellow-400" size={16} />
                <span>4.5 (123 reviews)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detailed property description goes here...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="room1">
                <TabsList>
                  <TabsTrigger value="room1">Room 1</TabsTrigger>
                  <TabsTrigger value="room2">Room 2</TabsTrigger>
                </TabsList>
                <TabsContent value="room1">
                  <h3 className="text-xl font-semibold mb-2">Room 1 Name</h3>
                  <p className="mb-2">Room 1 description...</p>
                  <p className="text-lg font-bold">$XXX / night</p>
                </TabsContent>
                <TabsContent value="room2">
                  <h3 className="text-xl font-semibold mb-2">Room 2 Name</h3>
                  <p className="mb-2">Room 2 description...</p>
                  <p className="text-lg font-bold">$XXX / night</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Price Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="multiple" className="rounded-md border" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                Map Placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
