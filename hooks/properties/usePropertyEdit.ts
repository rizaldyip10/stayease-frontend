import { usePropertyData } from "@/hooks/properties/usePropertyData";
import { useCategoryManagement } from "@/hooks/properties/useCategoryManagement";
import { useImageUpload } from "@/hooks/utils/useImageUpload";
import { usePropertyUtils } from "@/hooks/properties/usePropertyUtils";
import propertyService from "@/services/propertyService";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

type PropertyEditFormValues = {
  property: {
    name: string;
    description: string;
    categoryId: number;
    imageUrl: string;
  };
  rooms: {
    name: string;
    description: string;
    basePrice: number;
    capacity: number;
    imageUrl: string;
  }[];
  category: string;
};

export const usePropertyEdit = (propertyId: number) => {
  const { isLoading, error, updateProperty, updateRooms } =
    usePropertyData(propertyId);
  const { showAlert } = useAlert();

  const router = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      await updateProperty(values.property);
      await updateRooms(values.rooms);
      showAlert(
        "success",
        "Property updated successfully",
        "/dashboard/properties",
      );
    } catch (err) {
      console.error("Error updating property:", err);
      showAlert("error", "Failed to update property");
      setTimeout(() => {
        router.push(`/dashboard/properties`);
      }, 2000);
    }
  };

  const handleRemoveRoom = async (roomId: number) => {
    try {
      await propertyService.deleteRoom(propertyId, roomId);
      showAlert("success", "Room deleted successfully");
    } catch (err) {
      console.error("Error deleting room:", err);
      showAlert("error", "Failed to delete room");
    }
  };

  return {
    isLoading,
    error,
    handleSubmit,
    handleRemoveRoom,
  };
};
