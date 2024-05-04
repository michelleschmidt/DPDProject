
const axios = require("axios");

async function getCoordinates(postcode, street, city, state, country) {
  const addressString = `${postcode}, ${street}, ${city}, ${state}, ${country}`;
  const params = {
    access_key: process.env.ACCESS_KEY,
    query: addressString,
  };

  const geocodingResponse = await axios.get("http://api.positionstack.com/v1/forward", { params });
  const { latitude, longitude } = geocodingResponse.data.data[0];
  return { lat: latitude, lng: longitude };
}

module.exports = { getCoordinates };
