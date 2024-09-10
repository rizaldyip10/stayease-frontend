import React from "react";
import { useProfile } from "@/hooks/useProfile";
import UserProfileForm from "@/app/(user)/profile/_components/UserProfileForm";
import TenantProfileForm from "@/app/(user)/profile/_components/TenantProfileForm";

const ProfilePage: React.FC = () => {
  const {
    profile,
    isLoading,
    error,
    isEditing,
    isTenantEditing,
    toggleEditing,
    toggleTenantEditing,
    updateProfile,
    updateTenantProfile,
  } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <div className="flex flex-col gap-4 container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile Data</h1>
      <UserProfileForm
        profile={profile}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        updateProfile={updateProfile}
      />
      {profile.userType === "TENANT" && profile.tenantInfo && (
        <TenantProfileForm
          tenantInfo={profile.tenantInfo}
          isEditing={isTenantEditing}
          toggleEditing={toggleTenantEditing}
          updateTenantProfile={updateTenantProfile}
        />
      )}
    </div>
  );
};

export default ProfilePage;
