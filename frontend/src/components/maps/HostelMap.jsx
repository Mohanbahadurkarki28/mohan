/* eslint-disable react/prop-types */

import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import hostelImg from "../../assets/icons/hostel.png";
import { useCoordinates } from "../../hooks/use-coordinates";

let hostelIcon = L.icon({
  iconUrl: hostelImg,
  iconRetinaUrl: hostelImg,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [55, 55],
});

const HostelMap = ({ hostel }) => {
  const { coordinates } = useCoordinates();

  const hostelCoordinates = JSON.parse(hostel.location).coordinates;

  console.log(hostelCoordinates);

  const showRouting = (map) => {
    if (coordinates && hostelCoordinates) {
      L.Routing.control({
        waypoints: [
          L.latLng(coordinates[0], coordinates[1]),
          L.latLng(hostelCoordinates[0], hostelCoordinates[1]),
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
    <div className="w-full h-full my-10">
      <MapContainer
        center={hostel.coordinates}
        zoom={12}
        className="w-full h-96"
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

        <Marker icon={hostelIcon} position={hostelCoordinates}>
          <Popup>{hostel.name}</Popup>
        </Marker>

        <RenderRouting />
      </MapContainer>
    </div>
  );
};

export default HostelMap;
