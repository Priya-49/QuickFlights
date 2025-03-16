import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import airports from "./airports"; // Ensure correct import

const FlightSearchForm = ({ onSearch }) => {
  const [origin, setOrigin] = useState("JFK");
  const [destination, setDestination] = useState("LHR");
  const [travelDate, setTravelDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(origin, destination, travelDate);
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-xl w-full mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex items-center gap-6 justify-between">
        
        {/* From */}
        <div className="flex flex-col w-1/4">
          <label className="text-sm text-gray-600 mb-1">From</label>
          <select
            className="w-full p-4 text-md font-semibold border border-gray-400 rounded-lg"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city}, {airport.country} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* Exchange Icon */}
        <FaExchangeAlt className="text-3xl text-black mt-8 cursor-pointer" />

        {/* To */}
        <div className="flex flex-col w-1/4">
          <label className="text-sm text-gray-600 mb-1">To</label>
          <select
            className="w-full p-4 text-md font-semibold border border-gray-400 rounded-lg"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city}, {airport.country} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col w-1/4">
          <label className="text-sm text-gray-600 mb-1">Travel Date</label>
          <input
            type="date"
            className="w-full p-4 text-md font-semibold border border-gray-400 rounded-lg"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="text-white mt-5 py-4 px-6 rounded-md shadow-md w-72 bg-gray-800 hover:bg-black transition"
        >
          Search Flights
        </button>
      </form>
    </div>
  );
};

export default FlightSearchForm;
