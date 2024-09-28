"use client";
import propertyService from "@/services/propertyService";
import { useFetchData } from "@/hooks/utils/useFetchData";
import { CategoryType, PropertyAndRoomType } from "@/constants/Property";
import { useQueryClient } from "@tanstack/react-query";

export const usePropertyUtils = () => {
  const queryClient = useQueryClient();
  const {
    data: properties,
    error: propertiesError,
    isLoading: propertiesIsLoading,
  } = useFetchData<PropertyAndRoomType[]>(
    "properties",
    propertyService.getAllProperties,
  );

  const {
    data: cities,
    error: citiesError,
    isLoading: citiesIsLoading,
  } = useFetchData<string[]>("cities", propertyService.getAllCities);

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesIsLoading,
    setData: setCategories,
  } = useFetchData<CategoryType[]>(
    "categories",
    propertyService.getAllCategories,
  );

  const {
    data: images,
    error: imagesError,
    isLoading: imagesIsLoading,
  } = useFetchData<string[]>("images", propertyService.getAllImages);

  const isLoading =
    propertiesIsLoading ||
    citiesIsLoading ||
    categoriesIsLoading ||
    imagesIsLoading;
  const error =
    propertiesError || citiesError || categoriesError || imagesError;

  const fetchCategories = async () => {
    await queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  return {
    properties,
    cities,
    categories,
    fetchCategories,
    images,
    isLoading,
    error,
  };
};
