import { useAlert } from "@/hooks/utils/useAlert";
import { usePropertyData } from "@/hooks/properties/usePropertyData";
import { useCategoryManagement } from "@/hooks/properties/useCategoryManagement";
import { useImageUpload } from "@/hooks/utils/useImageUpload";
import { usePropertyUtils } from "@/hooks/properties/usePropertyUtils";
import propertyService from "@/services/propertyService";

export const usePropertyEdit = (propertyId: number) => {
  const { property, rooms, isLoading, error, updateProperty, updateRooms } =
    usePropertyData(propertyId);
  const { categories } = usePropertyUtils();
  const { alertInfo, hideAlert, showAlert } = useAlert();
  const { handleImageUpload } = useImageUpload("property");
  const { selectedCategory, handleCategorySelect, handleCreateNewCategory } =
    useCategoryManagement(categories ?? []);

  const handleSubmit = async (values: any) => {
    try {
      await updateProperty(values.property);
      await updateRooms(values.rooms);
      showAlert("success", "Property updated successfully");
    } catch (err) {
      console.error("Error updating property:", err);
      showAlert("error", "Failed to update property");
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
    property,
    rooms,
    isLoading,
    error,
    alertInfo,
    hideAlert,
    categories,
    selectedCategory,
    handleCategorySelect,
    handleCreateNewCategory,
    handleImageUpload,
    handleSubmit,
    handleRemoveRoom,
  };
};
