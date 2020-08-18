import React from 'react';

import { Route, Redirect } from 'react-router-dom'

import { isLoggedIn } from '../../app/redux/authSlice'
import { useSelector } from 'react-redux'

const PrivateRoute = ({component: Component, ...rest}) => {
  const loggedIn = useSelector(isLoggedIn)
  return (
    <Route {...rest} render={props => {
      if (!loggedIn) return <Redirect to="/sign-in" />
      return <Component {...props} />
    }}

    />
      
  );
}

export default PrivateRoute;
