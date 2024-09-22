import React from "react";
import {
  CalendarDays,
  DollarSign,
  Home,
  MessageSquare,
  Star,
} from "lucide-react";
import StatusGrid from "@/app/dashboard/(user)/_components/StatusGrid";
import PropertyManagement from "@/app/dashboard/(tenant)/_components/PropertyManagement";
import RecentActivity from "@/app/dashboard/(user)/_components/RecentActivity";
import QuickActions from "@/app/dashboard/(user)/_components/QuickActions";
import PeakRateManagement from "@/app/dashboard/(tenant)/_components/PeakSeasonRateMgmt";
import { useProfile } from "@/context/ProfileContext";
import ProfileCard from "@/app/dashboard/(user)/_components/ProfileCard";

const TenantDashboard: React.FC = () => {
  const { profile, isLoading, error } = useProfile();
  if (!profile) return <div>No profile data available</div>;

  const fullName = profile?.firstName + " " + (profile?.lastName ?? "");

  // TODO : Replace with real data
  const stats = [
    { icon: <Home className="h-4 w-4" />, label: "Properties", value: "3" },
    {
      icon: <CalendarDays className="h-4 w-4" />,
      label: "Bookings",
      value: "12",
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "Messages",
      value: "5",
    },
    { icon: <Star className="h-4 w-4" />, label: "Avg. Rating", value: "4.8" },
    {
      icon: <DollarSign className="h-4 w-4" />,
      label: "Revenue",
      value: "$5,240",
    },
  ];

  // TODO : Replace with real data
  const actions = [
    {
      icon: <CalendarDays className="h-4 w-4" />,
      label: "View Calendar",
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "Inbox",
    },
    {
      icon: <DollarSign className="h-4 w-4" />,
      label: "Financial Reports",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-950">
        Welcome, {profile.tenantInfo?.businessName}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProfileCard className="col-span-1" user={profile} />
        <StatusGrid className="col-span-1 md:col-span-3" stats={stats} />
        <PeakRateManagement className="w-full col-span-1 md:col-span-2" />
        <PropertyManagement className="col-span-1 md:col-span-2" />
        <RecentActivity className="col-span-1 md:col-span-3" />
        <QuickActions actions={actions} className="col-span-1" />
      </div>
    </div>
  );
};

export default TenantDashboard;
