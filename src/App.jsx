import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FlightSearchForm from "./components/FlightSearchForm";
import FlightResults from "./components/FlightResults";
import SavedFlightsPage from "./components/SavedFlightsPage"; // Import new page
import { searchFlights } from "./api/amadeus";
import heroImage from "./assets/hero1.jpg";

const App = () => {
  const [flights, setFlights] = useState([]);

  const handleSearch = async (origin, destination, date) => {
    const results = await searchFlights(origin, destination, date);
    setFlights(results);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div
                className="relative w-[100%] h-[500px] bg-cover bg-center rounded p-4"
                style={{ backgroundImage: `url(${heroImage})` }}
              ></div>
              <div className="absolute bottom-[2%] left-10 container mx-auto p-6">
                <div className="flex space-x-4 pb-3">
                  <FlightSearchForm onSearch={handleSearch} />
                </div>
              </div>
              <div className="mt-40">
                <FlightResults flights={flights} />
              </div>
            </div>
          }
        />
        <Route path="/saved" element={<SavedFlightsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
