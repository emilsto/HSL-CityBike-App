import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-6xl p-8">HSL Citybike app</h1>
        <section className="view-select">
          <Link to="/stations">
            <div className="station-button">Station List</div>
          </Link>
          <Link to="/journeys">
            <div className="journey-button">Journey List</div>
          </Link>
        </section>
      </header>
    </div>
  );
};

export default Home;
