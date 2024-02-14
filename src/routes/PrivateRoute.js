import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
import UserContext from "../hooks/context/UserContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // if (!user?.avatar && rest.path !== '/avatar') {
  //   return <Redirect to="/avatar" />;
  // }

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return <Navigate to="/login" />;
}

PrivateRoute.propTypes = { component: PropTypes.func.isRequired };
