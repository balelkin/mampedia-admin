import React from 'react';
import { Navigate, Route,  Routes } from 'react-router-dom';
// import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import privateRoutes from './routesLists/privateRoutes';
import publicRoutes from './routesLists/publicRoutes';
import SignIn from "../components/sign-in/SignIn";
import SignUp from "../components/sign-up/SignUp";
import ChatApp from "../components/chat/chat";
import ProgramList from "../components/programs/programs";

export default function MainRoutes() {
  return (
    <Routes>
      {/*<Route exact path="/" render={() => <Navigate to="/home" />} />*/}
        <Route exact path='/login' element={<SignIn />} />
        <Route exact path='/register' element={<SignUp />} />
        <Route exact path='/home' element={<div></div>} />
        <Route exact path='/chat' element={<ChatApp />} />
        <Route exact path='/programs' element={<ProgramList />} />

      {/*{publicRoutes.map((route) => (*/}
      {/*  <PublicRoute key={route.path} path={route.path} component={route.component} exact />*/}
      {/*))}*/}
      {/*{privateRoutes.map((route) => (*/}
      {/*  <PrivateRoute key={route.path} path={route.path} component={route.component} exact />*/}
      {/*))}*/}

      {/*{adminRoutes.map((route) => (*/}
      {/*  <ProtectedRoute*/}
      {/*    key={route.path}*/}
      {/*    path={route.path}*/}
      {/*    component={route.component}*/}
      {/*    routeMap={adminRoutes}*/}
      {/*    requiredRoles={[userRoles.ADMIN]}*/}
      {/*    exact*/}
      {/*  />*/}
      {/*))}*/}
      {/*<Route component={NotFound} />*/}
    </Routes>
  );
}
