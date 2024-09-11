import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Home, MessageSquare, Star } from "lucide-react";

interface StatusGridProps {
  stats: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[];
}

const StatusGrid: React.FC<StatusGridProps> = ({ stats }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-blue-950">Travel Overview</CardTitle>
        <CardDescription>Your activity on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-gray-100 rounded-lg"
            >
              <div className="mr-4">{stat.icon}</div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-blue-950">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusGrid;
