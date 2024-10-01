import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/constants/Property";

interface CategoryDropdownProps {
  categories: CategoryType[] | undefined;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  onSelect: (categoryId: string) => void;
  onCreateNew: (categoryName: string) => Promise<void>;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  setCategories,
  onSelect,
  onCreateNew,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | number>(
    "select",
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "new") {
      setIsCreatingNew(true);
    } else {
      setSelectedCategory(Number(value));
      onSelect(value);
    }
  };

  const handleCreateNewCategory = () => {
    if (newCategoryName.trim()) {
      onCreateNew(newCategoryName.trim());
      setNewCategoryName("");
      setIsCreatingNew(false);
    }
  };

  const selectOptions = [
    { value: "select", label: "Select a category" },
    { value: "new", label: "Create new category" },
    ...(categories?.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })) ?? []),
  ];

  return (
    <div>
      {!isCreatingNew ? (
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="property.categoryId">Category</Label>
          <select
            value={selectedCategory}
            onChange={handleSelectChange}
            className="h-full p-2 border rounded-lg"
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
            <Button
              onClick={handleCreateNewCategory}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
