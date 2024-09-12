"use client";
import propertyService from "@/services/propertyService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CategoryType, PropertyAndRoomType } from "@/constants/Property";

// const fetchProperties = () => propertyService.getAllProperties();
// const fetchCities = () => propertyService.getAllCities();
// const fetchCategories = () => propertyService.getAllCategory();

export const usePropertyUtils = () => {
  // const {
  //   data: properties = [],
  //   isLoading: propertiesLoading,
  //   error: propertiesError,
  //   refetch: refetchProperties,
  // } = useQuery({ queryKey: ["properties"], queryFn: fetchProperties });
  //
  // const {
  //   data: cities = [],
  //   isLoading: citiesLoading,
  //   error: citiesError,
  //   refetch: refetchCities,
  // } = useQuery({ queryKey: ["cities"], queryFn: fetchCities });
  //
  // const {
  //   data: categories = [],
  //   isLoading: categoriesLoading,
  //   error: categoriesError,
  //   refetch: refetchCategories,
  // } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  const [properties, setProperties] = useState<PropertyAndRoomType[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const data = await propertyService.getAllProperties();
      setProperties(data);
    } catch (error) {
      setError("Error fetching properties");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const data = await propertyService.getAllCities();
      setCities(data);
    } catch (error) {
      setError("Error fetching cities");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await propertyService.getAllCategory();
      setCategories(data);
    } catch (error) {
      setError("Error fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const data = await propertyService.getAllImages();
      console.log("data", data);
      setImages(data);
    } catch (error) {
      setError("Error fetching images");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchCities();
    fetchCategories();
    fetchImages();
  }, []);

  return {
    properties,
    cities,
    categories,
    images,
    isLoading,
    error,
  };
};
