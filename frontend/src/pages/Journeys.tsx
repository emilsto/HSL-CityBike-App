import { useState, useEffect } from "react";

import TripCard from "../components/TripCard";
import api from "../api/axios";

//interface
import Trip from "../interfaces/trip_interface";

import "../styles/buttons.css";

//pagination parameters
const PAGE_SIZE = 10;
const LIMIT = 20;
//
const JOURNEYS_URL = "http://localhost:5000/api/v1/trips";

const Journeys = () => {
  const [trips, setTrips] = useState<Trip[]>();
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchTrips = async () => {
      //query parameters
      const queries = {
        q: query,
        limit: LIMIT,
        page: PAGE_SIZE * page,
      };

      try {
        const response = await api.get(JOURNEYS_URL, { params: queries });
        const data = response.data;
        setTrips(data);
        setHasMore(true); //set hasMore to true, so that the next page can be loaded
        if (data.length < LIMIT) {
          setHasMore(false); //if response length is less than limit, then there is no more data
        }
      } catch (error) {
        setHasMore(false); //if error, then there is no more data
      }
    };
    fetchTrips();
  }, [page, hasMore, query]);

  return (
    <div className="w-screen h-screen">
      <h1 className="text-5xl p-8 text-white">HSL CityBike stations</h1>
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
          <thead className="text-4xl text-white border-b select-none">
            <tr className="">
              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => {
                  setFilter("departure");
                  setPage(0);
                }}
              >
                Departure
              </th>
              <th scope="col" className="px-6 py-3">
                Return
              </th>
              <th scope="col" className="px-6 py-3">
                Trip distance
              </th>
              <th scope="col" className="px-6 py-3">
                Trip duration
              </th>
            </tr>
          </thead>
          <tbody>
            {trips &&
              trips.map((trip: Trip) => <TripCard trip={trip} key={trip.id} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Journeys;
