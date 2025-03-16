const AMADEUS_CLIENT_ID = "tAVY3aNZi2DxPGGy1cZwVaqysoHhe0wd";
const AMADEUS_CLIENT_SECRET = "YS2DnmQYt4bZiPL5";
let accessToken = "";

export async function getAccessToken() {
  const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${AMADEUS_CLIENT_ID}&client_secret=${AMADEUS_CLIENT_SECRET}`
  });
  const data = await response.json();
  accessToken = data.access_token;
}

export async function searchFlights(origin, destination, date) {
  if (!accessToken) await getAccessToken();

  const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&currencyCode=USD`;

  const response = await fetch(url, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });

  if (response.ok) {
    const data = await response.json();
    return data.data.map(flight => ({
      airline: flight.validatingAirlineCodes[0],
      airlineName: data.dictionaries.carriers[flight.validatingAirlineCodes[0]],
      flightNumber: flight.itineraries[0].segments[0].carrierCode + flight.itineraries[0].segments[0].number,
      departureAirport: flight.itineraries[0].segments[0].departure.iataCode,
      departureTime: flight.itineraries[0].segments[0].departure.at,
      arrivalAirport: flight.itineraries[0].segments[0].arrival.iataCode,
      arrivalTime: flight.itineraries[0].segments[0].arrival.at,
      price: flight.price.total + " " + flight.price.currency,
      cabin: flight.travelerPricings[0].fareDetailsBySegment[0].cabin,
      bookingClass: flight.travelerPricings[0].fareDetailsBySegment[0].class,
      stops: flight.itineraries[0].segments.length - 1
    }));
  } else {
    console.error("Error fetching flights:", response.statusText);
    return [];
  }
}
