"use client";
import React from "react";
import StatusGrid from "@/app/dashboard/(user)/_components/StatusGrid";
import UpcomingTrips from "@/app/dashboard/(user)/_components/UpcomingTrips";
import QuickActions from "@/app/dashboard/(user)/_components/QuickActions";
import RecentActivity from "@/app/dashboard/(user)/_components/RecentActivity";
import { CalendarDays, Home, MessageSquare, Star } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import ProfileCard from "@/app/dashboard/(user)/_components/ProfileCard";
import GlobalLoading from "@/components/GlobalLoading";
import ErrorComponent from "@/components/ErrorComponent";
import {useUserStats} from "@/hooks/reports/useUserStats";

const UserDashboard: React.FC = () => {
  const { profile, isLoading, error } = useProfile();
  const { userStats } = useUserStats();

  if (!profile)
    return (
      <div className="flex items-center justify-center align-middle h-[200px]">
        <GlobalLoading height={100} width={100} />
      </div>
    );

  if (error) {
    return <ErrorComponent message={error.message} fullPage />;
  }

  // !! TODO: Replace with real data
  const stats = [
    { icon: Home, label: "Upcoming Trips", value: userStats?.upcomingTrips },
    { icon: CalendarDays, label: "Past Stays", value: userStats?.pastStays }
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
        Welcome, {profile.firstName}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileCard user={profile} className="col-span-1 md:col-span-3" />
        <StatusGrid stats={stats} className="col-span-1 md:col-span-3" />
        <UpcomingTrips className="col-span-1 md:col-span-2" />
        <QuickActions actions={actions} className="col-span-1 md:col-span-2" />
        <RecentActivity className="col-span-1 md:col-span-3" />
      </div>
    </div>
  );
};

export default UserDashboard;
