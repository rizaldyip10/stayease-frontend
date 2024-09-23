"use client";
import propertyService from "@/services/propertyService";
import { useEffect, useState } from "react";
import { CategoryType, PropertyAndRoomType } from "@/constants/Property";

export const usePropertyUtils = () => {
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
      const data = await propertyService.getAllCategories();
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
