import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/CustomSelect";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  console.log("categories in dropdown", categories);
  const handleSelectChange = (value: string) => {
    if (value === "new") {
      setIsCreatingNew(true);
    } else {
      setSelectedCategory(value);
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
        <>
          <CustomSelect
            title="Select a category"
            value={selectedCategory}
            onChange={handleSelectChange}
            options={[
              { value: "", label: "Select a category" },
              { value: "new", label: "Create new category" },
              ...(categories?.map((category) => ({
                value: category.id.toString(),
                label: category.name,
              })) ?? []),
            ]}
          />
        </>
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
