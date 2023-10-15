import axios from 'axios';

const weatherAPIKey = import.meta.env.VITE_WEATHER_KEY;
const mapsAPIKey = import.meta.env.VITE_MAPS_KEY;

const fetchWeatherdata = async city => {
  try {
    const { lat, lng } = await fetchGeoCodingAddress(city);
    const url = `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${lat},${lng}&aqi=no&lang=pt`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchGeoCodingAddress = async city => {
  const url__API = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+BR&key=${mapsAPIKey}`;
  try {
    const { data } = await axios.get(url__API);
    return data.results[0].geometry.location;
  } catch (error) {
    console.log(error);
  }
};

export default fetchWeatherdata;
