import { useState, useEffect } from "react";
import api from "../api/axios";
import StationCard from "../components/StationCard";

//interface
import Station from "../interfaces/station_interface";

import "../styles/stations.css";

const STAION_URL = "http://localhost:5000/api/v1/stations_page";
const PAGE_SIZE = 16;

const Stations = () => {
  const [stations, setStations] = useState<Station[]>();
  const [limit, setLimit] = useState<number>(PAGE_SIZE);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");


  useEffect(() => {
  const fetchStations = async () => {
    console.log("fetching stations");

    //query parameters
    const queries = {
      q : query,
      limit: limit,
      page: PAGE_SIZE * page,
    };
    
    try {
    const response = await api.get(STAION_URL, { params: queries });
    const data = response.data;
    setStations(data);
    setHasMore(true);

    console.log(data.length);
    if(data.length < limit){ 
      setHasMore(false);   //if response length is less than limit, then there is no more data
    }

    } catch (error) {
    setHasMore(false); //if error, then there is no more data
    }
  };
  fetchStations();
  }, [page, limit, hasMore, query]);


  return (
    <div className="Station-page">
      <h1>HSL CityBike stations</h1>
      <div className="search-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Filter by station name, address or city"
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
              <th>Station</th>
              <th>Address</th>
              <th>City</th>
              <th>Capacity</th>
              </tr>
          </thead>
          <tbody>
        {stations &&
          stations.map((station: Station) => <StationCard station={station} key={station.objId} />)}
          </tbody>
        </table>
      </div>
      {hasMore ? <div className="nav-button " id="right-btn" onClick={() => hasMore && setPage(page + 1)}></div> : <div className="nav-button nav-button-disabled" id="right-btn"></div>}
      </div>
    </div>
  );
};

export default Stations;
