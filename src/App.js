import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrentWeather from './component/CurrentWeather';
import FiveDayForcast from './component/FiveDayForcast';
import HourlyForcast from './component/HourlyForecast';
import SearchByCity from './component/SearchByCity';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
          <Route path="/" element={<CurrentWeather />} />
          <Route path="/forecast/:city" element={< FiveDayForcast/>} />
          <Route path="/forecast/hourly/:city" element={< HourlyForcast/>} />
          <Route path="/search" element={< SearchByCity/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
