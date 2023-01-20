import { Route, Routes } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Stations from "./pages/Stations";
import SingleStation from "./pages/SingleStation";
import Journeys from "./pages/Journeys";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/stations/:id" element={<SingleStation />} />
        <Route path="/journeys" element={<Journeys />} />
      </Routes>
    </div>
  );
}

export default App;
