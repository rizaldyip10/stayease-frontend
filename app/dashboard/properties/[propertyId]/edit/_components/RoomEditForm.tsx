import React from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/app/dashboard/properties/create/_components/ImageUpload";
import DeleteDialog from "@/app/dashboard/properties/_components/DeleteDialog";

interface RoomEditFormProps {
  index: number;
  onRemove: () => void;
  propertyId: number;
}

const RoomEditForm: React.FC<RoomEditFormProps> = ({
  index,
  onRemove,
  propertyId,
}) => {
  const { values } = useFormikContext<any>();
  const room = values.rooms[index];

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "basePrice", label: "Base Price", type: "number" },
    { name: "capacity", label: "Capacity", type: "number" },
  ];

  const isExistingRoom = !!room.id;

  return (
    <div className="border p-4 rounded-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Room {index + 1}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name}>
            <Label htmlFor={`rooms.${index}.${field.name}`}>
              {field.label}
            </Label>
            <Field
              name={`rooms.${index}.${field.name}`}
              type={field.type}
              as={Input}
            />
            <ErrorMessage
              name={`rooms.${index}.${field.name}`}
              component="div"
              className="text-red-500"
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Label>Room Image</Label>
        <ImageUpload
          fieldName={`rooms.${index}.imageUrl`}
          uploadType="property"
        />
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        {isExistingRoom ? (
          <DeleteDialog
            propertyId={propertyId}
            roomId={room.id}
            onConfirm={onRemove}
            title="Delete Room"
            description="Are you sure you want to delete this room? This action cannot be undone."
          />
        ) : (
          <Button
            type="button"
            variant="destructive"
            onClick={onRemove}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoomEditForm;
