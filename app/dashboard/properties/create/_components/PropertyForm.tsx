"use client";
import React, { useCallback, useState } from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import ImageUpload from "@/app/dashboard/properties/create/_components/ImageUpload";
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import CategoryDropdown from "@/app/dashboard/properties/create/_components/CategoryDropdown";
import propertyService from "@/services/propertyService";
import { CategoryType } from "@/constants/Property";
import MapComponent from "@/app/dashboard/properties/create/_components/MapComponent";

interface PropertyFormValues {
  property: {
    name: string;
    description: string;
    imageUrl: string;
    address: string;
    city: string;
    country: string;
    longitude: number;
    latitude: number;
    categoryId: number;
  };
}

interface PropertyFormProps {
  onImageUpload: (file: File) => Promise<string>;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  categories: CategoryType[];
}

const libraries: "places"[] = ["places"];

const PropertyForm: React.FC<PropertyFormProps> = ({
  onImageUpload,
  categories,
  setCategories,
}) => {
  const { values, setFieldValue } = useFormikContext<PropertyFormValues>();
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [searchBox, setSearchBox] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const propertyFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "country", label: "Country", type: "text" },
    // { name: "categoryId", label: "Category", type: "text" },
  ];

  const handleLocationChange = (lat: number, lng: number) => {
    setFieldValue("property.latitude", lat);
    setFieldValue("property.longitude", lng);
    console.log("Location changed to:", lat, lng);
  };

  const handleCategorySelect = (categoryId: string | number) => {
    setSelectedCategory(Number(categoryId));
  };

  const handleCreateNewCategory = async (categoryName: string) => {
    try {
      const newCategory = await propertyService.createCategory({
        name: categoryName,
      });
      // TODO : Update form state or perform any other necessary actions
      setSelectedCategory(newCategory.id);
    } catch (error) {
      console.error("Failed to create new category:", error);
      // TODO : Handle error
    }
  };

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setFieldValue("property.latitude", lat);
        setFieldValue("property.longitude", lng);
        setMapCenter({ lat, lng });
        console.log("Map clicked at:", lat, lng);
        console.log("field value:", values);
      }
    },
    [setFieldValue],
  );

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setSearchBox(autocomplete);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const onPlaceChanged = () => {
    if (searchBox !== null) {
      const place = searchBox.getPlace();
      if (place.geometry && place.geometry.location) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setLocation(newLocation);
      } else {
        console.log("Place geometry or location is not available.");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Property Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {propertyFields.map((field) => (
          <div key={field.name}>
            <Label htmlFor={`property.${field.name}`}>{field.label}</Label>
            <Field
              name={`property.${field.name}`}
              as={Input}
              type={field.type}
            />
            <ErrorMessage
              name={`property.${field.name}`}
              component="div"
              className="text-red-500"
            />
          </div>
        ))}
        <CategoryDropdown
          onSelect={handleCategorySelect}
          onCreateNew={handleCreateNewCategory}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
      <div className="mt-4">
        <Label>Location</Label>
        <div style={{ height: "400px", width: "100%" }}>
          {/*<LoadScript*/}
          {/*  googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}*/}
          {/*  libraries={libraries}*/}
          {/*>*/}
          {/*  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>*/}
          {/*    <input*/}
          {/*      type="text"*/}
          {/*      placeholder="Search for a location"*/}
          {/*      style={{*/}
          {/*        boxSizing: `border-box`,*/}
          {/*        border: `1px solid transparent`,*/}
          {/*        width: `240px`,*/}
          {/*        height: `32px`,*/}
          {/*        padding: `0 12px`,*/}
          {/*        borderRadius: `3px`,*/}
          {/*        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,*/}
          {/*        fontSize: `14px`,*/}
          {/*        outline: `none`,*/}
          {/*        textOverflow: `ellipses`,*/}
          {/*        marginBottom: "10px",*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </Autocomplete>*/}
          {/*  <div style={{ height: "400px", width: "100%" }}>*/}
          {/*    <GoogleMap*/}
          {/*      mapContainerStyle={{ height: "100%", width: "100%" }}*/}
          {/*      center={location}*/}
          {/*      zoom={10}*/}
          {/*      onClick={handleMapClick}*/}
          {/*    >*/}
          {/*      <Marker position={location} />*/}
          {/*    </GoogleMap>*/}
          {/*  </div>*/}
          {/*</LoadScript>*/}
          <MapComponent
            initialCenter={{
              lat: values.property.latitude || 0,
              lng: values.property.longitude || 0,
            }}
            onLocationChange={handleLocationChange}
          />
        </div>
        <ErrorMessage
          name="property.latitude"
          component="div"
          className="text-red-500"
        />
        <ErrorMessage
          name="property.longitude"
          component="div"
          className="text-red-500"
        />
      </div>
      <div className="mt-4">
        <Label>Property Image</Label>
        <ImageUpload name="property.imageUrl" onImageUpload={onImageUpload} />
      </div>
    </div>
  );
};

export default PropertyForm;
