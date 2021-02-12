import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RouteProps extends ReactDOMRouteProps {
  isLoggedOn?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isLoggedOn = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isLoggedOn === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isLoggedOn ? '/' : '/historico',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
