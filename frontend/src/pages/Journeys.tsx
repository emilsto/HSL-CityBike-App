import "../styles/journeys.css";
import { useState, useEffect } from "react";

import TripCard from "../components/TripCard";
import api from "../api/axios";

//interface
import Trip from "../interfaces/trip_interface";

//pagination parameters
const PAGE_SIZE = 10;
const LIMIT = 30;
//
const JOURNEYS_URL = "http://localhost:5000/api/v1/trips";

const Journeys = () => {
  const [trips, setTrips] = useState<Trip[]>();
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
  const fetchTrips = async () => {
    console.log("fetching trips");
    //query parameters
    const queries = {
      q : query,
      limit: LIMIT,
      page: PAGE_SIZE * page,
    };

    try {
    const response = await api.get(JOURNEYS_URL, { params: queries });
    const data = response.data;
    setTrips(data);
    setHasMore(true); //set hasMore to true, so that the next page can be loaded
    if(data.length < LIMIT){
      setHasMore(false);   //if response length is less than limit, then there is no more data
    }
    } catch (error) {
    setHasMore(false); //if error, then there is no more data
    }
  };
  fetchTrips();
  }, [page, hasMore, query]);


  return (
    <div className="Journey-page">
      <h1>HSL CityBike journeys</h1>
      <div className="search-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Filter by departure or return station"
          value={query}
          onChange={(e) => {setQuery(e.target.value); setPage(0); setHasMore(true)}}
        />
      </div>
      <div className="table-view">
      {page === 0 ? <div className="nav-button nav-button-disabled" id="left-btn"></div> : <div className="nav-button" id="left-btn" onClick={() => setPage(page-1)}></div>}
      <div className ="table-wrapper" >
        <table className="station-table">
          <thead className="station-head">
            <tr className="">
              <th>Departure</th>
              <th>Return</th>
              <th>Trip distance (km)</th>
              <th>Trip duration (minutes)</th>
              </tr>
          </thead>
          <tbody>
        {trips &&
          trips.map((trip: Trip) => <TripCard trip={trip} key={trip.id} />)}
          </tbody>
        </table>
      </div>
      {hasMore ? <div className="nav-button " id="right-btn" onClick={() => hasMore && setPage(page + 1)}></div> : <div className="nav-button nav-button-disabled" id="right-btn"></div>}
      </div>
    </div>
  );
};

export default Journeys;