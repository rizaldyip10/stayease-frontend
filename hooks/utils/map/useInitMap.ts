import { useCallback, useRef } from "react";

interface InitMapConfig {
  initialCenter: google.maps.LatLngLiteral;
  isEditable: boolean;
  viewOnly: boolean;
  mapStyles?: google.maps.MapTypeStyle[];
}

export const useInitMap = ({
  initialCenter,
  isEditable,
  viewOnly,
  mapStyles,
}: InitMapConfig) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const initMap = useCallback(() => {
    if (mapRef.current) return;

    const mapElement = document.getElementById("map");
    if (!mapElement) {
      console.error("Map element not found");
      return;
    }
    mapRef.current = new window.google.maps.Map(
      mapElement,

      {
        center: initialCenter,
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: !viewOnly,
        fullscreenControl: !viewOnly,
        draggable: isEditable,
        clickableIcons: isEditable,
        mapId: apiKey,
        styles: mapStyles,
      },
    );
  }, [initialCenter, isEditable, viewOnly, apiKey, mapStyles]);

  return { mapRef, initMap, apiKey };
};
