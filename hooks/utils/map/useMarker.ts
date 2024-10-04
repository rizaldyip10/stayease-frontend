import { useCallback, useRef } from "react";

interface MarkerConfig {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  initialCenter: google.maps.LatLngLiteral;
  isEditable: boolean;
  viewOnly: boolean;
  onLocationChange: (location: google.maps.LatLngLiteral) => void;
}

export const useMarker = ({
  mapRef,
  initialCenter,
  isEditable,
  viewOnly,
  onLocationChange,
}: MarkerConfig) => {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null,
  );

  const updateMarkerAndMap = useCallback(
    (newPosition: google.maps.LatLngLiteral) => {
      if (mapRef.current && markerRef.current) {
        markerRef.current.position = new google.maps.LatLng(newPosition);
        mapRef.current.panTo(newPosition);
        onLocationChange(newPosition);
      }
    },
    [mapRef, onLocationChange],
  );

  const initMarker = useCallback(() => {
    if (!mapRef.current || markerRef.current) return;

    const iconElement = document.createElement("img");
    iconElement.src = "http://maps.google.com/mapfiles/ms/icons/pink-dot.png";
    iconElement.alt = "You are here";

    markerRef.current = new google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: initialCenter,
      gmpDraggable: isEditable && !viewOnly,
      content: isEditable && viewOnly ? iconElement : undefined,
      title: isEditable && viewOnly ? "You are here" : undefined,
    });

    if (isEditable) {
      markerRef.current.addListener("dragend", () => {
        const position = markerRef.current?.position as google.maps.LatLng;
        if (position instanceof google.maps.LatLng) {
          const newPosition = {
            lat: position.lat(),
            lng: position.lng(),
          };
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
