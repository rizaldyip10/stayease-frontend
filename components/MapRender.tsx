import React, { useEffect, useRef, useCallback } from "react";

interface MapRenderProps {
  center: google.maps.LatLngLiteral;
  onLocationChange: (location: google.maps.LatLngLiteral) => void;
  isEditable: boolean;
  viewOnly: boolean;
  getLocationLink: (lat: number, lng: number) => string;
  initMap: () => void;
  initMarker: () => void;
  initSearchBox: () => void;
  getCurrentLocation: () => void;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  markerRef: React.MutableRefObject<google.maps.marker.AdvancedMarkerElement | null>;
  propertyMarkersRef: React.MutableRefObject<
    google.maps.marker.AdvancedMarkerElement[]
  >;
}

export const MapRender: React.FC<MapRenderProps> = ({
  center,
  onLocationChange,
  isEditable,
  viewOnly,
  getLocationLink,
  initMap,
  initMarker,
  initSearchBox,
  getCurrentLocation,
  mapRef,
  markerRef,
  propertyMarkersRef,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const updateMarkerAndMap = useCallback(
    (newPosition: google.maps.LatLngLiteral) => {
      if (mapRef.current && markerRef.current) {
        markerRef.current.position = new google.maps.LatLng(newPosition);
        mapRef.current.panTo(newPosition);
        onLocationChange(newPosition);
      }
    },
    [onLocationChange],
  );

  useEffect(() => {
    if (mapContainerRef.current) {
      initMap();
      initMarker();
      if (isEditable) {
        initSearchBox();
        getCurrentLocation();
      }
    }
  }, [
    initMap,
    initMarker,
    initSearchBox,
    getCurrentLocation,
    isEditable,
    viewOnly,
  ]);

  // useEffect(() => {
  //   if (mapRef.current && markerRef.current) {
  //     mapRef.current.setCenter(center);
  //     markerRef.current.setPosition(center);
  //   }
  // }, [center, mapRef, markerRef]);

  useEffect(() => {
    updateMarkerAndMap(center);
  }, []);

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      {isEditable && (
        <input
          id="pac-input"
          type="text"
          placeholder="Search for a location"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1,
            width: "240px",
            height: "32px",
            padding: "0 12px",
            borderRadius: "3px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
            fontSize: "14px",
            outline: "none",
            textOverflow: "ellipses",
          }}
        />
      )}
      <div
        id="map"
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      {!viewOnly && (
        <div style={{ marginTop: "10px" }}>
          <a
            href={getLocationLink(center.lat, center.lng)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
};
