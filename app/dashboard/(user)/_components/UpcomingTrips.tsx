import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UpcomingTripProps {
  className?: string;
}

const UpcomingTrips: React.FC<UpcomingTripProps> = ({ className }) => {
  // !! TODO: Replace with real data
  const upcomingTrips = [
    {
      name: "Sunny Beach House",
      date: "Jun 15 - Jun 20, 2024",
      location: "Malibu, CA",
    },
    {
      name: "Mountain Retreat",
      date: "Jul 3 - Jul 7, 2024",
      location: "Aspen, CO",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-950">Upcoming Trips</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {upcomingTrips.map((trip, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <h3 className="font-semibold text-blue-950">{trip.name}</h3>
                <p className="text-sm text-gray-500">{trip.date}</p>
                <p className="text-sm text-gray-500">{trip.location}</p>
              </div>
              <Button variant="outline">View Details</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UpcomingTrips;
