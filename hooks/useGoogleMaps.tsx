import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

interface MapCenter {
  lat: number;
  lng: number;
}

export const useGoogleMaps = (
  initialCenter: MapCenter,
  onLocationChange: (lat: number, lng: number) => void,
) => {
  const [mapCenter, setMapCenter] = useState<MapCenter>(initialCenter);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const libraries: "places"[] = ["places"];

  const setUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(userLocation);
          if (mapRef.current) {
            mapRef.current.setCenter(userLocation);
            if (markerRef.current) {
              markerRef.current.setPosition(userLocation);
            }
          }
        },
        () => {
          console.error("Error fetching user location");
        },
      );
    }
  };

  useEffect(() => {
    setUserLocation();
  }, []);

  const initMap = useCallback(
    (mapElement: HTMLElement) => {
      if (window.google && mapElement) {
        const map = new window.google.maps.Map(mapElement, {
          center: mapCenter,
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
        });
        mapRef.current = map;

        const marker = new google.maps.Marker({
          map,
          position: mapCenter,
          draggable: true,
        });
        markerRef.current = marker;

        marker.addListener("dragend", () => {
          const position = marker.getPosition();
          if (position) {
            onLocationChange(position.lat(), position.lng());
            setMapCenter({ lat: position.lat(), lng: position.lng() });
          }
        });

        map.addListener("click", (e: google.maps.MapMouseEvent) => {
          const clickedPos = e.latLng;
          if (clickedPos) {
            marker.setPosition(clickedPos);
            onLocationChange(clickedPos.lat(), clickedPos.lng());
            setMapCenter({ lat: clickedPos.lat(), lng: clickedPos.lng() });
          }
        });

        const input = document.getElementById("pac-input") as HTMLInputElement;
        if (input) {
          const autocomplete = new google.maps.places.Autocomplete(input);
          autocomplete.bindTo("bounds", map);
          autocompleteRef.current = autocomplete;

          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place.geometry?.location) {
              const newPos = place.geometry.location;
              marker.setPosition(newPos);
              map.setCenter(newPos);
              onLocationChange(newPos.lat(), newPos.lng());
              setMapCenter({ lat: newPos.lat(), lng: newPos.lng() });
            }
          });
        }
      }
    },
    [mapCenter, onLocationChange],
  );

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(mapCenter);
      if (markerRef.current) {
        markerRef.current.setPosition(mapCenter);
      }
    }
  }, [mapCenter]);

  const render = useMemo(() => {
    return (status: Status): React.ReactElement => {
      switch (status) {
        case Status.LOADING:
          return <div>Loading...</div>;
        case Status.FAILURE:
          return <div>Error loading Google Maps</div>;
        case Status.SUCCESS:
          return (
            <div
              style={{ height: "400px", width: "100%", position: "relative" }}
            >
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
              <div
                ref={(el) => {
                  if (el) initMap(el);
                }}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          );
      }
    };
  }, [initMap]);

  return { Wrapper, apiKey, libraries, render, mapCenter };
};
