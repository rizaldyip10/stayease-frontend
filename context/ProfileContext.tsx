import {
  profileService,
  TenantProfile,
  UserProfile,
} from "@/services/profileService";
import { createContext, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useImageUpload } from "@/hooks/utils/useImageUpload";
import { useFetchData } from "@/hooks/utils/useFetchData";
import { useEditData } from "@/hooks/utils/useEditData";
import { queryClient } from "@/lib/queryClient";
import { useAlert } from "./AlertContext";

export interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  isEditing: boolean;
  isTenantEditing: boolean;
  updateProfile: (values: Partial<UserProfile>) => void;
  updateTenantProfile: (values: Partial<TenantProfile>) => void;
  toggleEditing: () => void;
  toggleTenantEditing: () => void;
  uploadAvatar: (file: File) => Promise<void>;
  removeAvatar: () => Promise<void>;
  showAlert: (type: "success" | "error", message: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isTenantEditing, setIsTenantEditing] = useState<boolean>(false);
  const { data: session, update } = useSession();
  const { showAlert } = useAlert();
  const { handleImageUpload } = useImageUpload("profile");

  const {
    data: profile,
    error,
    isLoading,
  } = useFetchData<UserProfile>("profile", profileService.getProfile, {
    enabled: !!session,
  });

  const { mutate: updateProfile } = useEditData<
    UserProfile,
    Error,
    Partial<UserProfile>
  >(
    profileService.updateProfile,
    (data) => {
      queryClient.setQueryData(["profile"], data);
      setIsEditing(false);
      showAlert("success", "Profile updated successfully!");
    },
    (error) => {
      showAlert("error", "Failed to update profile");
    },
  );

  const { mutate: updateTenantProfile } = useEditData<
    UserProfile,
    Error,
    Partial<TenantProfile>
  >(
    profileService.updateTenantProfile,
    (data) => {
      queryClient.setQueryData(["profile"], data);
      setIsTenantEditing(false);
      showAlert("success", "Tenant profile updated successfully!");
    },
    (error: any) => {
      showAlert("error", "Failed to update tenant profile " + error.message);
    },
  );

  const uploadAvatar = async (file: File) => {
    try {
      const imageUrl = await handleImageUpload(
        file,
        "avatarUrl",
        (field, value) => {
          queryClient.setQueryData(
            ["profile"],
            (oldData: UserProfile | undefined) => {
              return oldData
                ? { ...oldData, [field]: value.avatarUrl }
                : oldData;
            },
          );
        },
      );
      await profileService.setOrRemoveAvatar({ avatarUrl: imageUrl });
      update({ ...session, user: { ...session?.user, avatarUrl: imageUrl } });
      showAlert("success", "Avatar uploaded successfully", "/profile");
    } catch (error) {
      showAlert("error", "Failed to upload avatar");
    }
  };

  const removeAvatar = async () => {
    try {
      await profileService.setOrRemoveAvatar(null);
      queryClient.setQueryData(
        ["profile"],
        (oldData: UserProfile | undefined) => {
          return oldData ? { ...oldData, avatarUrl: null } : null;
        },
      );
      update({ ...session, user: { ...session?.user, avatarUrl: null } });
      showAlert("success", "Avatar removed successfully");
    } catch (error) {
      showAlert("error", "Failed to remove avatar");
    }
  };

  const toggleEditing = () => setIsEditing((prev) => !prev);
  const toggleTenantEditing = () => setIsTenantEditing((prev) => !prev);

  return (
    <ProfileContext.Provider
      value={{
        profile: profile ?? null,
        isLoading,
        error,
        isEditing,
        isTenantEditing,
        updateProfile,
        updateTenantProfile,
        toggleEditing,
        toggleTenantEditing,
        uploadAvatar,
        removeAvatar,
        showAlert,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};
