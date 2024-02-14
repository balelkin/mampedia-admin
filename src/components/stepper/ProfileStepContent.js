import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import useAvatar from '../../hooks/useAvatar';
import AvatarGenerator from './avatar/AvatarGenerator';
import CreatingProfileProgress from './loading/CreatingProfileProgress';
import ProfileInfo from './profile/ProfileInfo';

export default function ProfileStepContent({ activeStep }) {
  const [department, setDepartment] = useState({ name: 'nodejs' });
  const { values, generateAvatar, changeDepartment } = useAvatar({
    initialValues: {
      skinTone: 'dark',
      eyes: 'happy',
      eyebrows: 'leftLowered',
      mouth: 'openSmile',
      hair: 'short',
      facialHair: 'mediumBeard',
      clothing: 'dressShirt',
      accessory: 'tinyGlasses',
      graphic: department.name,
      hat: 'none5',
      body: 'breasts',
      hairColor: 'blonde',
      clothingColor: 'blue',
      circleColor: 'blue',
      lipColor: 'green',
      hatColor: 'red',
      faceMaskColor: 'blue',
      mask: true,
      faceMask: false,
      lashes: 'false',
    },
  });
  const [position, setPosition] = useState('L1');

  switch (activeStep) {
    case 0:
      return (
        <AvatarGenerator
          department={department}
          setDepartment={setDepartment}
          values={values}
          generateAvatar={generateAvatar}
          changeDepartment={changeDepartment}
        />
      );
    case 1:
      return <ProfileInfo department={department} position={position} setPosition={setPosition} />;
    case 2:
      return <CreatingProfileProgress avatar={values} department={department} goal={position} />;
    default:
      return <Typography>Avatar</Typography>;
  }
}

ProfileStepContent.propTypes = { activeStep: PropTypes.number };

ProfileStepContent.defaultProps = { activeStep: 0 };
