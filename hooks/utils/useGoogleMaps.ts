import { useState, useCallback, useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

interface MapCenter {
  lat: number;
  lng: number;
}

interface MapConfig {
  initialCenter: MapCenter;
  onLocationChange: (lat: number, lng: number) => void;
  isEditable: boolean;
  viewOnly: boolean;
}

export const useGoogleMaps = ({
  initialCenter,
  onLocationChange,
  isEditable,
  viewOnly,
}: MapConfig) => {
  const [mapCenter, setMapCenter] = useState<MapCenter>(initialCenter);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const initialLocationSet = useRef(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const libraries: ("places" | "marker")[] = ["places", "marker"];

  const handleLocationChange = useCallback(
    (newLocation: MapCenter) => {
      setMapCenter(newLocation);
      onLocationChange(newLocation.lat, newLocation.lng);
    },
    [onLocationChange],
  );

  const getLocationLink = useCallback((lat: number, lng: number): string => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }, []);

  const initSearchBox = useCallback(
    (map: google.maps.Map) => {
      const input = document.getElementById("pac-input") as HTMLInputElement;
      if (input && !searchBox) {
        const newSearchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        setSearchBox(newSearchBox);

        newSearchBox.addListener("places_changed", () => {
          const places = newSearchBox.getPlaces();
          if (places && places.length > 0) {
            const place = places[0];
            if (place.geometry && place.geometry.location) {
              const newLocation = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              };
              handleLocationChange(newLocation);
              map.setCenter(newLocation);

              // Update marker position
              if (markerRef.current) {
                markerRef.current.setPosition(newLocation);
              }
            }
          }
        });
      }
    },
    [handleLocationChange, searchBox],
  );

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation && !initialLocationSet.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          handleLocationChange(pos);
          initialLocationSet.current = true;
        },
        () => {
          console.error("Error: The Geolocation service failed.");
          initialLocationSet.current = true;
        },
      );
    } else if (!navigator.geolocation) {
      console.error("Error: Your browser doesn't support geolocation.");
      initialLocationSet.current = true;
    }
  }, [handleLocationChange]);

  useEffect(() => {
    if (!viewOnly && isEditable && !initialLocationSet.current) {
      getCurrentLocation();
    }
  }, [getCurrentLocation, viewOnly, isEditable]);

  return {
    Wrapper,
    apiKey,
    libraries,
    mapCenter,
    handleLocationChange,
    getLocationLink,
    isEditable,
    viewOnly,
    initSearchBox,
    searchBox,
    mapRef,
    markerRef,
  };
};
