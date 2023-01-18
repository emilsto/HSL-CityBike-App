import { queries } from "@testing-library/react";
import { useState, useEffect } from "react";
import api from "../api/axios";
import StationCard from "../components/StationCard";

//interface
import Station from "../interfaces/station_interface";

import "../styles/stations.css";

const STAION_URL = "http://localhost:5000/api/v1/stations_page";
const PAGE_SIZE = 12;

const Stations = () => {
  const [stations, setStations] = useState<Station[]>();
  const [limit, setLimit] = useState<number>(PAGE_SIZE);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);


  useEffect(() => {
  const fetchStations = async () => {
    const query = {
      limit: limit,
      page: PAGE_SIZE * page,
    };
    if(!hasMore) return;
    const response = await api.get(STAION_URL, { params: query });
    const data = response.data;
    setStations(data);
    setHasMore(data.length > 0);
  };
    fetchStations();
  }, [page, limit, hasMore]);


  return (
    <div className="Station-page">
      <h1>HSL CityBike stations</h1>
      <div className="table-wrapper">
      <select className="page-select" onChange={(e) => setLimit(parseInt(e.target.value))}>
        <option value="12">12 stations per page</option>
        <option value="24">24 stations</option>
        <option value="36">36 stations</option>
        <option value="48">48 stations</option>
      </select>
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
      <div className="Station-page-buttons">
        {page > 0 && <button onClick={() => setPage(0)}>First</button>}
        {page > 0 && <button onClick={() => setPage(page-1)}>Previous</button>}
        {hasMore &&  <button onClick={() => setPage(page+1)}>Next</button>}       
      </div>
    </div>
  );
};

export default Stations;
