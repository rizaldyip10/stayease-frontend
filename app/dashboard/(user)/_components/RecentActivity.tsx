import React from "react";
import { CalendarDays, MessageSquare, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivityProps {
  className?: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-blue-950">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-2" />
            <span>
              Booked &quot;Mountain Retreat&quot; for Jul 3 - Jul 7, 2024
            </span>
          </li>
          <li className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <span>New message from host of &quot;Sunny Beach House&quot;</span>
          </li>
          <li className="flex items-center">
            <Star className="h-5 w-5 mr-2" />
            <span>
              Left a 5-star review for &quot;City Loft Apartment&quot;
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
