import { useCallback, useEffect, useRef } from "react";

interface CurrentLocationConfig {
  onLocationChange: (location: google.maps.LatLngLiteral) => void;
  isEditable: boolean;
  viewOnly: boolean;
}

export const useCurrentLocation = ({
  onLocationChange,
  isEditable,
  viewOnly,
}: CurrentLocationConfig) => {
  const initialLocationSet = useRef(false);

  const getCurrentLocation = useCallback(() => {
    // If the browser supports geolocation and the current location hasn't been set yet
    if (navigator.geolocation && !initialLocationSet.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          onLocationChange(location);
          initialLocationSet.current = true;
        },
        () => {
          console.error("Error: The Geolocation service failed.");
          initialLocationSet.current = true;
        },
      );
    } else if (!navigator.geolocation) {
      // If the browser doesn't support geolocation
      console.error("Error: Your browser doesn't support geolocation.");
      initialLocationSet.current = true;
    }
  }, [onLocationChange]);

  useEffect(() => {
    // If the map is editable and the current location hasn't been set yet, get the current location
    if ((viewOnly || isEditable) && !initialLocationSet.current) {
      getCurrentLocation();
    }
  }, [getCurrentLocation, viewOnly, isEditable]);

  return { getCurrentLocation };
};
