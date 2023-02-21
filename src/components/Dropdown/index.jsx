import React, { useEffect, useState } from 'react';
import { Container, Button, Select, SpinnerContainer, Loading } from './style';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { fetchGeoData } from '../../services/configApi';

const Dropdowns = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGeoData('/').then(data => setStates(data));
  }, []);

  const handleStateChange = e => {
    const stateISO = e.target.options[e.target.selectedIndex].id;
    setCities([]);
    setIsLoading(true);
    fetchGeoData(`/${stateISO}/cities`).then(data => {
      setCities(data);
      setIsLoading(false);
    });
  };

  const handleCityChange = e => setSelectedCity(e.target.value);
  return (
    <>
      <Container>
        <Dropdown onChange={handleStateChange} label='Estado' data={states} />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Dropdown onChange={handleCityChange} label='Cidade' data={cities} />
        )}
        <Link to={`/react-weather-app/${selectedCity}`}>
          <SearchButton />
        </Link>
      </Container>
    </>
  );
};

const Dropdown = ({ label, data, onChange }) => {
  return (
    <Select onChange={onChange}>
      <option>{label}</option>
      {data.map(data => (
        <option id={data.iso2} key={data.id} value={data.name}>
          {data.name}
        </option>
      ))}
    </Select>
  );
};

const SearchButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <BiSearch />
    </Button>
  );
};

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Loading></Loading>
    </SpinnerContainer>
  );
};

export default Dropdowns;
