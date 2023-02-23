import React, { useEffect, useState, useCallback } from 'react';
import Container from './style';
import Dropdown from '../Dropdown';
import SearchButton from '../SearchButton';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import { fetchStatesList } from '../../services/configApi';

const Dropdowns = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const StateDropdown = withLoading(Dropdown);
  const CityDropdown = withLoading(Dropdown);

  // Busca os estados ao montar o componente
  useEffect(() => {
    const fetchStatesData = async () => fetchStatesList('/', setStates, setIsLoadingStates);
    fetchStatesData();
  }, []);

  // Quando o estado selecionado é alterado, busca as cidades correspondentes
  const handleStateChange = useCallback(
    async e => {
      const stateISO = e.target.options[e.target.selectedIndex].id;
      setSelectedState(e.target.value);
      setCities([]);
      fetchStatesList(`/${stateISO}/cities`, setCities, setIsLoadingCities);
    },
    [setSelectedState, setCities, setIsLoadingCities]
  );

  // Quando a cidade selecionada é alterada, atualiza o estado
  const handleCityChange = useCallback(
    e => {
      setSelectedCity(e.target.value);
    },
    [setSelectedCity]
  );

  return (
    <Container>
      <StateDropdown
        label='Estado'
        data={states}
        isLoading={isLoadingStates}
        value={selectedState}
        onChange={handleStateChange}
      />
      <CityDropdown
        label='Cidade'
        data={cities}
        isLoading={isLoadingCities}
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!cities.length}
      />
      <Link to={`/react-weather-app/${selectedCity}`}>
        <SearchButton disabled={!selectedCity} />
      </Link>
    </Container>
  );
};

const withLoading = WrappedComponent => {
  return ({ isLoading, ...otherProps }) => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return <WrappedComponent {...otherProps} />;
  };
};

export default Dropdowns;
