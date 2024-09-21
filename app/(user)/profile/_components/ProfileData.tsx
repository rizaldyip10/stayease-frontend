import React from "react";
import UserProfileForm from "@/app/(user)/profile/_components/UserProfileForm";
import { useSession } from "next-auth/react";
import TenantProfileForm from "@/app/(user)/profile/_components/TenantProfileForm";
import { useProfile } from "@/context/ProfileContext";
import { useAlert } from "@/hooks/utils/useAlert";
import AlertComponent from "@/components/AlertComponent";

const ProfilePage: React.FC = () => {
  const {
    profile,
    isLoading,
    error,
    isEditing,
    isTenantEditing,
    updateProfile,
    updateTenantProfile,
    toggleEditing,
    toggleTenantEditing,
  } = useProfile();

  const { data: sessions } = useSession();
  const isUser = sessions?.user?.userType === "USER";

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
      {!isUser && profile.tenantInfo && (
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
