/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route } from 'react-router-dom';
import Loading from '../components/Loading';
import UserContext from '../hooks/context/UserContext';
import SignIn from "../components/sign-in/SignIn";

export default function ProtectedRoute({ component: Component, routeMap, requiredRoles, ...rest }) {
  const { user, isLoading } = useContext(UserContext);

  const protectedUser = requiredRoles.some((role) => user?.roles.includes(role));

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <SignIn to="/login" />;
  }

  if (protectedUser) {
    return (
      <Route
        {...rest}
        render={(props) => {

          return <Component {...props} />;
        }}
      />
    );
  }

  return <Navigate to="/home" />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  routeMap: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    }),
  ).isRequired,
};
