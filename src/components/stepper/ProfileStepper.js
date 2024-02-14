import React, { useContext, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import { STEPS_TITLES } from '../../constants/stepper.constants';
import StepperContext from '../../hooks/context/StepperContext';
import ColorlibStepIcon from './ColorlibStepIcon';
import ProfileStepContent from './ProfileStepContent';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(335deg, rgba(117,83,234,1) 23%, rgba(112,128,235,1) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(335deg, rgba(112,120,235,1) 23%, rgba(94,192,237,1) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

export default function ProfileStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const { isLoaded } = useContext(StepperContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }} mt={8}>
      <Stack sx={{ width: '100%' }} spacing={4} mb={8}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {STEPS_TITLES.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <ProfileStepContent activeStep={activeStep} />
      <Grid container>
        <Grid item xs={4} md={4} pl="60px" textAlign="center">
          {activeStep === 1 ? (
            <Button
              color="inherit"
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ marginRight: 8 }}
            >
              Back
            </Button>
          ) : (
            ''
          )}
        </Grid>
        <Grid xs={4} md={4} item />
        <Grid item xs={4} md={4} textAlign="center">
          {activeStep === 0 || activeStep === 1 ? (
            <Button
              disabled={!isLoaded}
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleNext}
            >
              {activeStep === STEPS_TITLES.length - 1 ? 'Finish' : 'Next'}
            </Button>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
