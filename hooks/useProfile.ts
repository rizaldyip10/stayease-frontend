import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import {
  profileService,
  TenantProfile,
  UpdateProfile,
  UserProfile,
  UserImage,
} from "@/services/profileService";

export const useProfile = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [isTenantEditing, setIsTenantEditing] = useState(false);

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<UserProfile, Error>({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
    enabled: !!auth, // Only fetch if user is authenticated
  });

  const updateProfileMutation = useMutation<
    UserProfile,
    Error,
    Partial<UpdateProfile>
  >({
    mutationFn: (values: Partial<UpdateProfile>) =>
      profileService.updateProfile(values),
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    },
  });

  const updateTenantProfileMutation = useMutation<
    UserProfile,
    Error,
    Partial<TenantProfile>
  >({
    mutationFn: (values: Partial<TenantProfile>) =>
      profileService.updateTenantProfile(values),
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
      setIsTenantEditing(false);
      alert("Tenant profile updated successfully!");
    },
  });

  const uploadAvatarMutation = useMutation<UserImage, Error, File>({
    mutationFn: (file: File) => profileService.uploadAvatar(file),
  });

  const setAvatarMutation = useMutation<UserImage, Error, UserImage | null>({
    mutationFn: (userImage: UserImage | null) =>
      profileService.setOrRemoveAvatar(userImage),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["profile"],
        (oldData: UserProfile | undefined) => {
          if (oldData) {
            console.log("showing oldData:", oldData);
            return { ...oldData, avatarUrl: data ? data.avatarUrl : null };
          }
          return oldData;
        },
      );
      alert("Avatar updated successfully!");
    },
  });

  const uploadAvatar = async (file: File): Promise<UserImage> => {
    const result = await uploadAvatarMutation.mutateAsync(file);
    console.log("result:", result);
    if (!result || !result.avatarUrl) {
      throw new Error("Failed to get avatar URL after upload");
    }
    return result;
  };

  const setOrRemoveAvatar = async (
    userImage: UserImage | null,
  ): Promise<UserImage | null> => {
    return setAvatarMutation.mutateAsync(userImage);
  };

  const toggleEditing = () => setIsEditing(!isEditing);
  const toggleTenantEditing = () => setIsTenantEditing(!isTenantEditing);

  const updateProfile = (profileData: Partial<UserProfile>) => {
    updateProfileMutation.mutate(profileData);
  };

  return {
    profile,
    isLoading,
    error,
    isEditing,
    isTenantEditing,
    toggleEditing,
    toggleTenantEditing,
    updateProfile: updateProfileMutation.mutate,
    updateTenantProfile: updateTenantProfileMutation.mutate,
    uploadAvatar,
    setOrRemoveAvatar,
  };
};
