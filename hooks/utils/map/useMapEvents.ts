import { useEffect } from "react";

interface MapEventsConfig {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  onBoundsChanged?: () => void;
  onZoomChanged?: () => void;
  onDragEnd?: () => void;
}

export const useMapEvents = ({
  mapRef,
  onBoundsChanged,
  onZoomChanged,
  onDragEnd,
}: MapEventsConfig) => {
  useEffect(() => {
    if (!mapRef.current) return;

    const listeners: google.maps.MapsEventListener[] = [];

    if (onBoundsChanged) {
      listeners.push(
        mapRef.current.addListener("bounds_changed", onBoundsChanged),
      );
    }

    if (onZoomChanged) {
      listeners.push(mapRef.current.addListener("zoom_changed", onZoomChanged));
    }

    if (onDragEnd) {
      listeners.push(mapRef.current.addListener("dragend", onDragEnd));
    }

    return () => {
      listeners.forEach((listener) =>
        google.maps.event.removeListener(listener),
      );
    };
  }, [mapRef, onBoundsChanged, onZoomChanged, onDragEnd]);
};
