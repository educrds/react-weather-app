import React from 'react';
import Button from './style';
import { BiSearch } from 'react-icons/bi';

// Componente que representa o botão de busca
const SearchButton = React.memo(({ onClick }) => (
  <Button onClick={onClick}>
    <BiSearch />
  </Button>
));

export default SearchButton;
