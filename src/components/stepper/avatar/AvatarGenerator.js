import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import StepperContext from '../../../hooks/context/StepperContext';
import UserContext from '../../../hooks/context/UserContext';
import { BigHead } from '../../../lib/core.cjs.development';
import axios from '../../../services/http.service';
import StepLoader from '../StepLoader';

const Item = styled(Paper)(() => ({
  height: 300,
  width: 500,
}));

const GenerateAvatarButton = styled(Button)({
  width: '100%',
  marginTop: '24px',
});

export default function AvatarGenerator({
  department,
  setDepartment,
  values,
  generateAvatar,
  changeDepartment,
}) {
  const [fetchedDepartments, setFetchedDepartments] = useState([]);

  const { isLoaded, setIsLoaded } = useContext(StepperContext);

  const { user } = useContext(UserContext);

  const findDepartment = (arr, name) => arr.find((v) => v.name === name);

  useEffect(() => {
    setIsLoaded(false);

    axios
      .get('/departments')
      .then((res) => {
        setFetchedDepartments(res);
        setDepartment(findDepartment(res, department.name));
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setDepartment(() => {
      const selectedDepartment = findDepartment(fetchedDepartments, event.target.value);

      changeDepartment(selectedDepartment.name);

      return selectedDepartment;
    });
  };

  const handleGenerateAvatar = () => {
    generateAvatar(department.name, user.gender);
  };

  useEffect(() => {
    handleGenerateAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Item
        elevation={8}
        container="true"
        sx={{
          minWidth: '500px',
          display: 'flex',
          paddingLeft: '40px',
          paddingRight: '40px',
        }}
      >
        <Grid item xs={6} sx={{ minWidth: '250px' }}>
          <BigHead {...values} />
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            alignSelf: 'center',
            textAlign: 'center',
          }}
        >
          <Grid container justifyContent="center" flexDirection="row">
            <Grid item xs={12}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="department-select-label">Department</InputLabel>
                <Select
                  sx={{ height: '36px' }}
                  labelId="department-select-label"
                  id="department-select"
                  value={department.name}
                  label="Department"
                  disabled={!isLoaded}
                  onChange={handleChange}
                >
                  {fetchedDepartments &&
                    fetchedDepartments.map((v) => (
                      <MenuItem key={v.name} value={v.name}>
                        {v.title}
                      </MenuItem>
                    ))}
                </Select>
                <StepLoader isHidden={!isLoaded} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <GenerateAvatarButton variant="contained" onClick={handleGenerateAvatar}>
                Generate
              </GenerateAvatarButton>
            </Grid>
          </Grid>
        </Grid>
      </Item>
    </Grid>
  );
}

AvatarGenerator.propTypes = {
  department: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  setDepartment: PropTypes.func.isRequired,
  values: PropTypes.shape({
    skinTone: PropTypes.string.isRequired,
    eyes: PropTypes.string.isRequired,
    eyebrows: PropTypes.string.isRequired,
    mouth: PropTypes.string.isRequired,
    hair: PropTypes.string.isRequired,
    facialHair: PropTypes.string.isRequired,
    clothing: PropTypes.string.isRequired,
    accessory: PropTypes.string.isRequired,
    graphic: PropTypes.string.isRequired,
    hat: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    hairColor: PropTypes.string.isRequired,
    clothingColor: PropTypes.string.isRequired,
    circleColor: PropTypes.string.isRequired,
    lipColor: PropTypes.string.isRequired,
    hatColor: PropTypes.string.isRequired,
    faceMaskColor: PropTypes.string.isRequired,
    mask: PropTypes.bool.isRequired,
    faceMask: PropTypes.bool.isRequired,
    lashes: PropTypes.string.isRequired,
  }).isRequired,
  generateAvatar: PropTypes.func.isRequired,
  changeDepartment: PropTypes.func.isRequired,
};
