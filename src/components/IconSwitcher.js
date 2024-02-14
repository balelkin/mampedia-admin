import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

const MaterialUISwitch = styled(Switch)(({ theme, onIcon, offIcon }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': { content: `'${onIcon}'` },
      '& + .MuiSwitch-track': { opacity: 1 },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 32,
    height: 32,
    '&:before': {
      content: `'${offIcon}'`,
      position: 'absolute',
      width: '100%',
      height: '50%',
      left: '0px',
      top: '22%',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function IconSwitcher({ onIcon, offIcon, ...props }) {
  return <MaterialUISwitch onIcon={onIcon} offIcon={offIcon} {...props} />;
}

IconSwitcher.propTypes = {
  onIcon: PropTypes.string.isRequired,
  offIcon: PropTypes.string.isRequired,
};
