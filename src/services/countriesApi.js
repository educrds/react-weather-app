import axios from 'axios';

const geoAPIKey = import.meta.env.VITE_GEO_KEY;

const geo = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1/countries/BR/states',
  headers: {
    'X-CSCAPI-KEY': geoAPIKey,
  },
});

const fetchStatesList = async (endpoint, setData, setIsLoading) => {
  try {
    setIsLoading(true);
    const { data } = await geo(endpoint);
    setData(data);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export default fetchStatesList;
