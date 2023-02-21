import axios from 'axios';

const geoAPIKey = import.meta.env.VITE_GEO_API_KEY;
const weatherAPIKey = import.meta.env.VITE_API_KEY;
const mapsAPIKey = import.meta.env.VITE_MAPS_KEY;

const geo = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1/countries/BR/states',
  headers: {
    'X-CSCAPI-KEY': geoAPIKey,
  },
});

const fetchStatesList = async endpoint => {
  try {
    const { data } = await geo(endpoint);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchWeatherdata = async city => {
  try {
    const { lat, lng } = await fetchGeoCodingAddress(city);
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${lat},${lng}&aqi=no&lang=pt`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchGeoCodingAddress = async city => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+BR&key=${mapsAPIKey}`
    );
    return response.data.results[0].geometry.location;
  } catch (error) {
    console.log(error);
  }
};

export { fetchWeatherdata, fetchStatesList };
