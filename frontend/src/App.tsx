import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Stations from './pages/Stations';
import Journeys from './pages/Journeys';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stations' element={<Stations />} />
        <Route path='/journeys' element={<Journeys />} />
      </Routes>
    </div>
  );
}

export default App;