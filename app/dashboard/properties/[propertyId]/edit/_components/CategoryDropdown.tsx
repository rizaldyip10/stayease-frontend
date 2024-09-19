import React, { useState } from "react";
import { CategoryType } from "@/constants/Property";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CategoryDropdownProps {
  categories: CategoryType[] | undefined;
  selectedCategory: CategoryType | null;
  onSelect: (categoryId: string) => void;
  onCreateNew: (categoryName: string) => Promise<CategoryType>;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  selectedCategory,
  onSelect,
  onCreateNew,
}) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "new") {
      setIsCreatingNew(true);
    } else {
      onSelect(value);
    }
  };

  const handleCreateNewCategory = async () => {
    if (newCategoryName.trim()) {
      await onCreateNew(newCategoryName.trim());
      setNewCategoryName("");
      setIsCreatingNew(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="category">Category</Label>
      {!isCreatingNew ? (
        <select
          value={selectedCategory?.id.toString() || ""}
          onChange={handleSelectChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
          <option value="new">Create new category</option>
        </select>
      ) : (
        <div className="flex flex-col gap-2">
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New category name"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleCreateNewCategory}
              className="bg-blue-950 text-white hover:bg-blue-900"
            >
              Create
            </Button>
            <Button onClick={() => setIsCreatingNew(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
