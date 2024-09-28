import { PropertyAndRoomType } from "@/constants/Property";
import propertyService from "@/services/propertyService";
import { useFetchData } from "@/hooks/utils/useFetchData";
import { useQueryClient } from "@tanstack/react-query";

export const usePropertyData = (propertyId: number) => {
  const queryClient = useQueryClient();

  const {
    data: propertyById,
    error,
    isLoading,
  } = useFetchData<PropertyAndRoomType>(`propertyById-${propertyId}`, () =>
    propertyService.getPropertyById(propertyId),
  );

  const fetchPropertyById = async () => {
    await queryClient.invalidateQueries({
      queryKey: [`propertyById-${propertyId}`],
    });
  };

  return {
    propertyById,
    fetchPropertyById,
    isLoading,
    error,
  };
};
