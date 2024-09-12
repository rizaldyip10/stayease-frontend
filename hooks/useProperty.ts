import { useState, useEffect } from "react";
import axios from "axios";
import { PropertyAndRoomType } from "@/constants/Property";
import { config } from "@/constants/url";
import propertyService from "@/services/propertyService";
import { queryClient } from "@/lib/queryClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const useProperties = () => {
  const [properties, setProperties] = useState<PropertyAndRoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("useEffect hook is running");

    const fetchProperties = async () => {
      console.log("Fetching properties...");
      try {
        setLoading(true);
        const response = await propertyService.getAllProperties();
        console.log("Axios response:", response);
        setProperties(response);
        setError(null);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();

    return () => {
      console.log("Cleanup: Component unmounting");
    };
  }, []);

  return { properties, loading, error };
};
