import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import StepperContext from '../../../hooks/context/StepperContext';
import axios from '../../../services/http.service';
import StepLoader from '../StepLoader';

const Item = styled(Paper)(() => ({
  height: 250,
  width: 500,
}));

export default function ProfileInfo({ department, position, setPosition }) {
  const [levels, setLevels] = useState([]);

  const { isLoaded, setIsLoaded } = useContext(StepperContext);

  useEffect(() => {
    async function fetchData() {
      setIsLoaded(false);

      axios
        .get(`/departments/${department._id}/levels`)
        .then((res) => {
          setLevels(res);
          if (res.length > 0) {
            setPosition(res[0].key);
          }
          setIsLoaded(true);
        })
        .catch((error) => {
          console.log(error);
          setIsLoaded(true);
        });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Item
        elevation={8}
        sx={{
          minWidth: '500px',
          display: 'flex',
          paddingLeft: '40px',
          paddingRight: '40px',
          paddingBottom: '40px',
          paddingTop: '64px',
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography>Set your target position:</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="position-select-label">Position</InputLabel>
              <Select
                labelId="position-select-label"
                id="position-select"
                value={position}
                label="Position"
                disabled={!isLoaded}
                onChange={handleChange}
              >
                {levels.map((level) => (
                  <MenuItem key={level._id} value={level.key}>
                    {level.title}
                  </MenuItem>
                ))}
              </Select>
              <StepLoader isHidden={!isLoaded} />
            </FormControl>
          </Grid>
        </Grid>
      </Item>
    </Grid>
  );
}

ProfileInfo.propTypes = {
  department: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  position: PropTypes.string.isRequired,
  setPosition: PropTypes.func.isRequired,
};
