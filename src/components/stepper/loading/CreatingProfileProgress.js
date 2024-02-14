import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import useProfile from '../../../hooks/useProfile';
import Loader from '../../Loader';

const Item = styled(Paper)(() => ({
  height: 100,
  width: 300,
}));

export default function CreatingProfileProgress({ avatar, department, goal }) {
  const { prepareProfile } = useProfile();

  useEffect(() => {
    async function fetchData() {
      await prepareProfile({
        avatar,
        department,
        goal,
      });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Item
        elevation={8}
        sx={{
          minWidth: '500px',
          display: 'flex',
          paddingLeft: '40px',
          paddingRight: '40px',
          paddingTop: '28px',
        }}
      >
        <Grid container>
          <Grid item xs={12} sx={{ height: '0px' }}>
            <Typography>We are preparing program for you</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <Loader />
            </Box>
          </Grid>
        </Grid>
      </Item>
    </Grid>
  );
}

CreatingProfileProgress.propTypes = {
  avatar: PropTypes.shape({
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
  department: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  goal: PropTypes.string.isRequired,
};
