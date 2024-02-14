import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Loader from '../Loader';

export default function StepLoader({ isHidden }) {
  return (
    isHidden && (
      <Box
        sx={{
          position: 'absolute',
          marginTop: '4px',
          width: '100%',
          top: '100%',
        }}
      >
        <Loader />
      </Box>
    )
  );
}

StepLoader.propTypes = { isHidden: PropTypes.bool };

StepLoader.defaultProps = { isHidden: false };
