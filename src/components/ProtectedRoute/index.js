import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import useToken from '../../hooks/useToken';

function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useToken();

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
