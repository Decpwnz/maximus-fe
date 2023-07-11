import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

function SearchBar({ onSearchChange }) {
  return (
    <Box
      p={2}
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Search by name" variant="standard" type="text" onChange={onSearchChange} />
    </Box>
  );
}

SearchBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};
export default SearchBar;
