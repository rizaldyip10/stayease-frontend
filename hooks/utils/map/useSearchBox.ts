import { useCallback, useRef, useState } from "react";

interface SearchBoxConfig {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  onLocationChange: (location: google.maps.LatLngLiteral) => void;
}

export const useSearchBox = ({ mapRef, onLocationChange }: SearchBoxConfig) => {
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const searchBoxInitialized = useRef(false);

  const initSearchBox = useCallback(() => {
    if (!mapRef.current || searchBoxInitialized.current) return;

    const input = document.getElementById("pac-input") as HTMLInputElement;
    if (input && !searchBox && mapRef.current) {
      const newSearchBox = new google.maps.places.SearchBox(input);
      mapRef.current.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
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
            onLocationChange(newLocation);
            mapRef.current?.setCenter(newLocation);
          }
        }
      });

      searchBoxInitialized.current = true;
    }
  }, [mapRef, onLocationChange, searchBox]);

  return { initSearchBox };
};
