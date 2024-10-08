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

  const handleMarkerDragEnd = () => {
    const position = markerRef.current?.position;
    if (position) {
      if (
        position &&
        typeof position.lat === "number" &&
        typeof position.lng === "number"
      ) {
        updateMarkerAndMap({ lat: position.lat, lng: position.lng });
      }
    } else {
      console.error("Marker position is null or undefined");
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const clickedPosition = e.latLng?.toJSON();
    if (clickedPosition) {
      onLocationChange(clickedPosition);
    }
  };

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
      markerRef.current.addListener("dragend", handleMarkerDragEnd);

      mapRef.current.addListener("click", handleMapClick);
    }
  }, [
    mapRef,
    initialCenter,
    isEditable,
    onLocationChange,
    handleMarkerDragEnd,
    handleMapClick,
    viewOnly,
  ]);

  return { markerRef, initMarker, updateMarkerAndMap };
};
