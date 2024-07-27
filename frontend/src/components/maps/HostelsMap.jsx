/* eslint-disable react/prop-types */

import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import hostel from "../../assets/icons/hostel.png";
import { useCoordinates } from "../../hooks/use-coordinates";

let hostelIcon = L.icon({
  iconUrl: hostel,
  iconRetinaUrl: hostel,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
});

const HostelsMap = ({ hostels, selectedHostel, setSelectedHostel }) => {
  const mapRef = useRef();
  const routingControlRef = useRef(null);

  const { coordinates } = useCoordinates();

  const showRouting = (map) => {
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    if (coordinates && selectedHostel) {
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(coordinates[0], coordinates[1]),
          L.latLng(
            JSON.parse(selectedHostel.location).coordinates[0],
            JSON.parse(selectedHostel.location).coordinates[1]
          ),
        ],
        routeWhileDragging: true,
        show: true,
        createMarker: function () {
          return null;
        },
      }).addTo(map);
    }
  };

  const RenderRouting = () => {
    const map = useMap();
    showRouting(map);
    return null;
  };

  return (
    <div className="w-full">
      <MapContainer
        center={coordinates || [27.7172, 85.324]}
        zoom={12}
        className="w-full h-96 z-0"
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">PPV</a> contributors'
        />

        {coordinates && (
          <Marker position={coordinates}>
            <Popup>HERE</Popup>
          </Marker>
        )}

        {hostels.map((hostel, index) => (
          <Marker
            key={index}
            icon={hostelIcon}
            position={JSON.parse(hostel.location).coordinates}
            eventHandlers={{
              click: () => {
                setSelectedHostel(hostel);
              },
            }}
          >
            <Popup>{hostel.name}</Popup>
          </Marker>
        ))}

        <RenderRouting />
      </MapContainer>
    </div>
  );
};

export default HostelsMap;
