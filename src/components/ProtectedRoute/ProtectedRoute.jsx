import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  console.log(props.isLoggedIn, 'eto iz protectedroute');
  (props.isLoggedIn ? <Component {...props} /> : <Navigate to="/kura2" replace/>);
};

export default ProtectedRouteElement;
