import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route } from 'react-router-dom';
import UserContext from '../hooks/context/UserContext';

export default function PublicRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);

  if (user) {
    return <Navigate to="/home" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
