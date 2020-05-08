import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth';

import * as ROUTES from '../constants/routes';

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser
          ? (<RouteComponent {...routeProps} />)
          : (<Redirect to={ROUTES.LOGIN} />)
      }
    />
  );
};

export const AuthRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser
          ? (<RouteComponent {...routeProps} currentUser={currentUser} />)
          : (<RouteComponent {...routeProps} />)
      }
    />
  );
};
