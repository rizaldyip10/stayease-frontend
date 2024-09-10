import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import {
  profileService,
  TenantProfile,
  UpdateProfile,
  UserProfile,
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
  };
};
