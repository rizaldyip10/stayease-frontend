import React from "react";
import UserProfileForm from "@/app/(user)/profile/_components/UserProfileForm";
import { useSession } from "next-auth/react";
import TenantProfileForm from "@/app/(user)/profile/_components/TenantProfileForm";
import { useProfile } from "@/context/ProfileContext";
import ErrorComponent from "@/components/ErrorComponent";
import ProfilePageSkeleton from "@/app/(user)/profile/_components/ProfilePageSkeleton";

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

  const { data: sessions, status } = useSession();
  const isUser = sessions?.user?.userType === "USER";

  if (isLoading || !profile) return <ProfilePageSkeleton />;
  if (error) return <ErrorComponent message={error.message} fullPage />;

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
