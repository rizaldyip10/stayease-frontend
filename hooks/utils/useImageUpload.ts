import { useCallback } from "react";
import propertyService from "@/services/propertyService";
import { profileService } from "@/services/profileService";
import { useAlert } from "@/context/AlertContext";

type ImageUploaderType = "profile" | "property";
export const useImageUpload = (type: ImageUploaderType) => {
  const { showAlert } = useAlert();

  const handleImageUpload = useCallback(
    async (
      file: File,
      fieldName: string,
      setFieldValue: (field: string, value: any) => void,
    ): Promise<void> => {
      try {
        const uploadFunction =
          type === "profile"
            ? profileService.uploadAvatar
            : propertyService.uploadImage;
        const imageUrl = await uploadFunction(file);
        setFieldValue(fieldName, imageUrl);
      } catch (error) {
        console.error("Error uploading image: ", error);
        showAlert("error", "Failed to upload image");
        throw error;
      }
    },
    [showAlert],
  );

  return { handleImageUpload };
};
