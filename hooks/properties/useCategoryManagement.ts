import { useCallback, useEffect, useState } from "react";
import { CategoryType } from "@/constants/Property";
import propertyService from "@/services/propertyService";
import { useAlert } from "@/context/AlertContext";
import { usePropertyUtils } from "@/hooks/properties/usePropertyUtils";
import { useQueryClient } from "@tanstack/react-query";

export const useCategoryManagement = (initialCategoryId?: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );
  const { categories } = usePropertyUtils();
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (categories && initialCategoryId) {
      const initialCategory = categories.find(
        (cat) => cat.id === initialCategoryId,
      );
      if (initialCategory) {
        setSelectedCategory(initialCategory);
      }
    }
  }, [categories, initialCategoryId]);

  const findCategoryId = useCallback(
    (categoryName: string) => {
      const category = categories?.find((cat) => cat.name === categoryName);
      return category?.id;
    },
    [categories],
  );

  const handleSelectChange = useCallback(
    (value: string) => {
      setIsCreatingNew(value === "new");
      if (value !== "new") {
        const category = categories?.find((cat) => cat.id === Number(value));
        setSelectedCategory(category || null);
      }
    },
    [categories],
  );

  const handleCreateNewCategory = useCallback(
    async (categoryName: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const newCategory = await propertyService.createCategory({
          name: categoryName,
        });
        await queryClient.invalidateQueries({ queryKey: ["categories"] });

        showAlert("success", "New category created successfully");
        setSelectedCategory(newCategory);
        setIsCreatingNew(false);
        return newCategory;
      } catch (error: any) {
        setError(error.response.data.message);
        showAlert(
          "error",
          "Failed to create new category: " + error.response.data.message,
        );
      } finally {
        setIsLoading(false);
      }
    },
    [showAlert, queryClient],
  );

  return {
    categories,
    findCategoryId,
    selectedCategory,
    isCreatingNew,
    isLoading,
    error,
    handleSelectChange,
    handleCreateNewCategory,
    setIsCreatingNew,
  };
};
