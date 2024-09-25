import { useState, useCallback, useEffect } from "react";
import { CategoryType } from "@/constants/Property";
import propertyService from "@/services/propertyService";
import { useAlert } from "@/context/AlertContext";

export const useCategoryManagement = (
  categories: CategoryType[],
  initialCategoryId?: number,
) => {
  const [categoriesState, setCategories] = useState<CategoryType[]>(categories);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );
  const { showAlert } = useAlert();

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

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      const category = categories.find((cat) => cat.id === Number(categoryId));
      setSelectedCategory(category || null);
    },
    [categories],
  );

  const handleCreateNewCategory = useCallback(
    async (categoryName: string) => {
      try {
        // Assuming you have a category creation service method
        const newCategory = await propertyService.createCategory({
          name: categoryName,
        });

        showAlert("success", "New category created successfully");
        setSelectedCategory(newCategory);
        setCategories((prevCategories: CategoryType[]) => [
          ...prevCategories,
          newCategory,
        ]);
        return newCategory;
      } catch (error) {
        showAlert("error", "Failed to create new category");
        throw error;
      }
    },
    [showAlert],
  );

  return {
    categories,
    selectedCategory,
    handleCategorySelect,
    handleCreateNewCategory,
  };
};
