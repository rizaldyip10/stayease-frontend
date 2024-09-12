import React from "react";
import SearchFilterCard from "@/app/(user)/properties/_components/SearchFilterCard";
import PropertyListingCard from "@/app/(user)/properties/_components/PropertyListingCard";

const PropertiesPage: React.FC = () => {
  // !! TODO: dummy datas, replace with actual data from API
  const locations = ["Bali", "Jakarta", "Yogyakarta"];

  // !! TODO: dummy datas, replace with actual data from API
  const mockProperties = [
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <SearchFilterCard />
        </div>

        <div className="md:col-span-3">
          <div className="mb-4">
            <div id="map" className="w-full h-64 bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Map through properties from API */}
            {mockProperties.map((property) => (
              <PropertyListingCard property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;

// API Integration:
// 1. Fetch property data from your API (e.g., GET /api/properties with query parameters for filters)
// 2. Replace the hardcoded map with the fetched data
// 3. Use actual property data for name, address, price, etc.
// 4. Implement filter logic to update the property list based on selected filters
// 5. Fetch categories for the category dropdown (e.g., GET /api/categories)
