//display content of a single station
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

//css
import "../styles/single_station.css";

//spinner
import Spinner from "../components/Spinner";

//interface
import Station from "../interfaces/station_interface";
import StationStatistics from "../interfaces/statistics_interface";

const SingleStation = () => {
  const [station, setStation] = useState<Station>({} as Station);
  const [stationStatistics, setStationStatistics] = useState<StationStatistics>({} as StationStatistics);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { id } = useParams();

  // fetch station data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const stationResponse = await fetch(`http://localhost:5000/api/v1/stations/${id}`);
        if(!stationResponse.ok && stationResponse.status === 404){
          setError("Station not found");
        }else{
            const station = await stationResponse.json();
            setStation(station);
        }
        const statisticsResponse = await fetch(`http://localhost:5000/api/v1/stations/${id}/statistics`);
        if(!statisticsResponse.ok && statisticsResponse.status === 404){
          setError("No trip data for this station");
          
        }else{
            const statisticsData = await statisticsResponse.json();
            setStationStatistics(statisticsData);
            //format data
        }
        setIsLoading(false);
    } catch (error) {
        setError("An error occured while fetching data");
        setIsLoading(false);
    }
      };
    fetchData();
  }, [id]);
  return (
    <div className="text-white">
      <h1 className="text-5xl p-8">{station.name}</h1>
      <p className="text-4xl p-16">{station.address + ","} {station.city}</p>
      <div className="flex flex-col items-center">
        {error && <div className="text-2xl p-8">{error}</div>}
        {isLoading && <Spinner />}
        {stationStatistics && isLoading === false && error === "" && (
          <table className="w-1/2 text-left text-2xl">
            <thead className="border-b text-2xl ">
              <tr>
                <th scope="col" className="px-6 py-3">Avg departing trip distance</th>
                <th scope="col" className="px-6 py-3">Avg returning trip distance</th>
                <th scope="col" className="px-6 py-3">Number of Departures</th>
                <th scope="col" className="px-6 py-3">Number of Returns</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4">{(stationStatistics.AvgDistanceDeparturesM/1000).toFixed(1)} km</td>
                <td className="px-6 py-4">{(stationStatistics.AvgDistanceReturnsM/1000).toFixed(1)} km</td>
                <td className="px-6 py-4">{stationStatistics.DeparturesCount} bikes</td>
                <td className="px-6 py-4">{stationStatistics.ReturnsCount} bikes</td>
              </tr>
            </tbody>
          </table>
        )}
              {station.latitude && station.longitude && (
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
    </div>
  );
};

export default SingleStation;
