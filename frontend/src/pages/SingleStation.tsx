//display content of a single station
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../api/axios";
import { AxiosError } from "axios";
//css
import "../styles/single_station.css";

//spinner
import Spinner from "../components/Spinner";

//interface
import Station from "../interfaces/station_interface";
import StationStatistics from "../interfaces/statistics_interface";

const STATION_PATH = "/api/v1/stations";

const SingleStation = () => {
  const [station, setStation] = useState<Station>({} as Station);
  const [stationStatistics, setStationStatistics] = useState<StationStatistics>(
    {} as StationStatistics
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stationError, setStationError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("2021-05-01");
  const [endTime, setEndTime] = useState<string>("2021-07-31");

  const { id } = useParams();

  // fetch station data
  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        try {
        const stationResponse = await api.get(`${STATION_PATH}/${id}`);
        const station = await stationResponse.data;
        setStation(station);
        } catch (err) {
          const error = err as AxiosError;
          if (error.response?.status === 404) {
            setStationError("Station not found");
          } else {
            setStationError("An error occured while fetching station data");
          }

        }
        try {
        const statisticsResponse = await api.get(
          `${STATION_PATH}/${id}/statistics?startTime=${startTime}&endTime=${endTime}`
        );
        const statistics = await statisticsResponse.data;
        setStationStatistics(statistics);
        } catch (err) {
          const error = err as AxiosError;
          if (error.response?.status === 404) {
            setError("No data available for selected months");
          } else {
            setError("An error occured while fetching station data");
          }
        }
        setIsLoading(false);
    };
    fetchData();
  }, [id, startTime, endTime]);
  return (
    <div className="text-white">
      <h1 className="text-5xl p-4">{station.name}</h1> {stationError && <h1 className="text-5xl p-4">{stationError}</h1>}
      {station.address && <p className="text-4xl pb-8">
        {station.address + ","} {station.city}
      </p>}
      <div className="flex flex-col items-center">
        <div className="w-1/2 flex-row">
        <label htmlFor="startMonth" className="text-white text-2xl p-4">From</label>
  <select
    name="startMonth"
    id="startMonth"
    className="bg-transparent text-white text-2xl rounded-lg focus:outline-none appearance-none "
    onChange={(e) => setStartTime(e.target.value)}
    defaultValue="2021-05-01"
  >
    <option value="2021-05-01" >May 2021</option>
    <option value="2021-06-01" disabled={endTime === "2021-05-31"}>June 2021</option>
    <option value="2021-07-01" disabled={endTime === "2021-05-31" || endTime === "2021-06-30"}>July 2021</option>
  </select>
<label htmlFor="endMonth" className="text-white text-2xl p-4">to</label>
  <select
    name="endMonth"
    id="endMonth"
    className="bg-transparent text-white text-2xl rounded-lg focus:outline-none appearance-none"
    onChange={(e) => setEndTime(e.target.value)}
    defaultValue="2021-07-31"
  >
    <option value="2021-05-31" disabled={startTime > "2021-05-31"}>May 2021</option>
    <option value="2021-06-30" disabled={startTime > "2021-06-30"}>June 2021</option>
    <option value="2021-07-31">July 2021</option>
  </select>
        </div>

        {error && <div className="text-2xl p-8">{error}</div>}
        {isLoading && <Spinner />}
        {stationStatistics && isLoading === false && error === "" && (
          <table className="w-1/2 text-2xl">
            <thead className="border-b text-2xl ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Avg departing trip distance
                </th>
                <th scope="col" className="px-6 py-3">
                  Avg returning trip distance
                </th>
                <th scope="col" className="px-6 py-3">
                  Number of Departures
                </th>
                <th scope="col" className="px-6 py-3">
                  Number of Returns
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4">
                  {(stationStatistics.AvgDistanceDeparturesM / 1000).toFixed(1)}{" "}
                  km
                </td>
                <td className="px-6 py-4">
                  {(stationStatistics.AvgDistanceReturnsM / 1000).toFixed(1)} km
                </td>
                <td className="px-6 py-4">
                  {stationStatistics.DeparturesCount}
                </td>
                <td className="px-6 py-4">{stationStatistics.ReturnsCount}</td>
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
                {station.address}, {station.city} <br /> {station.capacity}{" "}
                bikes
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default SingleStation;
