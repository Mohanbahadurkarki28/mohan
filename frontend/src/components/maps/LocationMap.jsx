import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

import axios from "axios";
import { useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

// eslint-disable-next-line react/prop-types
const LocationMap = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const mapRef = useRef();

  const LocationMarker = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const address =
            response.data.address.city ||
            response.data.address.municipality ||
            "Unknown location";
          const full_address = response.data.display_name || "";

          onLocationSelect({
            coordinates: [lat, lng],
            address,
            full_address,
          });
          setMarkerPosition([lat, lng]);
        } catch (error) {
          console.error("Error fetching the address:", error);
          onLocationSelect({
            coordinates: [lat, lng],
            full_address: "Unable to retrieve address",
            address: "Unable to retrieve address",
          });
          setMarkerPosition([lat, lng]);
        }
      },
    });
    return null;
  };

  return (
    <div className="w-full">
      <MapContainer
        center={[27.7172, 85.324]}
        zoom={14}
        className="w-full h-96 z-0"
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">PPV</a> contributors'
        />
        <LocationMarker />
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>
              {markerPosition[0].toFixed(4)}, {markerPosition[1].toFixed(4)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LocationMap;
