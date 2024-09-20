import React, { useEffect, useRef, useCallback } from "react";

interface MapRenderProps {
  center: google.maps.LatLngLiteral;
  onLocationChange: (location: google.maps.LatLngLiteral) => void;
  isEditable: boolean;
  viewOnly: boolean;
  getLocationLink: (lat: number, lng: number) => string;
  initSearchBox: (map: google.maps.Map) => void;
}

export const MapRender: React.FC<MapRenderProps> = ({
  center,
  onLocationChange,
  isEditable,
  viewOnly,
  getLocationLink,
  initSearchBox,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const searchBoxInitialized = useRef(false);

  const initMap = useCallback(() => {
    if (ref.current && !mapRef.current) {
      mapRef.current = new window.google.maps.Map(ref.current, {
        center,
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: !viewOnly,
        fullscreenControl: !viewOnly,
        draggable: isEditable,
        clickableIcons: isEditable,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
      });

      if (!viewOnly && isEditable && !searchBoxInitialized.current) {
        initSearchBox(mapRef.current);
        searchBoxInitialized.current = true;
      }
    }
  }, [center, isEditable, viewOnly, initSearchBox]);

  const updateMarkerAndMap = useCallback(
    (newPosition: google.maps.LatLngLiteral) => {
      if (mapRef.current && markerRef.current) {
        markerRef.current.setPosition(newPosition);
        mapRef.current.panTo(newPosition);
        onLocationChange(newPosition);
      }
    },
    [onLocationChange],
  );

  useEffect(() => {
    initMap();
  }, [initMap]);

  useEffect(() => {
    if (mapRef.current && !markerRef.current && !viewOnly) {
      markerRef.current = new google.maps.Marker({
        map: mapRef.current,
        position: center,
        draggable: isEditable,
      });

      if (isEditable) {
        markerRef.current.addListener("dragend", () => {
          const position = markerRef.current?.getPosition()?.toJSON();
          if (position) {
            updateMarkerAndMap(position);
          }
        });

        mapRef.current.addListener("click", (e: google.maps.MapMouseEvent) => {
          const clickedPos = e.latLng?.toJSON();
          if (clickedPos) {
            updateMarkerAndMap(clickedPos);
          }
        });
      }
    }
  }, [center, isEditable, viewOnly, updateMarkerAndMap]);

  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      mapRef.current.setCenter(center);
      markerRef.current.setPosition(center);
    }
  }, [center]);

  return (
    <div style={{ height: "400px", width: "100%", position: "relative" }}>
      {!viewOnly && isEditable && (
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
      <div ref={ref} style={{ height: "100%", width: "100%" }} />
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
