"use client";
import propertyService from "@/services/propertyService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CategoryType, PropertyAndRoomType } from "@/constants/Property";

export const usePropertyUtils = () => {
  // const [properties, setProperties] = useState<PropertyAndRoomType[]>([]);
  // const [cities, setCities] = useState<string[]>([]);
  // const [categories, setCategories] = useState<CategoryType[]>([]);
  // const [images, setImages] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // const fetchProperties = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await propertyService.getAllProperties();
  //     setProperties(data);
  //   } catch (error) {
  //     setError("Error fetching properties");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const {
    data: properties,
    error: propertiesError,
    isLoading: propertiesIsLoading,
  } = useQuery<PropertyAndRoomType[], Error>({
    queryKey: ["properties"],
    queryFn: propertyService.getAllProperties,
    staleTime: 1000 * 60 * 5, // 5 mins
    gcTime: 1000 * 60 * 10, // 10 mins
  });

  const {
    data: cities,
    error: citiesError,
    isLoading: citiesIsLoading,
  } = useQuery<string[], Error>({
    queryKey: ["cities"],
    queryFn: propertyService.getAllCities,
    staleTime: 1000 * 60 * 5, // 5 mins
    gcTime: 1000 * 60 * 10, // 10 mins
  });

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useQuery<CategoryType[], Error>({
    queryKey: ["categories"],
    queryFn: propertyService.getAllCategories,
    staleTime: 1000 * 60 * 5, // 5 mins
    gcTime: 1000 * 60 * 10, // 10 mins
  });

  const {
    data: images,
    error: imagesError,
    isLoading: imagesIsLoading,
  } = useQuery<string[], Error>({
    queryKey: ["images"],
    queryFn: propertyService.getAllImages,
    staleTime: 1000 * 60 * 5, // 5 mins
    gcTime: 1000 * 60 * 10, // 10 mins
  });

  const isLoading =
    propertiesIsLoading ||
    citiesIsLoading ||
    categoriesIsLoading ||
    imagesIsLoading;
  const error =
    propertiesError || citiesError || categoriesError || imagesError;

  // const fetchCities = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await propertyService.getAllCities();
  //     setCities(data);
  //   } catch (error) {
  //     setError("Error fetching cities");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  //
  // const fetchCategories = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await propertyService.getAllCategories();
  //     setCategories(data);
  //   } catch (error) {
  //     setError("Error fetching categories");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  //
  // const fetchImages = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await propertyService.getAllImages();
  //     console.log("data", data);
  //     setImages(data);
  //   } catch (error) {
  //     setError("Error fetching images");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  //
  // useEffect(() => {
  //   fetchProperties();
  //   fetchCities();
  //   fetchCategories();
  //   fetchImages();
  // }, []);

  return {
    properties,
    cities,
    categories,
    images,
    isLoading,
    error,
  };
};
