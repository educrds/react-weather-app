import axios from 'axios';

const geoAPIKey = import.meta.env.VITE_GEO_API_KEY;
const weatherAPIKey = import.meta.env.VITE_API_KEY;

const geo = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1/countries/BR/states',
  headers: {
    'X-CSCAPI-KEY': geoAPIKey,
  },
});

const fetchGeoData = async (endpoint) => {
  try {
    const { data } = await geo(endpoint);
    return data;
  } catch (error) {
    console.log(error);
  }
};


const fetchWeatherdata = async city => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${city},BR&aqi=no&lang=pt`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { geo, fetchWeatherdata, fetchGeoData };