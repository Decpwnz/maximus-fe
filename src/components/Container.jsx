import { useState } from 'react';

import Grid from '@mui/material/Grid';

import EmployeeList from './EmployeeList';
import SalaryRangeFilter from './SalaryRangeFilter';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';

const PersonData = {
  All: 'All',
  Employee: 'Employee',
  Employer: 'Employer',
};

function Container() {
  const [type, setType] = useState(PersonData.All);
  const [searchTerm, setSearchTerm] = useState('');
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  const handleEmployeeType = (event) => {
    setType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMinValue = (event) => {
    if (event.target.value === '') setMinValue(null);
    else setMinValue(Number(event.target.value));
  };

  const handleMaxValue = (event) => {
    if (event.target.value === '') setMaxValue(null);
    else setMaxValue(Number(event.target.value));
  };

  return (
    <Grid container justifyContent="center" p={5}>
      <SearchBar onSearchChange={handleSearchChange} />
      <TypeFilter handleEmployeeType={handleEmployeeType} type={type} />
      <SalaryRangeFilter
        onMinValueChange={handleMinValue}
        onMaxValueChange={handleMaxValue}
        minValue={minValue}
        maxValue={maxValue}
      />
      <EmployeeList
        type={type}
        searchTerm={searchTerm}
        minValue={minValue}
        maxValue={maxValue}
      />
    </Grid>
  );
}

export default Container;
