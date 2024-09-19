import React, { useState, useEffect } from "react";
import axios from "axios";
import { CategoryType } from "@/constants/Property";
import propertyService from "@/services/propertyService";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePropertyUtils } from "@/hooks/properties/usePropertyUtils";

interface Category {
  id: number;
  name: string;
}

interface CategoryDropdownProps {
  categories: Category[] | undefined;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  onSelect: (categoryId: string) => void;
  onCreateNew: (categoryName: string) => Promise<void>;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  setCategories,
  onSelect,
  onCreateNew,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | string>("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  console.log("categories in dropdown", categories);
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

  return (
    <div>
      {!isCreatingNew ? (
        <select value={selectedCategory} onChange={handleSelectChange}>
          <option value="">Select a category</option>
          <option value="new">Create new category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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
