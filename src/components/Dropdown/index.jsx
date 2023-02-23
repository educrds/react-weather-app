import { Select } from './style';
import React from 'react';

// Componente que representa um Dropdown
const Dropdown = React.memo(({ label, data, value, onChange, disabled }) => (
  <Select value={value} onChange={onChange} disabled={disabled}>
    <option>{label}</option>
    {data.map(data => (
      <option id={data.iso2} key={data.id} value={data.name}>
        {data.name}
      </option>
    ))}
  </Select>
));

export default Dropdown;
