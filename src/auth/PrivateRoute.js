import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSession } from './Auth';

import * as ROUTES from '../constants/routes';

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useSession()
  
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser
          ? (<RouteComponent {...routeProps} currentUser={currentUser} />)
          : (<Redirect to={ROUTES.LOGIN} />)
      }
    />
  );
};

export const AuthRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useSession()

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
