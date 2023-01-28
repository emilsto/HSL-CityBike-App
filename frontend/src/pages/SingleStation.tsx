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
  const [selectedMonths, setSelectedMonths] = useState<string[]>([
    "2021-05",
    "2021-06",
    "2021-07",
  ]); //array of selected months
  const { id } = useParams();

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (selectedMonths.includes(value)) {
      setSelectedMonths(selectedMonths.filter((month) => month !== value));
    } else {
      setSelectedMonths([...selectedMonths, value]);
    }
  };

  // fetch station data
  useEffect(() => {
    let startTime =
      selectedMonths.length > 0
        ? selectedMonths.sort()[0] + "-01"
        : "2021-05-01";
    let endTime =
      selectedMonths.length > 0
        ? selectedMonths.sort()[selectedMonths.length - 1] + "-31"
        : "2021-07-31";
    if (endTime === "2021-06-31") {
      endTime = "2021-06-30";
    }
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
  }, [id, selectedMonths]);
  return (
    <div className="text-white">
      <h1 className="text-5xl p-4">{station.name}</h1> {stationError && <h1 className="text-5xl p-4">{stationError}</h1>}
      {station.address && <p className="text-4xl pb-8">
        {station.address + ","} {station.city}
      </p>}
      <div className="flex flex-col items-center">
        <div className="text-3xl">
          <input
            type="checkbox"
            id="may"
            name="month"
            value="2021-05"
            className="form-checkbox h-8 w-8"
            checked={selectedMonths.includes("2021-05")}
            onChange={handleMonthChange}
          />
          <label htmlFor="may" className="mx-6 text-3xl">
            May
          </label>
          <input
            type="checkbox"
            id="june"
            name="month"
            value="2021-06"
            className="form-checkbox h-8 w-8"
            checked={selectedMonths.includes("2021-06")}
            onChange={handleMonthChange}
          />
          <label htmlFor="june" className="mx-6 text-3xl">
            June
          </label>
          <input
            type="checkbox"
            id="july"
            name="month"
            value="2021-07"
            className="form-checkbox h-8 w-8"
            checked={selectedMonths.includes("2021-07")}
            onChange={handleMonthChange}
          />
          <label htmlFor="july" className="mx-6 text-3xl">
            July
          </label>
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
