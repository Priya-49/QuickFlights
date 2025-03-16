import React from "react";

const FlightResults = ({ flights }) => {
  const handleSaveFlight = async (flight) => {
    try {
      const response = await fetch("http://localhost:5000/save-flight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flight),
      });

      const data = await response.json();
      alert(data.message); // Show success message
    } catch (error) {
      console.error("Error saving flight:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-black mb-4 text-center">
        Available Flights
      </h2>

      {flights.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-black text-lg">
                <th className="border border-gray-400 p-3">Airline</th>
                <th className="border border-gray-400 p-3">Departure</th>
                <th className="border border-gray-400 p-3">Arrival</th>
                <th className="border border-gray-400 p-3">Price</th>
                <th className="border border-gray-400 p-3">Book</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, index) => (
                <tr
                  key={index}
                  className="text-center bg-white hover:bg-gray-100 transition duration-200 text-black"
                >
                  <td className="border border-gray-400 p-3 font-medium">
                    {flight.airlineName} ({flight.airline})
                  </td>
                  <td className="border border-gray-400 p-3">
                    {flight.departureAirport} - {flight.departureTime}
                  </td>
                  <td className="border border-gray-400 p-3">
                    {flight.arrivalAirport} - {flight.arrivalTime}
                  </td>
                  <td className="border border-gray-400 p-3 font-semibold text-gray-700">
                    {flight.price}
                  </td>
                  <td className="border border-gray-400 p-3">
                    <button
                      onClick={() => handleSaveFlight(flight)}
                      className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg shadow"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No flights found. Try again.</p>
      )}
    </div>
  );
};

export default FlightResults;
