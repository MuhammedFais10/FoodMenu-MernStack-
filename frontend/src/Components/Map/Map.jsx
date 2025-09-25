import React, { useEffect, useState } from "react";
import classes from "./map.module.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { toast } from "react-toastify";
import * as L from "leaflet";

export default function Map({ readonly, location, onChange }) {
  const defaultPosition = [20, 78];

  const [position, setPosition] = useState(location || null);
  return (
    <div className={classes.container}>
      <MapContainer
        className={classes.map}
        center={position || defaultPosition}
        zoom={13}
        dragging={!readonly}
        touchZoom={!readonly}
        doubleClickZoom={!readonly}
        scrollWheelZoom={!readonly}
        boxZoom={!readonly}
        keyboard={!readonly}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker
          readonly={readonly}
          position={position}
          setPosition={setPosition}
          onChange={onChange}
        />
      </MapContainer>
    </div>
  );
}




function LocationMarker({ readonly, position, setPosition, onChange }) {
  const map = useMapEvents({
    click(e) {
      if (!readonly) {
        setPosition(e.latlng);
        onChange && onChange(e.latlng);
      }
    },
   locationfound(e) {
  console.log("📍 Location found:", e.latlng);
  setPosition(e.latlng);
  map.flyTo(e.latlng, 13);
  onChange && onChange(e.latlng);
},
locationerror(e) {
  console.error("❌ Location error:", e);
  toast.error("Location access denied or unavailable");
},

  });

  useEffect(() => {
    if (!readonly ) {
     map.locate({
  setView: true,
  maxZoom: 16,
  enableHighAccuracy: true,
  timeout: 10000,
});
    }
  }, [readonly, map]);

  const markerIcon = new L.Icon({
    iconUrl: "/marker-icon-2x.png",
    iconSize: [23, 40],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    shadowUrl: "/marker-shadow.png",
    shadowSize: [40, 40],
  });

  return (
    <>
      {!readonly && (
        <button
          type="button"
          className={classes.find_location}
          onClick={() => map.locate({ setView: true, enableHighAccuracy: true })}
        >
          Find My Location
        </button>
      )}
      {position && (
        <Marker
        position={Array.isArray(position) ? position : [position.lat, position.lng]}
          draggable={!readonly}
          eventHandlers={{
            dragend: (e) => {
              const latlng = e.target.getLatLng();
              setPosition(latlng);
              onChange && onChange(latlng);
            },
          }}
          icon={markerIcon}
        >
          <Popup>Shipping Location</Popup>
        </Marker>
      )}
    </>
  );
}



