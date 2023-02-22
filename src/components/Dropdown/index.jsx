import React, { useEffect, useState } from 'react';
import { Container, Button, Select, SpinnerContainer, Loading } from './style';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {  fetchStatesList } from '../../services/configApi';

const Dropdowns = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Busca os estados ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStatesList('/');
      setStates(data);
    };
    fetchData();
  }, []);

  // Quando o estado selecionado é alterado, busca as cidades correspondentes
  const handleStateChange = async (e) => {
    const stateISO = e.target.options[e.target.selectedIndex].id;
    setCities([]);
    setIsLoading(true);
    const data = await fetchStatesList(`/${stateISO}/cities`);
    setCities(data);
    setIsLoading(false);
  };

  // Quando a cidade selecionada é alterada, atualiza o estado
  const handleCityChange = e => setSelectedCity(e.target.value);

  return (
      <Container>
        <Dropdown onChange={handleStateChange} label='Estado' data={states} />
        {isLoading ? <LoadingSpinner /> : <Dropdown onChange={handleCityChange} label='Cidade' data={cities} /> }
        <Link to={`/react-weather-app/${selectedCity}`}>
          <SearchButton />
        </Link>
      </Container>
  );
};

// Componente que representa um Dropdown
const Dropdown = ({ label, data, onChange }) => (
  <Select onChange={onChange}>
    <option>{label}</option>
    {data.map(data => (
      <option id={data.iso2} key={data.id} value={data.name}>
        {data.name}
      </option>
    ))}
  </Select>
);

// Componente que representa o botão de busca
const SearchButton = ({ onClick }) => (
  <Button onClick={onClick}>
    <BiSearch />
  </Button>
);

// Componente que representa o spinner de loading
const LoadingSpinner = () => (
  <SpinnerContainer>
    <Loading></Loading>
  </SpinnerContainer>
);

export default Dropdowns;
