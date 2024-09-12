import React from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CategoryForm = () => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">New Category</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category.name">Name</Label>
          <Field name="category.name" as={Input} />
          <ErrorMessage
            name="category.name"
            component="div"
            className="text-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
