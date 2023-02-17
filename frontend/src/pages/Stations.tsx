import { useState, useEffect } from "react";
import api from "../api/axios";
import StationCard from "../components/StationCard";

import "../styles/buttons.css";

//interface
import Station from "../interfaces/station_interface";

const STAION_URL = "/api/v1/stations_page";
const PAGE_SIZE = 20;
const LIMIT = 20;

const Stations = () => {
  const [stations, setStations] = useState<Station[]>();
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchStations = async () => {
      console.log("fetching stations");
      //query parameters
      const queries = {
        q: query,
        limit: LIMIT,
        page: PAGE_SIZE * page,
      };
      try {
        const response = await api.get(STAION_URL, { params: queries });
        const data = response.data;
        setStations(data);
        setHasMore(true);

        console.log(data.length);
        if (data.length < LIMIT) {
          setHasMore(false); //if response length is less than limit, then there is no more data
        }
      } catch (error) {
        console.log(error);
        setHasMore(false); //if error, then there is no more data
      }
    };
    fetchStations();
  }, [page, hasMore, query]);

  return (
    <div className="w-screen h-screen">
      <h1 className="text-5xl p-8 text-white">HSL CityBike stations</h1>
      <p className="text-white text-xl">
        Click on a station to see more information about it.
      </p>
      <div className="flex flex-row justify-center">
        {page === 0 ? (
          <div className="nav-button nav-button-disabled" id="left-btn"></div>
        ) : (
          <div
            className="nav-button"
            id="left-btn"
            onClick={() => setPage(page - 1)}
          ></div>
        )}
        <input
          className="w-1/2 text-xl p-4  focus:outline-none border-2 border-gray-300 m-2 rounded-lg"
          type="text"
          placeholder="🔍 Search by station name, address or city"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
        />
        {hasMore ? (
          <div
            className="nav-button "
            id="right-btn"
            onClick={() => hasMore && setPage(page + 1)}
          ></div>
        ) : (
          <div className="nav-button nav-button-disabled" id="right-btn"></div>
        )}
      </div>
      <div className="mx-2">
        <table className="w-full h-full text-left table-fixed">
          <thead className="text-4xl text-white border-b">
            <tr className="">
              <th scope="col" className="px-6 py-3">
                Station
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
            </tr>
          </thead>
          <tbody>
            {stations &&
              stations.map((station: Station) => (
                <StationCard station={station} key={station.objId} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stations;
