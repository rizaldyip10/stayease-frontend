import React from "react";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCategoryManagement } from "@/hooks/properties/useCategoryManagement";
import LoadingButton from "@/components/LoadingButton";

interface CategoryDropdownProps {
  initialCategoryId?: number;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  initialCategoryId,
}) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const {
    categories,
    selectedCategory,
    isCreatingNew,
    handleSelectChange,
    handleCreateNewCategory,
    setIsCreatingNew,
    isLoading,
  } = useCategoryManagement(initialCategoryId);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    handleSelectChange(value);
    if (value !== "new") {
      setFieldValue("property.categoryId", Number(value));
    }
  };

  const onCreateNew = async () => {
    const categoryName = values.category.name.trim();
    if (categoryName) {
      const newCategory = await handleCreateNewCategory(categoryName);
      if (newCategory) {
        await setFieldValue("property.categoryId", newCategory.id);
      }
    }
  };

  return (
    <div>
      {!isCreatingNew ? (
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="property.categoryId">Category</Label>
          <select
            value={selectedCategory?.id || ""}
            onChange={onSelectChange}
            className="h-full p-2.5 border rounded-lg text-sm"
          >
            <option value="">Select a category</option>
            <option value="new">Create new category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ErrorMessage
            name="property.categoryId"
            component="div"
            className="text-red-500"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="category.name">New Category Name</Label>
            <Field name="category.name" as={Input} />
            <ErrorMessage
              name="category.name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-row gap-3">
            {isLoading ? (
              <LoadingButton title="Creating category.." />
            ) : (
              <>
                <Button
                  type="submit"
                  onClick={onCreateNew}
                  className="bg-blue-950 hover:bg-gray-100 hover:text-blue-950"
                >
                  Create
                </Button>
                <Button
                  onClick={() => setIsCreatingNew(false)}
                  className="bg-appcancel hover:bg-appgray hover:text-appcancel"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
