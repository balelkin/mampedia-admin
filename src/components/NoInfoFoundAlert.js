import PropTypes from 'prop-types';
import { Alert, Grid, Icon } from '@mui/material';

export default function NoInfoFoundAlert({ message }) {
  return (
    <Alert
      sx={{ paddingBottom: 0, paddingTop: 0 }}
      icon={<Icon sx={{ height: '100%', padding: 0 }}>🧐</Icon>}
      variant="outlined"
      severity="warning"
    >
      <Grid height="100%" container alignItems="center">
        <Grid>{message}</Grid>
      </Grid>
    </Alert>
  );
}

NoInfoFoundAlert.propTypes = {
  message: PropTypes.string.isRequired,
};
