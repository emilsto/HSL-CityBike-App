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
  const [page, setPage] = useState<number>(1);


  useEffect(() => {
  const fetchStations = async () => {
    const query = {
      limit: limit,
      page: PAGE_SIZE * page,
    };

    const response = await api.get(STAION_URL, { params: query });
    const data = response.data;
    setStations(data);
  };
    fetchStations();
  }, [page, limit]);


  return (
    <div className="Station-page">
      <h1>HSL CityBike stations</h1>
      <p>Click on a station to see more information</p>
      <div className="station-list">
        {stations &&
          stations.map((station: Station) => <StationCard station={station} key={station.objId} />)}
      </div>
      <div className="Station-page-buttons">
      </div>
    </div>
  );
};

export default Stations;
