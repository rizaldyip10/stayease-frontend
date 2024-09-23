import React, { useEffect } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CategoryDropdown from "@/app/dashboard/properties/[propertyId]/edit/_components/CategoryDropdown";
import ImageUpload from "@/app/dashboard/properties/create/_components/ImageUpload";
import MapComponent from "@/components/MapComponent";
import { usePropertyEdit } from "@/hooks/properties/usePropertyEdit";

const PropertyFormFields: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const {
    categories,
    selectedCategory,
    handleCategorySelect,
    handleCreateNewCategory,
    handleImageUpload,
    isLoading,
    error,
  } = usePropertyEdit(values.property.id);

  const editableFields = [
    { name: "name", label: "Name", component: Input },
    { name: "description", label: "Description", component: Textarea },
  ];

  const nonEditableFields = [
    { name: "address", label: "Address" },
    { name: "city", label: "City" },
    { name: "country", label: "Country" },
  ];

  console.log("values:", values);

  useEffect(() => {
    console.log("Parent component rendered");
    console.log("Categories:", categories);
    console.log("Selected Category:", selectedCategory);
    console.log("Is Loading:", isLoading);
    console.log("Error:", error);
  }, [categories, selectedCategory, isLoading, error]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {editableFields.map((field) => (
          <div key={field.name}>
            <Label htmlFor={`property.${field.name}`}>{field.label}</Label>
            <Field name={`property.${field.name}`} as={field.component} />
            <ErrorMessage
              name={`property.${field.name}`}
              component="div"
              className="text-red-500"
            />
          </div>
        ))}
        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={(categoryId) => {
            setFieldValue("property.categoryId", categoryId);
            handleCategorySelect(categoryId);
          }}
          onCreateNew={handleCreateNewCategory}
        />
      </div>

      <div>
        <Label>Property Image</Label>
        <ImageUpload
          name="property.imageUrl"
          onImageUpload={(file) =>
            handleImageUpload(file, "property.imageUrl", setFieldValue)
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Location (Non-editable)</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nonEditableFields.map((field) => (
            <div key={field.name}>
              <Label htmlFor={`property.${field.name}`}>{field.label}</Label>
              <Input
                name={`property.${field.name}`}
                value={values.property[field.name]}
                disabled
              />
            </div>
          ))}
        </div>
        <div style={{ height: "400px", width: "100%" }}>
          <MapComponent
            initialCenter={{
              lat: values.property.latitude,
              lng: values.property.longitude,
            }}
            onLocationChange={() => {}}
            isEditable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyFormFields;
