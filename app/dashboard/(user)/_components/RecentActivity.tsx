import React from "react";
import { CalendarDays, MessageSquare, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivity: React.FC = () => {
  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader>
        <CardTitle className="text-blue-950">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-2" />
            <span>Booked "Mountain Retreat" for Jul 3 - Jul 7, 2024</span>
          </li>
          <li className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <span>New message from host of "Sunny Beach House"</span>
          </li>
          <li className="flex items-center">
            <Star className="h-5 w-5 mr-2" />
            <span>Left a 5-star review for "City Loft Apartment"</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
