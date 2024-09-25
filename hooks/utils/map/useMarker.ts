import { useCallback, useRef } from "react";

interface MarkerConfig {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  initialCenter: google.maps.LatLngLiteral;
  isEditable: boolean;
  onLocationChange: (location: google.maps.LatLngLiteral) => void;
}

export const useMarker = ({
  mapRef,
  initialCenter,
  isEditable,
  onLocationChange,
}: MarkerConfig) => {
  const markerRef = useRef<google.maps.Marker | null>(null);

  const updateMarkerAndMap = useCallback(
    (newPosition: google.maps.LatLngLiteral) => {
      if (mapRef.current && markerRef.current) {
        markerRef.current.setPosition(newPosition);
        mapRef.current.panTo(newPosition);
        onLocationChange(newPosition);
      }
    },
    [mapRef, onLocationChange],
  );

  const initMarker = useCallback(() => {
    if (!mapRef.current || markerRef.current) return;

    markerRef.current = new google.maps.Marker({
      map: mapRef.current,
      position: initialCenter,
      draggable: isEditable,
    });

    if (isEditable) {
      markerRef.current.addListener("dragend", () => {
        const newPosition = markerRef.current?.getPosition()?.toJSON();
        if (newPosition) {
          onLocationChange(newPosition);
        }
      });

      mapRef.current.addListener("click", (e: google.maps.MapMouseEvent) => {
        const clickedPosition = e.latLng?.toJSON();
        if (clickedPosition) {
          onLocationChange(clickedPosition);
        }
      });
    }
  }, [mapRef, initialCenter, isEditable, onLocationChange]);

  return { markerRef, initMarker, updateMarkerAndMap };
};
