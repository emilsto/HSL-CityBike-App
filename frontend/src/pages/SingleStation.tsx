//display content of a single station
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

//interface
import Station from "../interfaces/station_interface";
import { stat } from "fs";

const SingleStation = () => {
  const [station, setStation] = useState<Station>({} as Station);
  const { id } = useParams();
  console.log(id);

  // fetch station data
  useEffect(() => {
    console.log("fetching station");
    const fetchStation = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/stations/${id}`
        );
        const data = await response.json();
        console.log(data);
        setStation(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStation();
  }, [id]);

  return (
    <div className="App-header">
      <h1>{station.name}</h1>
      {station.address && (
        <p>
          {station.address}, {station.city}{" "}
        </p>
      )}
      {station.latitude && (
        <MapContainer
          center={[station.longitude, station.latitude]}
          zoom={17}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[station.longitude, station.latitude]}>
            <Popup>
              {station.address}, {station.city} <br /> {station.capacity} bikes
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default SingleStation;
