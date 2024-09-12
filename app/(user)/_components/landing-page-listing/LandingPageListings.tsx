import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const LandingPageListings = () => {
  // TODO dummy data fetch from backend
  const properties = [
    {
      id: 1,
      tenant: "John Doe",
      category: "Apartment",
      propertyName: "Ocean Breeze Apartment",
      description: "A cozy apartment with a beautiful ocean view.",
      imageUrl: "https://example.com/ocean-breeze.jpg",
      address: "123 Beach Road",
      city: "Miami",
      country: "USA",
      latitude: 25.7617,
      longitude: -80.1918,
      rooms: [
        { roomId: 1, roomName: "Ocean View Suite", roomBasePrice: 200 },
        { roomId: 2, roomName: "Sunset Suite", roomBasePrice: 180 },
      ],
    },
    {
      id: 2,
      tenant: "Jane Smith",
      category: "Villa",
      propertyName: "Mountain Retreat Villa",
      description: "A luxurious villa located in the mountains.",
      imageUrl: "https://example.com/mountain-retreat.jpg",
      address: "456 Mountain Lane",
      city: "Aspen",
      country: "USA",
      latitude: 39.1911,
      longitude: -106.8175,
      rooms: [
        { roomId: 3, roomName: "Mountain View Room", roomBasePrice: 250 },
        { roomId: 4, roomName: "Garden Suite", roomBasePrice: 220 },
      ],
    },
    {
      id: 3,
      tenant: "Alice Johnson",
      category: "Cottage",
      propertyName: "Lakeside Cottage",
      description:
        "A charming cottage by the lake, perfect for a quiet getaway.",
      imageUrl: "https://example.com/lakeside-cottage.jpg",
      address: "789 Lakeview Drive",
      city: "Lake Tahoe",
      country: "USA",
      latitude: 39.0968,
      longitude: -120.0324,
      rooms: [
        { roomId: 5, roomName: "Lakeside Room", roomBasePrice: 150 },
        { roomId: 6, roomName: "Forest View Suite", roomBasePrice: 170 },
      ],
    },
    {
      id: 4,
      tenant: "Michael Brown",
      category: "Resort",
      propertyName: "Tropical Paradise Resort",
      description: "A luxurious resort in a tropical paradise.",
      imageUrl: "https://example.com/tropical-paradise.jpg",
      address: "111 Palm Tree Avenue",
      city: "Honolulu",
      country: "USA",
      latitude: 21.3069,
      longitude: -157.8583,
      rooms: [
        { roomId: 7, roomName: "Beachfront Bungalow", roomBasePrice: 300 },
        { roomId: 8, roomName: "Ocean Villa", roomBasePrice: 320 },
      ],
    },
    {
      id: 5,
      tenant: "Sara White",
      category: "Hotel",
      propertyName: "City Center Hotel",
      description: "A modern hotel in the heart of the city.",
      imageUrl: "https://example.com/city-center-hotel.jpg",
      address: "500 Central Avenue",
      city: "New York",
      country: "USA",
      latitude: 40.7128,
      longitude: -74.006,
      rooms: [
        { roomId: 9, roomName: "Deluxe Room", roomBasePrice: 180 },
        { roomId: 10, roomName: "Executive Suite", roomBasePrice: 250 },
      ],
    },
    {
      id: 6,
      tenant: "Robert Lee",
      category: "Hostel",
      propertyName: "Urban Backpacker Hostel",
      description: "A budget-friendly hostel for travelers.",
      imageUrl: "https://example.com/urban-backpacker.jpg",
      address: "222 Travel Street",
      city: "San Francisco",
      country: "USA",
      latitude: 37.7749,
      longitude: -122.4194,
      rooms: [
        { roomId: 11, roomName: "Shared Dormitory", roomBasePrice: 40 },
        { roomId: 12, roomName: "Private Room", roomBasePrice: 100 },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Reserve The Finest Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Map through properties from API */}
        {/* Replace with actual data from your API */}
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <Image
              src={property.imageUrl}
              alt={property.propertyName}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">
                  {property.propertyName}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{property.address}</p>
              <p className="text-lg font-bold">
                € {property.rooms[0].roomBasePrice}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingPageListings;

// API Integration:
// 1. Fetch property data from your API (e.g., GET /api/properties?limit=6)
// 2. Replace the hardcoded map with the fetched data
// 3. Use actual property data for name, address, price, etc.
