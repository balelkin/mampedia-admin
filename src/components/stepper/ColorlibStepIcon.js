import React from 'react';
import PropTypes from 'prop-types';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FaceIcon from '@mui/icons-material/Face';

import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import { styled } from '@mui/material/styles';

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient(335deg, rgba(2,0,36,1) 0%, rgba(117,83,234,1) 50%, rgba(0,212,255,1) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient(335deg, rgba(2,0,36,1) 0%, rgba(117,83,234,1) 50%, rgba(0,212,255,1) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <FaceIcon />,
    2: <SportsHandballIcon />,
    3: <DoneAllIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{
        completed,
        active,
      }}
      className={className}
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

ColorlibStepIcon.defaultProps = {
  active: false,
  className: '',
  completed: false,
  icon: PropTypes.node,
};

export default ColorlibStepIcon;
