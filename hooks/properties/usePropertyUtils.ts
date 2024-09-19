"use client";
import propertyService from "@/services/propertyService";
import { useFetchData } from "@/hooks/utils/useFetchData";
import { CategoryType, PropertyAndRoomType } from "@/constants/Property";

export const usePropertyUtils = () => {
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
  } = useFetchData<CategoryType[]>(
    "categories",
    propertyService.getAllCategories,
  );
  console.log("Fetched categories:", categories);

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

  return {
    properties,
    cities,
    categories,
    images,
    isLoading,
    error,
  };
};
