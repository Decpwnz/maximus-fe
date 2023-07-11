import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import usersController from '../controllers/usersController';

const StatusLight = styled('div')(({ available }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: available ? 'green' : 'orange',
  display: 'inline-block',
  marginRight: '5px',
}));

const currentTime = new Date().getHours();

function EmployeeList({
  type, searchTerm, minValue, maxValue,
}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await usersController.getUsers();
      setUsers(response);
    };
    fetchUsers();
  }, []);

  const sortedData = [...users].sort((a, b) => a.name.localeCompare(b.name));

  const filteredData = sortedData.filter((item) => {
    function handleFilterByType(value, employee) {
      if (value === 'All') return true;
      return value === employee.type;
    }

    function handleFilterBySearch(search, employee) {
      if (employee.name.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      return false;
    }

    function handleFilterBySalaryRange(min, max, employee) {
      if (min === null && employee.salary <= max) return true;
      if (max === null && employee.salary >= min) return true;
      if (employee.salary >= min && employee.salary <= max) return true;
      return false;
    }

    return (
      handleFilterBySalaryRange(minValue, maxValue, item)
    && handleFilterBySearch(searchTerm, item)
    && handleFilterByType(type, item)
    );
  });

  return (
    <Grid container spacing={2} marginTop={4}>
      {filteredData.map((employee) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={employee.id}>
          <Card
            sx={{ height: '100%' }}
            key={employee.id}
          >
            {employee.type === 'Employer' ? (
              <CardContent>
                <Typography>
                  {`Type: ${employee.type}`}
                </Typography>
                <Typography>
                  {`Name: ${employee.name}`}
                </Typography>
                <Typography>
                  {`Salary: ${employee.salary}`}
                </Typography>
                {currentTime >= employee.employer.availableHours.start
                && currentTime < employee.employer.availableHours.end ? (
                  <Grid container alignItems="center">
                    <StatusLight available />
                    <Typography>Available</Typography>
                  </Grid>
                  ) : (
                    <Grid container alignItems="center">
                      <StatusLight />
                      <Typography>Unavailable</Typography>
                    </Grid>
                  )}
              </CardContent>
            ) : (
              <CardContent>
                <Typography>
                  {`Type: ${employee.type}`}
                </Typography>
                <Typography>
                  {`Name: ${employee.name}`}
                </Typography>
                <Typography>
                  {`Salary: ${employee.salary}`}
                </Typography>
                <Typography>
                  {`Workplace Number: ${employee.employee.workplaceNumber}`}
                </Typography>
                {currentTime === employee.employee.lunchTime ? (
                  <Grid container alignItems="center">
                    <StatusLight />
                    <Typography>Lunch Time</Typography>
                  </Grid>
                ) : (
                  <Grid container alignItems="center">
                    <StatusLight available />
                    <Typography>Available</Typography>
                  </Grid>
                )}
              </CardContent>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

EmployeeList.propTypes = {
  type: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};

EmployeeList.defaultProps = {
  minValue: null,
  maxValue: null,
};
export default EmployeeList;
