import React from "react";
import ProfileCard from "@/app/dashboard/(user)/_components/ProfileCard";
import StatusGrid from "@/app/dashboard/(user)/_components/StatusGrid";
import UpcomingTrips from "@/app/dashboard/(user)/_components/UpcomingTrips";
import QuickActions from "@/app/dashboard/(user)/_components/QuickActions";
import RecentActivity from "@/app/dashboard/(user)/_components/RecentActivity";
import { CalendarDays, Home, MessageSquare, Star } from "lucide-react";

const UserDashboard: React.FC = () => {
  // !! TODO: DUMMY DATA - Replace with real data
  const user = {
    name: "Alice Smith",
    email: "alice@example.com",
    avatar: "/api/placeholder/150/150",
  };

  // !! TODO: Replace with real data
  const stats = [
    { icon: <Home className="h-4 w-4" />, label: "Upcoming Trips", value: "2" },
    {
      icon: <CalendarDays className="h-4 w-4" />,
      label: "Past Stays",
      value: "5",
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "Messages",
      value: "3",
    },
    { icon: <Star className="h-4 w-4" />, label: "Avg. Rating", value: "4.9" },
  ];

  const actions = [
    {
      icon: <Home className="h-4 w-4" />,
      label: "Find a Place to Stay",
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "My Messages",
    },
    {
      icon: <Star className="h-4 w-4" />,
      label: "My Reviews",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-950">
        My Travel Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileCard user={user} className="col-span-1 md:col-span-3" />
        <StatusGrid stats={stats} className="col-span-1 md:col-span-3" />
        <UpcomingTrips className="col-span-1 md:col-span-2" />
        <QuickActions actions={actions} className="col-span-1 md:col-span-2" />
        <RecentActivity className="col-span-1 md:col-span-3" />
      </div>
    </div>
  );
};

export default UserDashboard;
