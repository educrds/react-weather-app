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

const fetchStatesList = async (endpoint, setData, setIsLoading) => {
  setIsLoading(true); // Indica que os dados estão sendo carregados
  try {
    const { data } = await geo(endpoint);
    setData(data);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false); // Indica que os dados foram carregados
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
  const url__API = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+BR&key=${mapsAPIKey}`;
  try {
    const response = await axios.get(url__API);
    return response.data.results[0].geometry.location;
  } catch (error) {
    console.log(error);
  }
};

export { fetchWeatherdata, fetchStatesList };
