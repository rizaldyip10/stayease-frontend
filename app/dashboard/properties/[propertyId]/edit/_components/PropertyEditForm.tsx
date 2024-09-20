import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { Button } from "@/components/ui/button";
import { PropertyAndRoomType, RoomType } from "@/constants/Property";
import PropertyFormFields from "@/app/dashboard/properties/[propertyId]/edit/_components/PropertyEditFields";
import RoomEditForm from "@/app/dashboard/properties/[propertyId]/edit/_components/RoomEditForm";

interface PropertyEditFormProps {
  property: PropertyAndRoomType | null;
  rooms: RoomType[];
  onSubmit: (values: any) => Promise<void>;
}

const PropertyEditForm: React.FC<PropertyEditFormProps> = ({
  property,
  rooms,
  onSubmit,
}) => {
  const initialValues = {
    property: {
      ...property,
      categoryId: property?.category,
    },
    rooms: rooms,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, isSubmitting }) => (
        <Form className="space-y-8">
          <PropertyFormFields />
          <FieldArray name="rooms">
            {({ push, remove }) => (
              <div>
                {values.rooms.map((room, index) => (
                  <RoomEditForm
                    propertyId={property?.id || 0}
                    key={room.id}
                    index={index}
                    onRemove={() => remove(index)}
                  />
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    push({
                      name: "",
                      description: "",
                      basePrice: 0,
                      capacity: 0,
                      imageUrl: "",
                    })
                  }
                  className="mt-4 bg-blue-950 text-white hover:bg-blue-900"
                >
                  Add Room
                </Button>
              </div>
            )}
          </FieldArray>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-950 text-white hover:bg-blue-900"
          >
            {isSubmitting ? "Updating..." : "Update Property"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PropertyEditForm;
